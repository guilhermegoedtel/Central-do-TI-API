const express = require('express'), app = express(), bodyparser = require('body-parser');

require('express-async-errors')

userRoutes = require('./controllers/user.controller')
loginRoutes = require('./controllers/login.controller')
uploadRoutes = require('./controllers/upload.controller')

app.use(bodyparser.json())

app.use('/api/users', userRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/upload', uploadRoutes)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send('Something went wrong!')
})    

app.listen(3000, () => console.log('server started at 3000'))