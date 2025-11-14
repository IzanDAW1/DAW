const mongoose = require('mongoose');

let libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 3,
        trim: true          // Esto no se pedía en el enunciado
    },
    editorial: {
        type: String
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    }
});

let Libro = mongoose.model('libro', libroSchema);
module.exports = Libro;