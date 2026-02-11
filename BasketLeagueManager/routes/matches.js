import express from "express";
import Match from "../models/match.js";
import Team from "../models/team.js";
import { protegerRuta } from "../auth/auth.js";

const router = express.Router();

//hecho
router.get("/", protegerRuta(['admin', 'manager', 'user']), async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("homeTeam", "name")
      .populate("awayTeam", "name");

    if (matches.length === 0) {
      res.render('error' , {error: 'No existen partidos registrado'});
    }

    res.render("matches_list" , {matches: matches});

  } catch (error) {
    res.render("error",{error:'Error interno del servidor'});
  }
});

//hecho
router.post("/", protegerRuta(['admin', 'manager']), async (req, res) => {
  try {
    let errors = {};
    
    if (!req.body.tournament || req.body.tournament.length < 3) errors.tournament = "El torneo es obligatorio (min 3 caracteres)";
    if (!req.body.date) errors.date = "La fecha es obligatoria";
    if (!req.body.stage) errors.stage = "La fase es obligatoria";
    if (!req.body.homeTeam) errors.homeTeam = "El equipo local es obligatorio";
    if (!req.body.awayTeam) errors.awayTeam = "El equipo visitante es obligatorio";
    if (req.body.homeScore === undefined || req.body.homeScore < 0) errors.homeScore = "Puntos local inválidos";
    if (req.body.awayScore === undefined || req.body.awayScore < 0) errors.awayScore = "Puntos visitante inválidos";

    if (req.body.homeTeam && req.body.awayTeam && req.body.homeTeam === req.body.awayTeam) {
        errors.awayTeam = "El equipo local y visitante no pueden ser el mismo";
    }

    if (Object.keys(errors).length > 0) {
        const teams = await Team.find();
        return res.render("match_add", {
            errors: errors,
            data: req.body,
            teams: teams
        });
    }

    const match = new Match(req.body);
    await match.save();

    res.redirect("/matches");
  } catch (error) {
    res.render("error", { error: "Error interno del servidor: " + error.message });
  }
});

router.get("/new", protegerRuta(['admin', 'manager', 'user']), async (req,res) =>{
  try {
      const teams = await Team.find();
      res.render("match_add", { teams: teams });
  } catch (error) {
      res.render("error", { error: "Error al cargar el formulario" });
  }
});

//hecho
router.get("/:id", protegerRuta(['admin', 'manager', 'user']), async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate("homeTeam")
      .populate("awayTeam")
      .populate("playerStats.player");

    if (!match) {
      res.render('error' , {error: 'Partido no encontrado'});
    }

    res.render('match_detail' , {match: match})
  } catch (error) {
    res.render('error' , {error: 'Error interno del servidor'});
  }
});

router.delete("/:id", protegerRuta(['admin', 'manager']), async (req, res) => {
  try {
    const match = await Match.findByIdAndRemove(req.params.id);

    if (!match) {
      return res.status(404).json({
        error: "Partido no encontrado",
        result: null,
      });
    }

    return res.status(200).json({
      error: null,
      result: match,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
      result: null,
    });
  }
});

export default router;