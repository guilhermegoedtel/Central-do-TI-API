const express = require('express'), router = express.Router()

const service = require('../services/user.service')

router.get('/', async (req, res) => {
    const users = await service.getAllUsers()
    res.send(users)
})

router.get('/:id', async (req, res) => {
    const user = await service.getUserById(req.params.id)
    if (user == undefined)
        res.status(404).json('Não há registros com o id: ' + req.params.id)
    else
        res.send(user)
})

router.delete('/:id', async (req, res) => {
    const affectedRows = await service.deleteUser(req.params.id)
    if (affectedRows == 0)
        res.status(404).json('Não há registros com o id: ' + req.params.id)
    else
        res.send('Deletado com sucesso.')
})

router.post('/', async (req, res) => {
    await service.addUser(req.body)
    res.status(200).send('Criado com sucesso.')
})

router.put('/:id', async (req, res) => {
    const affectedRows = await service.updateUser(req.body, req.params.id)
    if (affectedRows == 0)
        res.status(404).json('Não há registros com o id: ' + req.params.id + ' para alterar.')
    else
        res.status(200).send('Atualizado com sucesso.')
})


module.exports = router;