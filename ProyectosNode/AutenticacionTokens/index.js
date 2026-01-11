/*
    Ejemplo de autenticación basada en tokens, usando el módulo "jsonwebtoken".
    Definimos una palabra secreta para encriptar los tokens, y un array de usuarios
    registrados para simular una base de datos.

    El middleware "protegerRuta" se aplica a cada servicio con acceso restringido
*/

// Cargamos librerías necesarias
const express = require("express");
const jwt = require("jsonwebtoken");

// Palabra secreta para firmar y verificar los tokens
const secreto = "secretoNode";

// Base de datos simulada de usuarios registrados
const usuarios = [
  { usuario: "nacho", password: "12345" },
  { usuario: "pepe", password: "pepe111" },
];

// Función que genera un token JWT para un usuario autenticado
// Recibe el nombre de usuario como parámetro
let generarToken = (login) => {
  return jwt.sign({ login: login }, secreto, { expiresIn: "2 hours" });
};

// Función para validar el token JWT recibido
let validarToken = (token) => {
  try {
    let resultado = jwt.verify(token.substring(7), secreto);
    return resultado;
  } catch (e) {}
};

// Middleware para proteger rutas
let protegerRuta = (req, res, next) => {
  let token = req.headers["authorization"];
  if (validarToken(token)) next();
  else res.send({ ok: false, error: "Usuario no autorizado" });
};

// Inicializa la aplicación Express
let app = express();

// Configura Express para recibir datos JSON en las solicitudes
app.use(express.json());

// Ruta pública de inicio, sin protección
app.get("/", (req, res) => {
  res.send({ ok: true, resultado: "Bienvenido a la ruta de inicio" });
});

// Ruta protegida, que requiere autenticación
app.get("/protegido", protegerRuta, (req, res) => {
  res.send({ ok: true, resultado: "Bienvenido a la zona protegida" });
});

// Ruta de inicio de sesión para autenticación de usuarios
app.post("/login", (req, res) => {
  let usuario = req.body.usuario;
  let password = req.body.password;

  // Verifica si el usuario existe en la "base de datos" simulada
  let existeUsuario = usuarios.filter(
    (u) => u.usuario == usuario && u.password == password
  );

  if (existeUsuario.length == 1)
    // Si las credenciales son correctas, genera y envía un token
    res.send({ ok: true, token: generarToken(usuario) });
  else res.send({ ok: false });
});

// Configura la aplicación para que escuche en el puerto 8080
app.listen(8080);
