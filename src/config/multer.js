const multer = require('multer'); // possibilita acessar os arquivos vindos do front-end
const path = require('path'); 
const crypto = require('crypto'); // gera um hash para armazenar como nome do arquivo

module.exports = {
    dest: path.resolve(__dirname, '..', '..','tmp'), //destino 
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..','tmp'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);//se der erro, retorna o erro
                // nome do arquivo será o hash-nome_original_do_arquivo
                file.key = `${hash.toString('hex')}=${file.originalname}`;

                cb(null, file.key); // se der tudo certo, retorna o hash
            })
        }
    })
};