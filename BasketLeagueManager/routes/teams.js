import express from "express";
import Team from "../models/team.js";
import Player from "../models/player.js";
import Match from "../models/match.js";
import { protegerRuta } from "../auth/auth.js";

let router = express.Router();

//hecho
router.get("/", protegerRuta(["admin", "manager", "user"]), async (req, res) => {
  try {
    const teams = await Team.find();

    if (!teams) {
      res.render("error", { error: "No hay equipos" });
    }

    res.render("teams_list", { teams: teams });
  } catch (error) {
    res.render("error", { error: "Error interno del servidor" });
  }
});

//hecho
router.post("/", protegerRuta(["admin"]), async (req, res) => {
  try {
    let errors = {};

    if (!req.body.name) {
      errors.name = "El nombre es obligatorio";
    } else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 50) {
      errors.name = "El nombre debe tener entre 3 y 50 caracteres";
    } else {
        const existingTeams = await Team.find({ name: req.body.name });
        if (existingTeams.length > 0) {
          errors.name = "Ya existe un equipo con ese nombre";
        }
    }

    if (Object.keys(errors).length > 0) {
      return res.render("team_add", {
        errors: errors,
        data: req.body
      });
    }

    const newTeam = new Team({
      name: req.body.name,
      foundedAt: req.body.foundedAt,
      roster: [],
    });

    await newTeam.save();

    res.redirect("/teams");
  } catch (error) {
    res.render("error", { error: "Error interno del servidor" });
  }
});

//hecho
router.get("/new", protegerRuta(["admin"]), async (req, res) => {
  res.render("team_add");
});

//hecho
router.get("/:id", protegerRuta(["admin", "manager", "user"]), async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("roster.player");

    if (!team) {
      res.render("error", { error: "No existe ese equipo en el sistema" });
    }

    const activeMembers = team.roster.filter((member) => member && member.active);

    const result = {
      _id: team._id,
      name: team.name,
      foundedAt: team.foundedAt,
      roster: activeMembers,
    };

    res.render("team_detail", { result: result });
  } catch (error) {
    res.render("error", { error: "Error interno del servidor" });
  }
});

router.delete("/:id", protegerRuta(["admin"]), async (req, res) => {
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

router.post("/:id/roster", protegerRuta(["admin", "manager"]), async (req, res) => {
  try {
    let errors = {};
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.render("error", { error: "Equipo no encontrado" });
    }

    const playerToAdd = await Player.findById(req.body.player);
    if (!playerToAdd) {
      errors.player = "Jugador no encontrado";
    }

    for (const member of team.roster) {
      if (member.player.toString() === req.body.player && member.active) {
        errors.player = "El jugador ya está activo en el roster de este equipo";
      }
    }

    const otherTeam = await Team.findOne({
      _id: { $ne: team._id },
      roster: { $elemMatch: { player: req.body.player, active: true } },
    });

    if (otherTeam) {
      errors.player = "El jugador está activo en otro equipo (" + otherTeam.name + ")";
    }

    if (Object.keys(errors).length > 0) {
        const players = await Player.find();
        return res.render("team_add_player", {
            errors: errors,
            team: team,
            players: players,
            data: req.body
        });
    }

    const newRosterPlayer = {
      player: req.body.player,
      joinDate: req.body.joinDate || new Date(),
      active: req.body.active === 'on' || req.body.active === true,
    };

    team.roster.push(newRosterPlayer);

    await team.save();

    res.redirect("/teams/" + req.params.id);
  } catch (error) {
    res.render('error', {error: 'Error interno del servidor: ' + error.message})
  }
});

router.get('/:id/roster/new', protegerRuta(["admin"]), async (req,res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
        return res.render("error", { error: "Equipo no encontrado" });
    }
    const players = await Player.find();

    res.render("team_add_player", { team: team, players: players });
  } catch (error) {
     res.render("error", { error: "Error interno del servidor" });
  }
})

router.delete("/:id/roster/:playerId", protegerRuta(["admin", "manager"]), async (req, res) => {
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
