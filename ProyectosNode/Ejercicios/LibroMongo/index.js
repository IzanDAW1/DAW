const mongoose = require('mongoose');
const Libro = require(__dirname + "/modules/libros");
// Conexión a BD local
// En ciertas versiones de Mongoose no se permite "localhost"
mongoose.connect('mongodb://127.0.0.1:27017/libros');
/*
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
*/

/*
Libro.find({edad:{$gte: 10 , $lte: 20}}).then(resultado => {
    console.log(resultado);
}).catch (error => {
    console.log("ERROR:", error);
});

Libro.findById('68f0c7df7ad2841156a5c3c8')
.then(resultado => {
    console.log('Resultado de la búsqueda por ID:', resultado);
})
    */

Libro.findByIdAndDelete('68f0c7df7ad2841156a5c3c8')
.then(resultado => {
    console.log('Libro con id' + resultado + ' eliminado.');
})
.catch((resultado) => {
    console.log("ERROR:", error);
})

Libro.findByIdAndUpdate('68f0c7df7ad2841156a5c3c7', 
    { precio: 9, $inc: {__v: 1}} , { new: true, runValidators: true })
.then(resultado => {
    console.log("Modificado contacto:", resultado);
}).catch (error => {
    console.log("ERROR:", error);
});