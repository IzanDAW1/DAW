 const mysql = require('mysql2');

// Cambiar usuario y contraseña por los que tengamos en
// nuestro sistema
let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "libros"
});

conexion.connect((error) => {
    if (error)
        console.log("Error al conectar con la BD:", error);
    else
        console.log("Conexión satisfactoria");
});

conexion.query("INSERT INTO libros (price,name) VALUES(13,'')", 
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