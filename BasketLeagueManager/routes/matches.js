import express from "express";
import Match from "../models/match.js";
import { protegerRuta } from "../auth/auth.js";

const router = express.Router();

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

router.post("/", protegerRuta(['admin', 'manager']), async (req, res) => {
  try {
    if (
      !req.body.tournament ||
      !req.body.date ||
      !req.body.stage ||
      !req.body.homeTeam ||
      !req.body.awayTeam ||
      req.body.homeScore === undefined ||
      req.body.awayScore === undefined
    ) {
      return res.status(400).json({
        error: "Faltan campos obligatorios",
        result: null,
      });
    }

    if (req.body.homeTeam === req.body.awayTeam) {
      return res.status(400).json({
        error: "El equipo local y visitante no pueden ser el mismo",
        result: null,
      });
    }

    const match = new Match(req.body);
    const savedMatch = await match.save();

    const populatedResult = await Match.findById(savedMatch._id)
      .populate("homeTeam", "name")
      .populate("awayTeam", "name");

    return res.status(201).json({
      result: populatedResult,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
      result: null,
    });
  }
});

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