const mongoose = require('mongoose');

let librosSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    editorial: {
        type: String,
        trim: true,
    },
    precio: {
        type: Number,
        min: 0,
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'autores',
    }
});

let Libro = mongoose.model('libros', librosSchema);
module.exports = Libro;

