const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

//possibilita usar protocolo http e ws(real time)
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connection" , socket => { // socket é a representação da conexão do usuário
    socket.on('connectRoom', box => {
        socket.join(box);
    })
    console.log("ok");
})

mongoose.connect('mongodb+srv://hellen:hellen@cluster0-tas72.mongodb.net/omnistack?retryWrites=true',{
    useNewUrlParser: true
});

// tudo o que vier após esse middleware terá acesso ao io
app.use((req, res, next)=>{
    req.io = io;

    return next();//se não tiver, as requisições para aqui
});

//ajuda o servidor a entender json
app.use(express.json());//cadastrar módulo dentro do express
app.use(express.urlencoded({extended: true})); // permite enviar arquivos nas requisições
//quando acessar a rota files, vai buscar os arquivos físicos
app.use('/files',express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes')); // ./ indica que é um arquivo

server.listen(3333); //define porta


/*
app.get('/teste', (req, res)=>{
    return res.send('Hello World');
}) // criando rota 

 */

