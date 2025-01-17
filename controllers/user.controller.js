const express = require('express'), router = express.Router()

const service = require('../services/user.service')

router.get('/', async (req, res) => {
    const users = await service.getAllusers()
    res.send(users)
})

module.exports = router;