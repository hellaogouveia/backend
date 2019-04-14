const mongoose = require('mongoose');

const File = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        path:{
            type: String,
            required: true,
        },
    }, 
    {
        timestamps: true,
        toObject: {virtuals: true},//quando File convertido em objeto
        toJSON: {virtuals: true} // ou json, chama o método virtual
    }
);

// campo virtual: não existe no mongo (banco de dados)
File.virtual("url").get(function(){
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('File',File);


