const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '',
    database: 'Urbandico'
})

client.connect()

async function addDef(name, def, upvote){
    const sql = "INSERT INTO public.definitions("+
        "name, def, upvote)"+ " VALUES('"+name+"' ,'"+def+"' ,'"+upvote+"') RETURNING*"
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
    const definitions = []
    for (let i = 0; i < defs.length; i++){
        definitions.push(defs[i])
    }
    res.json(definitions)
})

router.post('/definition', async (req, res) =>{
    const name = req.body.name
    const def = req.body.def

    if (typeof name !== 'string' || name === '' ||
        typeof def !== 'string' || def === ''){
        res.status(400).json({message: 'bad'})
        return
    }

    const definition = {
        name: name,
        def: def,
        upvote: 0
    }

    await addDef(definition.name, definition.def, definition.upvote)
})


module.exports = router