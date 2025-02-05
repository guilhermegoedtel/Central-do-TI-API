const db = require('../db')
var md5 = require('md5')
const jwt = require('jsonwebtoken');
const private_key = require('../key')

module.exports.login = async (obj) => {
    var user = obj.login
    var password = md5(obj.password)
    var [result] = await db.query("SELECT * FROM users WHERE user = ? AND password = ? LIMIT 1", [user, password])
    if((result.length) == ''){
        data = { "success": false, "token": "" }
    } else {
        const payload = {
            id: result[0].id,
            name: result[0].name,
            user: result[0].user
        };
        const secret = private_key;
        const options = { expiresIn: '16h' };
        token = jwt.sign(payload, secret, options);
        data = { "success": true, "token": token }
    }
    return data;
}

module.exports.validate = async (token) => {
    try {
        const secret = private_key;
        const decoded = jwt.verify(token, secret);
        return { success: true, data: decoded };
    } catch (error) {
        return { success: false, error: error.message };
    }
}