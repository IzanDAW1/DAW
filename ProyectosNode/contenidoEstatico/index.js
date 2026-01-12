const express = require('express');

let app = express();
app.use('/public', express.static(__dirname + '/public'));
// Acceso a Bootstrap con ruta raíz
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// Opcionalmente definimos servicio para mapear
// la ruta raíz con la página de inicio
app.get('/', (req, res) => {
    res.redirect('/public/index.html');
});

app.listen(8080);