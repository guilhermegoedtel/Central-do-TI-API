const express = require('express'), router = express.Router()

const service = require('../services/user.service')

router.get('/', async (req, res) => {
    const users = await service.getAllusers()
    res.send(users)
})

router.get('/:id', async (req, res) => {
    const user = await service.getuserById(req.params.id)
    if (user == undefined)
        res.status(404).json('Não há registros com o id: ' + req.params.id)
    else
        res.send(user)
})

module.exports = router;