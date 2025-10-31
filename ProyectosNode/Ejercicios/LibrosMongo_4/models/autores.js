const mongoose = require('mongoose');

let autoresSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3
    },
    anyo:{
        type: Number,
    }
});

let Autor = mongoose.model('autor', autoresSchema);
module.exports = Autor;