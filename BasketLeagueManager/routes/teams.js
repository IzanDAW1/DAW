import express from "express";
import Team from "../models/team.js";
import Player from "../models/player.js";
import Match from "../models/match.js";
import { protegerRuta } from "../auth/auth.js";

let router = express.Router();

router.get("/", protegerRuta(['admin', 'manager', 'user']), async (req, res) => {
  try {
    const teams = await Team.find();
    if (teams.length === 0) {
      return res.status(404).json({
        error: "No se han encontrado equipos.",
        result: null,
      });
    }

    return res.status(200).json({
      error: null,
      result: teams,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
      result: null,
    });
  }
});

router.post("/", protegerRuta(['admin']), async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        error: "Datos incorrectos: falta el nombre del equipo",
        result: null,
      });
    }

    const existingTeams = await Team.find({ name: req.body.name });
    if (existingTeams.length > 0) {
      return res.status(400).json({
        error: "Datos incorrectos: ya existe un equipo con ese nombre",
        result: null,
      });
    }

    const newTeam = new Team({
      name: req.body.name,
      foundedAt: req.body.foundedAt,
      roster: req.body.roster,
    });

    const savedTeam = await newTeam.save();

    return res.status(201).json({
      result: savedTeam,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
      result: null,
    });
  }
});

router.delete("/:id", protegerRuta(['admin']), async (req, res) => {
  try {
    const teamToDelete = await Team.findById(req.params.id);

    if (!teamToDelete) {
      return res.status(404).json({
        error: "Equipo no encontrado",
        result: null,
      });
    }

    const matchesHome = await Match.findOne({ homeTeam: teamToDelete._id });
    const matchesAway = await Match.findOne({ awayTeam: teamToDelete._id });

    if (matchesHome || matchesAway) {
      return res.status(400).json({
        error: "No se puede eliminar el equipo porque tiene partidos asociados",
        result: null,
      });
    }

    const deletedTeam = await Team.findByIdAndRemove(req.params.id);

    return res.status(200).json({
      error: null,
      result: deletedTeam,
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
    const team = await Team.findById(req.params.id).populate("roster.player");

    if (!team) {
      return res.status(404).json({
        error: "No existe ese equipo en el sistema",
        result: null,
      });
    }

    const activeMembers = team.roster.filter(
      (member) => member && member.active
    );

    const result = {
      _id: team._id,
      name: team.name,
      foundedAt: team.foundedAt,
      roster: activeMembers,
    };

    return res.status(200).json({
      error: null,
      result: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
      result: null,
    });
  }
});

router.post("/:id/roster", protegerRuta(['admin', 'manager']), async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({
        error: "Equipo no encontrado",
        result: null,
      });
    }

    const playerToAdd = await Player.findById(req.body.player);
    if (!playerToAdd) {
      return res.status(404).json({
        error: "Jugador no encontrado",
        result: null,
      });
    }

    for (const member of team.roster) {
      if (member.player.toString() === req.body.player && member.active) {
        return res.status(400).json({
          error: "El jugador ya está activo en el roster de este equipo",
          result: null,
        });
      }
    }

    const otherTeam = await Team.findOne({
      _id: { $ne: team._id },
      roster: { $elemMatch: { player: playerToAdd._id, active: true } },
    });

    if (otherTeam) {
      return res.status(400).json({
        error: "El jugador está activo en otro equipo",
        result: null,
      });
    }

    const newRosterPlayer = {
      player: req.body.player,
      joinDate: req.body.joinDate,
      active: req.body.active || true,
    };

    team.roster.push(newRosterPlayer);

    await team.save();

    return res.status(200).json({
      error: null,
      result: team,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
      result: null,
    });
  }
});

router.delete("/:id/roster/:playerId", protegerRuta(['admin', 'manager']), async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        error: "Equipo no encontrado",
        result: null,
      });
    }

    for (const member of team.roster) {
      if (member.player.toString() === req.params.playerId && member.active) {
        member.active = false;

        await team.save();

        return res.status(200).json({
          error: null,
          result: team,
        });
      }
    }

    return res.status(404).json({
      error: "El jugador no está activo en el roster de este equipo",
      result: null,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
      result: null,
    });
  }
});

export default router;