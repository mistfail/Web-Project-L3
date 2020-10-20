const express = require('express')
const router = express.Router()
const definitions = require('../data/definitions.js')

router.get('/definitions', (req, res) => {
    res.json(definitions)
})
router.post('/definitions', (req, res) =>{
    const name = req.body.name
    const def = req.body.def
    const upvote = req.body.upvote
})

module.exports = router