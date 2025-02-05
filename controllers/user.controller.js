const express = require('express'), router = express.Router()

const service = require('../services/user.service')

router.get('/', async (req, res) => {
    token = req.headers.authorization
    const users = await service.getAllUsers(token)
    res.send(users)
})

router.get('/:id', async (req, res) => {
    token = req.headers.authorization
    const user = await service.getUserById(token, req.params.id)
    if (user == undefined)
        res.status(404).json('Não há registros com o id: ' + req.params.id)
    else
        res.send(user)
})

router.delete('/:id', async (req, res) => {
    token = req.headers.authorization
    const affectedRows = await service.deleteUser(token, req.params.id)
    if (affectedRows.success == 'false')
        res.status(404).json('Não há registros com o id: ' + req.params.id)
    else
        res.send(affectedRows)
})

router.post('/', async (req, res) => {
    token = req.headers.authorization
    const affectedRows = await service.addUser(token, req.body)
    res.status(200).send(affectedRows)
})

router.put('/:id', async (req, res) => {
    token = req.headers.authorization
    const affectedRows = await service.updateUser(token, req.params.id, req.body)
    if (affectedRows == 0)
        res.status(404).json('Não há registros com o id: ' + req.params.id + ' para alterar.')
    else
        res.status(200).send(affectedRows)
})


module.exports = router;