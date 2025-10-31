const mongoose = require('mongoose');

let autorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    anoNacimiento: {
        type: Number,
        min: 0,
        max: 2000,
    }
});

let Autor = mongoose.model('autores', autorSchema);
module.exports = Autor;