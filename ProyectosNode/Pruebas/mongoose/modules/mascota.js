const mongoose = require('mongoose');

let mascotaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['perro', 'gato', 'otro']
    }
});

let Mascota = mongoose.model('mascotas', mascotaSchema);
module.exports = Mascota;