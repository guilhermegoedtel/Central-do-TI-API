const db = require('../db')
var md5 = require('md5')
const service = require('./login.service')

module.exports.getAllUsers = async (token) => {
    tokenValidate = await service.validate(token.split(' ')[1])
    if(tokenValidate.success == true){
        [record] = await db.query("SELECT * FROM users")
        data = { "success": true, "data": record }
    } else {
        data = { success: false, error: "Token Inválido" };
    }
    return data;
}

module.exports.getUserById = async (token, id) => {
    tokenValidate = await service.validate(token.split(' ')[1])
    if(tokenValidate.success == true){
        [record] = await db.query("SELECT * FROM users WHERE id = ?", [id])
        data = { "success": true, "data": record }
    } else {
        data = { success: false, error: "Token Inválido" };
    }
    return data;
}

module.exports.deleteUser = async (token, id) => {
    tokenValidate = await service.validate(token.split(' ')[1])
    if(tokenValidate.success == true){
        const [{ affectedRows }] = await db.query("DELETE FROM users WHERE id = ?", [id])
        if(affectedRows == 1){
            data = { "success": true, "data": "Usuário apagado" }
        } else {
            data = { "success": true, "data": "Usuário já deletado" }
        }
    } else {
        data = { success: false, error: "Token Inválido" };
    }
    return data;
}

module.exports.addUser = async (token, obj) => {
    tokenValidate = await service.validate(token.split(' ')[1])
    if(tokenValidate.success == true){
        const [{ affectedRows }] = await db.query("INSERT INTO users (name, user, password) VALUES (?, ?, ?)", [obj.name, obj.user, md5(obj.password)])
        if(affectedRows == 1){
            data = { "success": true, "data": "Usuário criado com sucesso" }
        } else {
            data = { "success": true, "data": "Houve um erro ao cadastrar o usuário" }
        }
    } else {
        data = { success: false, error: "Token Inválido" };
    }
    return data;
}

module.exports.updateUser = async (token, id, obj) => {
    tokenValidate = await service.validate(token.split(' ')[1])
    if(tokenValidate.success == true){
        const [records] = await db.query("SELECT password FROM users WHERE id = ?", [id])
        if (records[0].password == md5(obj.password)) {
            password = records[0].password
        } else {
            password = md5(obj.password)
        }
        const [{ affectedRows }] = await db.query("UPDATE users SET name = ?, user = ?, password = ? WHERE id = ?",  [obj.name, obj.user, password, id])
        if(affectedRows == 1){
            data = { "success": true, "data": "Usuário Atualizado com sucesso" }
        } else {
            data = { "success": true, "data": "Houve um erro ao atualizar o usuário" }
        }
    } else {
        data = { success: false, error: "Token Inválido" };
    }
    return data;
}