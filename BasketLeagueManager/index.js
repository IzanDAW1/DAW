import express from "express";
import mongoose from "mongoose";

import players from "./routes/players.js";
import teams from "./routes/teams.js";
import matches from "./routes/matches.js";
import auth from "./routes/auth.js";

mongoose.connect("mongodb://127.0.0.1:27017/basketleaguemanager");

let app = express();

app.use(express.json());

app.use("/players", players);
app.use("/teams", teams);
app.use("/matches", matches);
app.use('/auth', auth);

app.listen(8080);
