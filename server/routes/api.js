const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'Alex0606',
    database: 'Urbandico'
})

client.connect()

class User {
    constructor() {
        this.user = []
    }
}


router.use((req, res, next) => {
    if (typeof req.session.User === 'undefined') {
        req.session.User = new User()
    }
    next()
})


async function addDef(id, name, def, upvote){
    const sql = "INSERT INTO public.definitions("+
        "id, name, def, upvote)"+
        " VALUES('"+id+"' ,'"+name+"' ,'"+def+"' ,'"+upvote+"') RETURNING*"
    await client.query({
        text: sql
    })
}

async function getDef() {
    const sql = "SELECT name, def, upvote FROM public.definitions"
    const defs = await client.query({
        text: sql
    })
    return defs.rows
}

router.get('/definitions', async (req, res) => {
    let defs = await getDef()
    res.json(defs)
})

router.post('/definition', async (req, res) =>{
    const name = req.body.name
    const def = req.body.def

    let lengthDefs = await getDef()

    if (typeof name !== 'string' || name === '' ||
        typeof def !== 'string' || def === ''){
        res.status(400).json({message: 'Bad Request'})
        return
    }

    const definition = {
        id: lengthDefs.length,
        name: name,
        def: def,
        upvote: 0
    }

    await addDef(definition.id, definition.name, definition.def, definition.upvote)
})

async function verifUtilisateur(email){
    const sql = "SELECT count(*) FROM users WHERE email=$2"
    const res = await client.query({
        text : sql,
        values:[email]
    })
    return parseInt(res.rows[0].count)
}

async function insert(name, email, password){
    const hash = await bcrypt.hash(password, 10)
    const s = "SELECT * FROM users"
    const re = await client.query({
        text : s,
        values:[]
    })

    if(re.rowCount === 0){
        const sql = "INSERT INTO users(id, name, email, password) values (1, $1, $2, $3)"
        const res = await client.query({
            text : sql,
            values:[name, email, hash]
        })
        return res.rowCount
    }
    const sql = "INSERT INTO users(id, name, email, password) select 1+max(id),$1, $2, $3 from users"
    const res = await client.query({
        text : sql,
        values:[name, email, hash]
    })
    return res.rowCount
}

router.post('/signup', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    verifUtilisateur(email).then(function(result){
        if( result === 0){
            insert(name, email, password).then(function(result){
                if (result === 1){
                    res.status(200).json({ message: 'Succès, vous pouvez vous connecter !' })
                    return
                }
                res.status(200).json({ message: 'Erreur 0' })
            })
        }
        else
            res.status(200).json({ message: 'Erreur 1' })
    })
})

async function verifMDP(email, mdp){
    const sql = "SELECT password FROM users WHERE email=$2"
    const res = await client.query({
        text : sql,
        values:[email]
    })
    if (await bcrypt.compare(mdp, res.rows[0].password)) {
        return 1
    } else {
        return 0
    }
}

async function returnID(email){
    const sql = "SELECT id FROM users WHERE email=$2"
    const res = await client.query({
        text : sql,
        values:[email]
    })
    return parseInt(res.rows[0].id)
}

async function createUser(id){
    const sql = "SELECT * FROM users WHERE id=$1"
    const res = await client.query({
        text: sql,
        values: [id]
    })
    return res.rows
}

router.post('/signin', (req, res) => {
    let email2 = req.body.email
    let mdp = req.body.password

    verifUtilisateur(email2).then(function(result){
        if( result === 1){
            verifMDP(email2, mdp).then(function(result){
                if(result === 1){
                    returnID(email2).then(function(result){
                        if(result === req.session.userId){
                            createUser(req.session.userId).then(function (result){
                                req.session.User.user.push(result[0])
                                res.json({user: req.session.User.user, message: 'Vous êtes déjà connecté'}).status(304)
                            })
                        }
                        else{
                            req.session.userId = result
                            createUser(req.session.userId).then(function (result){
                                req.session.User.user.push(result[0])
                                res.json({user: req.session.User.user, message: 'Connecté'}).status(304)
                            })
                        }
                    })
                }
                else
                    res.json({ message: 'Mot de passe incorrect' }).status(401)
            })
        }
        else
            res.json({ message: 'Email incorrect' }).status(401)
    })
})


module.exports = router