/*
Ejercicio de práctica con las diferentes opciones que ofrece Mongoose
para gestionar documentos y colecciones en MongoDB
*/

// Ejercicio 1: instalar Mongoose, cargarlo en la aplicación, 
// conectar con la base de datos y 
// definir el esquema y modelo de la colección de libros

const mongoose = require('mongoose');
const Libro = require(__dirname + '/models/libro');

mongoose.connect('mongodb://127.0.0.1:27017/libros');

// Ejercicio 2: insertar un par de libros válidos

/* Comentamos este código para esta versión del ejercicio

let libro1 = new Libro({
    titulo: "El capitán Alatriste",
    editorial: "Alfaguara",
    precio: 15
});
libro1.save().then(resultado => {
    console.log("Libro añadido:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});

let libro2 = new Libro({
    titulo: "El juego de Ender",
    editorial: "Ediciones B",
    precio: 8.95
});
libro2.save().then(resultado => {
    console.log("Libro añadido:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});
*/

// Ejercicio 3: búsquedas de libros
// Buscar libros entre 10 y 20 euros
// Buscar libro por ID (cambiar el id por uno válido para probar)

//Libro.find({precio: {$gte: 10, $lte: 20}}).then(resultado => {
//    console.log("Resultado de la búsqueda por precios:", resultado);
//}).catch(error => {
//    console.log("ERROR:", error);
//});
//
//Libro.findById("5ab3953b5a5d4643e9d4cdde").then(resultado => {
//    console.log("Resultado de la búsqueda por id:", resultado);
//}).catch(error => {
//    console.log("ERROR:", error);
//});

// Ejercicio 4: Borrado y modificación de libros
// Se debe mostrar por consola el libro borrado/modificado
// Modificar los id por otros válidos en la colección indicada

//Libro.findByIdAndRemove("5ab3ff4f42f2304466e4a2cd").then(resultado => {
//    console.log("Libro eliminado:", resultado);
//}).catch(error => {
//    console.log("ERROR eliminando libro:", error)
//});
//
//Libro.findByIdAndUpdate("5ab3953b5a5d4643e9d4cdde", 
//{$set: {precio: 50}, $inc: {__v: 1}}, {new:true}).then(resultado => {
//    console.log("Libro actualizado correctamente:", resultado);
//}).catch(error => {
//    console.log("ERROR actualizando libro:", error);
//});

let Autor = require(__dirname + '/models/autores');

/*
let autor1 = new Autor({
    nombre: "Arturo Pérez-Reverte",
    anyo: 1951
});
autor1.save().then(resultado => {
    console.log("Autor añadido:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});

let autor2 = new Autor({
    nombre: "Orson Scott Card",
    anyo: 1951
});
autor2.save().then(resultado => {
    console.log("Autor añadido:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});

let libro3 = new Libro({
    titulo: "La sombra del águila",
    editorial: "Alfaguara",
    precio: 20,
    autores: autor1._id
});
libro3.save().then(resultado => {
    console.log("Libro añadido:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});
/*
Libro.find({ precio: { $lt: 10 } })
.then(resultadoLibros => {
    let idsAutores = resultadoLibros.map(libro => libro.autores);
    Autor.find({ _id: { $in: idsAutores } })
    .then(resultadoAutores => {
        console.log("Autores de los libros con precio menor a 10 euros:", resultadoAutores);
    }).catch(error => {
        console.log("ERROR buscando autores:", error);
    }); 
});
*/
Libro.find().sort('precio').limit(3).select('titulo precio')
.then(resultado => {
    console.log("Los 3 libros más baratos son:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});