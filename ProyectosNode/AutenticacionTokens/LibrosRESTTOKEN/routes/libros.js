const express = require('express');

let Libro = require(__dirname + '/../models/libro.js');
let router = express.Router();

// Servicio de listado general
router.get('/', (req, res) => {
    Libro.find().then(resultado => {
        res.status(200)
           .send({ ok: true, resultado: resultado });
    }).catch (error => {
        res.status(500)
           .send({ ok: false, error: "Error listando libros" });
    }); 
});

// Servicio de listado por id
router.get('/:id', (req, res) => {
    Libro.findById(req.params.id).then(resultado => {
        if(resultado)
            res.status(200)
               .send({ ok: true, resultado: resultado });
        else
            res.status(400)
               .send({ ok: false, 
                       error: "No se han encontrado libros"});
    }).catch (error => {
        res.status(400)
           .send({ ok: false, 
                   error: "Error buscando el libro indicado"});
    }); 
});

// Servicio para insertar libros
router.post('/', (req, res) => {

    let nuevoLibro = new Libro({
        titulo: req.body.titulo,
        editorial: req.body.editorial,
        precio: req.body.precio,
        autor: req.body.autor
    });
    nuevoLibro.save().then(resultado => {
        res.status(200)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error: "Error añadiendo libro"});
    });
});

// Servicio para modificar libros
router.put('/:id', (req, res) => {

    Libro.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            editorial: req.body.editorial,
            precio: req.body.precio,
            autor: req.body.autor
        }
    }, {new: true}).then(resultado => {
        if (resultado)
            res.status(200)
               .send({ok: true, resultado: resultado});
        else
            res.status(400)
               .send({ok: false, 
                      error: "No se ha encontrado el libro para actualizar"});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error actualizando libro"});
    });
});

// Servicio para borrar libros
router.delete('/:id', (req, res) => {

    Libro.findByIdAndRemove(req.params.id).then(resultado => {
        if (resultado)
            res.status(200)
               .send({ok: true, resultado: resultado});
        else
            res.status(400)
               .send({ok: false, 
                      error: "No se ha encontrado el libro para eliminar"});
    }).catch(error => {
        res.status(400)
           .send({ok: true, 
                  error:"Error eliminando libro"});
    });
});

module.exports = router;