const db = require('../db')

module.exports.getAllusers = async () => {
    const [records] = await db.query("SELECT * FROM users")
    return records;
}

module.exports.getuserById = async (id) => {
    const [[record]] = await db.query("SELECT * FROM users WHERE id = ?", [id])
    return record;
}