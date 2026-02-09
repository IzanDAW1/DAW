import express from "express";
import mongoose from "mongoose";
import nunjucks from "nunjucks"; 
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import players from "./routes/players.js";
import teams from "./routes/teams.js";
import matches from "./routes/matches.js";
import auth from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect("mongodb://127.0.0.1:27017/basketleaguemanager");

let app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'njk');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(cookieParser());

app.use("/players", players);
app.use("/teams", teams);
app.use("/matches", matches);
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.render('base');
});

app.listen(8080, () => {
    console.log("Servidor corriendo en http://localhost:8080");
});