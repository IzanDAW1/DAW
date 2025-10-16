const mongoose = require('mongoose');
// Conexión a BD local
// En ciertas versiones de Mongoose no se permite "localhost"
mongoose.connect('mongodb://127.0.0.1:27017/nombreBD');

// Conexión a BD en la nube (consultar URL en Atlas)
mongoose.connect('mongodb+srv://usuario:password@url_cluster/nombreBD?parametros');