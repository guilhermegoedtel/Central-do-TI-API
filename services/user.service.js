const db = require('../db')
var md5 = require('md5')

module.exports.getAllUsers = async () => {
    const [records] = await db.query("SELECT * FROM users")
    return records;
}

module.exports.getUserById = async (id) => {
    const [[record]] = await db.query("SELECT * FROM users WHERE id = ?", [id])
    return record;
}

module.exports.deleteUser = async (id) => {
    const [{ affectedRows }] = await db.query("DELETE FROM users WHERE id = ?", [id])
    return affectedRows;
}

module.exports.addUser = async (obj) => {
    const [{ affectedRows }] = await db.query("INSERT INTO users (name, user, password) VALUES (?, ?, ?)", 
        [obj.name, obj.user, md5(obj.password)])
    return affectedRows;
}

module.exports.updateUser = async (obj, id) => {
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