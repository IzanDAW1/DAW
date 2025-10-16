const mongoose = require('mongoose');
const Libro = require(__dirname + "/modules/libros");
// Conexión a BD local
// En ciertas versiones de Mongoose no se permite "localhost"
mongoose.connect('mongodb://127.0.0.1:27017/libros');

let libro1 = new Libro({
    titulo: "El capitán Alatriste",
    editorial: "Alfaguara", 
    precio: 15
});
libro1.save().then(resultado => {
    console.log("Libro añadido:", resultado);
}).catch(error => {
    console.log("ERROR añadiendo libro:", error);
});

let libro2 = new Libro({
    titulo: "El juego de Ender",
    editorial: "Ediciones B", 
    precio: 8.95
});
libro2.save().then(resultado => {
    console.log("Libro añadido:", resultado);
}).catch(error => {
    console.log("ERROR añadiendo libro:", error);
});