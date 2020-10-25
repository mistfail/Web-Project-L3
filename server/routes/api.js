const express = require('express')
const router = express.Router()
const definitions = require('../data/definitions.js')

router.get('/definitions', (req, res) => {
    res.json(definitions)
})
router.post('/definition', (req, res) =>{
    const name = req.body.name
    const def = req.body.def

    if (typeof name !== 'string' || name === '' ||
        typeof def !== 'string' || def === ''){
        res.status(400).json({message: 'bad'})
        return
    }

    const definition = {
        id: definitions.length + 1,
        name: name,
        def: def,
        upvote: 0
    }
    definitions.push(definition)
    res.json(definition)
})

module.exports = router