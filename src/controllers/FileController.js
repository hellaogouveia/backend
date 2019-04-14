const Box = require("../models/Box");
const File = require("../models/File");

class FileController{
    async store(req,res){
        console.log(req.file);
        // await indica que é assíncrono
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        });

        box.files.push(file);

        await box.save();

        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }
};

module.exports = new FileController(); // new para retornar a estância da classe