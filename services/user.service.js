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

