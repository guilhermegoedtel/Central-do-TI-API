const express = require('express'), router = express.Router()
const service = require('../services/upload.service')
const multer  = require('multer')
var nameFile  = '' 

// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(32)
            .toString('hex');

        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
        nameFile = novoNomeArquivo + '.' + extensaoArquivo
    }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
    token = req.headers.authorization
    if(nameFile != ''){
        const affectedRows = await service.addUpload(token, req.body, nameFile)
        res.status(200).send(affectedRows)
    } else {
        res.status(200).send({ success: false, error: "Nenhuma imagem foi anexada" })
    }
})

module.exports = router;