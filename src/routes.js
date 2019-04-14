const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

// GET - buscar informação / POST - criar / PUT - editar / DELETE - deletar

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id",BoxController.show);
// passa multer como parâmetro pois ele que vai lidar com o arquivo
// método single define que será um arquivo por vez
routes.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store);

//req representa a requisição ao servidor
//res representa o retorno(resposta) da requisição
routes.get('/teste',(req, res)=>{
    return res.send('Hello World - Rocket');
})

module.exports = routes; // exporta informação do arquivo - exportando routes
