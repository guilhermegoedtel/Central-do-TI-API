const express = require('express'), app = express(), bodyparser = require('body-parser');

require('express-async-errors')

const db = require('./db')

app.listen(3000, () => console.log('server started at 3000'))