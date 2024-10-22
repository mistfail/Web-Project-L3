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

async function getDef() {
    const sql = "SELECT * FROM public.definitions"
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
    const upvote = 0
    const downvote = 0
    const userid = req.session.User.user[0].id

    let Defs = await getDef()

    if (typeof name !== 'string' || name === '' ||
        typeof def !== 'string' || def === ''){
        res.status(400).json({message: 'Bad Request'})
        return
    }

    if(Defs.length === 0){
        const sql = "INSERT INTO definitions(id, name, def, upvote, userid, downvote) values (1, $1, $2, $3, $4, $5)"
        const res = await client.query({
            text : sql,
            values:[name, def, upvote, userid, downvote]
        })
    }else{
        const sql = "INSERT INTO definitions(id, name, def, upvote, userid, downvote) select 1+max(id),$1, $2, $3, $4, $5 from definitions"
        const tes = await client.query({
            text : sql,
            values:[name, def, upvote, userid, downvote]
        })
    }
})

async function verifUtilisateur(email){
    const sql = "SELECT count(*) FROM users WHERE email=$1"
    const res = await client.query({
        text : sql,
        values:[email]
    })
    return parseInt(res.rows[0].count)
}

async function insert(nom, email, mdp){
    const hash = await bcrypt.hash(mdp, 10)
    const s = "SELECT * FROM users"
    const re = await client.query({
        text : s,
        values:[]
    })

    if(re.rowCount === 0){
        const sql = "INSERT INTO users(id, name, email, password) values (1, $1, $2, $3)"
        const res = await client.query({
            text : sql,
            values:[nom, email, hash]
        })
        return res.rowCount
    }
    const sql = "INSERT INTO users(id, name, email, password) select 1+max(id),$1, $2, $3 from users"
    const res = await client.query({
        text : sql,
        values:[nom, email, hash]
    })
    return res.rowCount
}

router.post('/Inscription', (req, res) => {
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
    const sql = "SELECT password FROM users WHERE email=$1"
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
    const sql = "SELECT id FROM users WHERE email=$1"
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

router.post('/Connexion', (req, res) => {
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
// Alexandre doit le faire


async function getConnections(mail){
    const sql = "SELECT * FROM public.users WHERE email='"+mail+"';"
    const rendu = await client.query({
        text: sql
    })
    console.log(rendu.rows[0].password)
    return rendu.rows
}

router.post('/login', async (req, res) =>{
    let input = {
        email : req.body.email,
        password : req.body.password
    }
    const rendu = await getConnections(input.email)
    if(rendu.length > 0){
        console.log(rendu)
        if(await bcrypt.compare(input.password,rendu[0].password)){
            req.session.userId = rendu[0].id
            res.json({message :"job done"})
        }
        else{
            res.status(400).json({message :"bad password"})
        }
    }
    else{
        res.status(400).json({message :"not good"})
    }
})

router.put('/definition', async(req, res) => {

    let input = {
        id : req.body.id,
        name : req.body.name,
        def : req.body.def,
        upvote : req.body.upvote,
        userid : req.body.userid,
        downvote : req.body.downvote
    }

    let defs = await client.query({
        text: "SELECT * FROM definitions WHERE id=$1",
        values: [input.id]
    })

    if (defs.rows.length < 1) {
        res.json(null)
        return
    }

    let sql = "UPDATE definitions SET name = $2, def = $3, upvote = $4, userid = $5, downvote = $6 WHERE id=$1"
    await client.query({
        text: sql,
        values: [input.id, input.name, input.def, input.upvote, input.userid, input.downvote]
    });

    let result = await client.query({
        text: "SELECT * FROM definitions WHERE id=$1",
        values: [input.id]
    });
    res.json(result.rows)
})

router.delete('/definition', async(req, res) => {

    let id = req.body.id

    console.log(id)

    let sql = "DELETE FROM definitions WHERE id= $1"
    let result = await client.query({
        text: sql,
        values: [id]
    });

    res.json(result.rows)
})

router.get('/podium', async(req,res)=>{
    const test = "SELECT * FROM public.definitions ORDER BY upvote DESC"
    const rendu = await client.query({
        text: test,
    })
    console.log(rendu.rows)
    res.json(rendu.rows)
})

module.exports = router