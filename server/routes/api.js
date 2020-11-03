const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'D0L1pr@nox',
    database: 'Urbandico'
})

client.connect()

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

router.post('/signup', async(req , res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    if(typeof name !== 'string' || name !== '' ||
    typeof email !== 'string' || email !== '' ||
    typeof password !== 'string' || password !== ''){
        res.status(400).json({message : 'Bad Request'})
    }

    const sml = "SELECT name, def, upvote FROM public.definitions"
    const users = await client.query({
        text: sml
    })

    const user = {
        id: users.rows.length,
        name: name,
        email: email,
        password: password
    }

    const sql = "INSERT INTO public.users("+
        "id, name, email, password)"+
        " VALUES('"+user.id+"' ,'"+user.name+"' ,'"+user.email+"' ,'"+user.password+"') RETURNING*"
    await client.query({
        text: sql
    })
})

module.exports = router