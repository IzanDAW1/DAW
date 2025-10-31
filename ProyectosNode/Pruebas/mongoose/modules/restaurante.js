const mongoose = require('mongoose');

let restauranteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    direccion: {
        type: String,
        trim: true
    },
    telefono: {
        type: String,
        trim: true,
        match: /^\d{9}$/
    }
});

let Restaurante = mongoose.model('restaurantes', restauranteSchema);
module.exports = Restaurante;