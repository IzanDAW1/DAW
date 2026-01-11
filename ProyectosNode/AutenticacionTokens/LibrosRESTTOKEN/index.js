// Carga de librerías
const express = require('express');
const mongoose = require('mongoose');

// Enrutadores
const libros = require(__dirname + '/routes/libros');
const autores = require(__dirname + '/routes/autores'); // Para la parte opcional

// Conectar con BD en Mongo 
mongoose.connect('mongodb://127.0.0.1:27017/libros');

// Inicializar Express
let app = express();

// Cargar middleware para peticiones POST y PUT
// y enrutadores
app.use(express.json());
app.use('/libros', libros);
app.use('/autores', autores) // Para la parte opcional

let usuarios =[{login:"admin",password:"admin",rol:"admin"},{login:"user",password:"user",rol:"edidtor"},{login:"guest",password:"guest",rol:"editor"}];

let secreto = "secretoNode";

let generarToken = (login,rol) => {
  return jwt.sign({ login: login, rol: rol  }, secreto, { expiresIn: "2 hours" });
};

let validarToken = (token) => {
  try {
    let resultado = jwt.verify(token.substring(7), secreto);
    return resultado;
  } catch (e) {}
};
// Puesta en marcha del servidor
app.listen(8080);