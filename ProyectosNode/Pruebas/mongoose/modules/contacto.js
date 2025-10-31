const mongoose = require('mongoose');
const Restaurante = require('./restaurante');

let contactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\d{9}$/
    },
    edad: {
        type: Number,
        min: 18,
        max: 120
    },
    restauranteFavorito: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurantes'
    },
    mascotas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mascotas' 
    }]
});

let Contacto = mongoose.model('contactos', contactoSchema);
module.exports = Contacto;