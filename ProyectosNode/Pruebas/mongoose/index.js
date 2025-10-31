const mongoose = require("mongoose");

const Contacto = require(__dirname + "/modules/contacto");
const Restaurante = require(__dirname + "/modules/restaurante");
const Mascota = require(__dirname + "/modules/mascota");
// Conexión a BD local
// En ciertas versiones de Mongoose no se permite "localhost"
mongoose.connect("mongodb://127.0.0.1:27017/contactos_subdocumentos");

/*
Promise.all([restaurante1.save(), mascota1.save(), mascota2.save()])
    .then(([restauranteGuardado, mascotaGuardada1, mascotaGuardada2]) => {
    // Una vez que se hayan guardado el restaurante y las mascotas, podemos crear el contacto
    let contacto1 = new Contacto({
        nombre: "Nacho",
        telefono: 677889900,
        edad: 40,
      restauranteFavorito: restauranteGuardado._id, // Referencia al _id del restaurante guardado
      mascotas: [mascotaGuardada1._id, mascotaGuardada2._id], // Referencia a los _id de las mascotas guardadas
    });

    // Guardar el contacto
    return contacto1.save();
    })
    .then((contactoGuardado) => {
    console.log("Contacto guardado correctamente:", contactoGuardado);
    })
    .catch((error) => {
    console.error("Error en el proceso de inserción:", error);
    });
*/

let restaurante = new Restaurante({
    nombre: "Pizzeria Roma",
    direccion: "Calle Falsa 123",
    telefono: "912345678"
});

let mascota1 = new Mascota({
    nombre: "Firulais",
    tipo: "perro"
});

let contactoTodo = Contacto({
    nombre: "Ana",
    telefono: "699887766",
    edad: 30,
    restauranteFavorito: restaurante._id,
    mascotas: [mascota1._id]
});
/*
contactoTodo.save()
.then(() => {
    return Promise.all([restaurante.save(), mascota1.save()]);
})
.then(() => {
    console.log("Contacto, restaurante y mascota guardados correctamente.");
})
.catch((error) => {
    console.error("Error al guardar los datos:", error);
});
*/


Contacto.find()
.populate('restauranteFavorito')
.populate('mascotas')
.then(resultado => {
    console.log(JSON.stringify(resultado,null,2));
});