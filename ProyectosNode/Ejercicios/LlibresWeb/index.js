// Carga de librerías
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');

// Enrutadores
const libros = require(__dirname + '/routes/libros');
const autores = require(__dirname + '/routes/autores'); // Para la parte opcional

// Conectar con BD en Mongo 
mongoose.connect('mongodb://127.0.0.1:27017/libros');

// Inicializar Express
let app = express();

//Configurar nunjucks
nunjucks.configure('views',{
    autoescape: true,
    express: app
});

//Asignar motor plantillas
app.set('view engine','njk');

// Middleware para peticiones POST y PUT
// Middleware para estilos Bootstrap
// Enrutadores para cada grupo de rutas
app.use(express.json());
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/libros', libros);
app.use('/autores', autores)

// Puesta en marcha del servidor
app.listen(8080);