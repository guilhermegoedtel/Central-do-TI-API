const db = require('../db')
const service = require('./login.service')

module.exports.addUpload = async (token, obj, nameFile) => {
    tokenValidate = await service.validate(token.split(' ')[1])
    if(tokenValidate.success == true){
        newNameFile = nameFile.split('.')[0];
        extensaoFile = nameFile.split('.')[1];
        const [affectedRows] = await db.query("INSERT INTO storage (nameDocument, extentionDocument) VALUES (?, ?)", [newNameFile, extensaoFile])
        const lastInsertId = affectedRows.insertId;
        if(lastInsertId == ''){
            data = { "success": true, "data": lastInsertId }
        } else {
            data = { "success": true, "data": "Houve um erro ao inserir o arquivo" }
        }
    } else {
        data = { success: false, error: "Token Inválido" };
    }
    return data;
}