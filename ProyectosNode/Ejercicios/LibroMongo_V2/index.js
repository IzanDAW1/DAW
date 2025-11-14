const express = require('express');
const mongoose = require('mongoose');
const Contacto = require(__dirname + "/modules/contacto");

// Conexión con la BD
mongoose.connect('mongodb://127.0.0.1:27017/contactos');

let app = express();

app.listen(8080)

app.get('/contactos', (req, res) => {
    Contacto.find().then(resultado => {
        res.status(200)
           .send( {ok: true, resultado: resultado});
    }).catch (error => {
        res.status(500)
           .send( {ok: false, 
                   error: "Error obteniendo contactos"});
    });
});

app.get('/contactos/:id', (req, res) => {
    Contacto.findById(req.params.id).then(resultado => {
        if(resultado)
            res.status(200)
               .send({ok: true, resultado: resultado});
        else
            res.status(400)
               .send({ok: false, 
                      error: "No se han encontrado contactos"});
    }).catch (error => {
        res.status(400)
           .send({ok: false, 
                  error: "Error buscando el contacto indicado"});
    }); 
});