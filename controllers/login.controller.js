const express = require('express'), router = express.Router()

const service = require('../services/login.service')

// LOGIN
router.post('/token', async (req, res) => {
    const token = await service.login(req.body)
    res.status(200).json(token)
})

// VALIDATE LOGIN
router.post('/validate', async (req, res) => {
    const validate = await service.validate(req.body.token)
    res.status(200).send(validate)
})

module.exports = router;