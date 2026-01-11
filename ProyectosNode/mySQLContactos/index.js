 const mysql = require('mysql2');

// Cambiar usuario y contraseña por los que tengamos en
// nuestro sistema
let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "contactos"
});

conexion.connect((error) => {
    if (error)
        console.log("Error al conectar con la BD:", error);
    else
        console.log("Conexión satisfactoria");
});

conexion.query("SELECT * FROM contactos", 
(error, resultado, campos) => {
    if (error)
        console.log("Error al procesar la consulta");
    else 
    {
        resultado.forEach((contacto) => {
            console.log(contacto.nombre, ":",
                contacto.telefono);
        });
    }
});

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "contactos",
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    charset: "utf8mb4"
});

async function listarContactos() {
    const [resultado] = await pool.query(
        "SELECT * FROM contactos"
    );
    resultado.forEach(c =>
        console.log(c.nombre, ":", c.telefono)
    );
}
listarContactos();