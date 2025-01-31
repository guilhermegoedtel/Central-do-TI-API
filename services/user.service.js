const db = require('../db')
var md5 = require('md5')
const service = require('./login.service')

module.exports.getAllUsers = async (obj) => {
    token_validate = await service.validate(obj)
    if(token_validate.success == true){
        [record] = await db.query("SELECT * FROM users")
        data = { "success": true, "data": record }
    } else {
        data = { success: false, error: "Token Inválido" };
    }
    return data;
}

module.exports.getUserById = async (obj, id) => {
    token_validate = await service.validate(obj)
    if(token_validate.success == true){
        [[record]] = await db.query("SELECT * FROM users WHERE id = ?", [id])
        console.log(record)
        data = { "success": true, "data": record }
    } else {
        data = { success: false, error: "Token Inválido" };
    }
    return data;
}

module.exports.deleteUser = async (obj, id) => {
    token_validate = await service.validate(obj)
    const [{ affectedRows }] = await db.query("DELETE FROM users WHERE id = ?", [id])
    return affectedRows;
}

module.exports.addUser = async (obj) => {
    token_validate = await service.validate(obj)
    const [{ affectedRows }] = await db.query("INSERT INTO users (name, user, password) VALUES (?, ?, ?)", 
        [obj.name, obj.user, md5(obj.password)])
    return affectedRows;
}

module.exports.updateUser = async (obj, id) => {
    token_validate = await service.validate(obj)
    const [records] = await db.query("SELECT password FROM users WHERE id = ?", [id])
    if (records[0].password == md5(obj.password)) {
        password = records[0].password
    } else {
        password = md5(obj.password)
    }
    const [{ affectedRows }] = await db.query("UPDATE users SET name = ?, user = ?, password = ? WHERE id = ?", 
        [obj.name, obj.user, password, id])
    return affectedRows;
}