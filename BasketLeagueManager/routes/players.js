import express from "express";
import Player from "../models/player.js";
import Team from "../models/team.js";
import { protegerRuta } from "../auth/auth.js"; 

const router = express.Router();

router.get("/", protegerRuta(['admin', 'manager', 'user']), async (req, res) => {
  try {
    const players = await Player.find();
    res.render('players_list', { players: players });
  } catch (error) {
    res.render('error', { error: "Error interno del servidor" });
  }
});

router.post("/", protegerRuta(['admin']), async (req, res) => {
  try {
    if (
      !req.body.nickname ||
      !req.body.name ||
      !req.body.country ||
      !req.body.birthDate ||
      !req.body.role
    ) {
      return res.status(400).json({
        error: "Datos incorrectos: faltan campos obligatorios",
        result: null,
      });
    }

    const playerNickNameValidate = await Player.find({
      nickname: req.body.nickname,
    });

    if (playerNickNameValidate.length >= 1) {
      return res.status(400).json({
        error: "El nickname ya está registrado",
        result: null,
      });
    }

    let newPlayer = new Player({
      nickname: req.body.nickname,
      name: req.body.name,
      country: req.body.country,
      birthDate: req.body.birthDate,
      role: req.body.role,
    });

    const savedNewPlayer = await newPlayer.save();

    return res.status(201).json({
      result: savedNewPlayer,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
      result: null,
    });
  }
});

router.get("/find", protegerRuta(['admin', 'manager', 'user']), async (req, res) => {
  try {
    if (!req.query.name) {
      return res.status(400).json({
        error: "Falta el parámetro de búsqueda",
        result: null,
      });
    }
    const players = await Player.find({
      name: { $regex: req.query.name, $options: "i" },
    });
    if (players.length === 0) {
      return res.status(404).json({
        error: "No existen jugadores con ese nombre",
        result: null,
      });
    }

    return res.status(200).json({
      error: null,
      result: players,
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
    const players = await Player.findById(req.params.id);
    if (players.length === 0) {
      return res.status(404).json({
        error: "No existe ese jugador en el sistema",
        result: null,
      });
    }

    return res.status(200).json({
      error: null,
      result: players,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
      result: null,
    });
  }
});

router.put("/:id", protegerRuta(['admin']), async (req, res) => {
  try {
    const validatePlayer = await Player.findById(req.params.id);

    if (!validatePlayer) {
      return res.status(404).json({
        error: "Jugador no encontrado",
        result: null,
      });
    }

    let playerNickNameValidate = await Player.find({
      nickname: req.body.nickname,
      _id: { $ne: req.params.id },
    });

    if (playerNickNameValidate.length >= 1) {
      return res.status(400).json({
        error: "El nickname ya está siendo utilizado por otro jugador",
        result: null,
      });
    }

    await Player.findByIdAndUpdate(req.params.id, {
      $set: {
        nickname: req.body.nickname,
        name: req.body.name,
        country: req.body.country,
        birthDate: req.body.birthDate,
        role: req.body.role,
      },
    });
    return res.status(200).json({
      error: null,
      result: "Jugador actualizado correctamente",
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
    const validatePlayer = await Player.findById(req.params.id);

    if (!validatePlayer) {
      return res.status(404).json({
        error: "Jugador no encontrado",
        result: null,
      });
    }

    const isPlayerActive = await Team.find({
      roster: {
        $elemMatch: {
          player: req.params.id,
          active: true,
        },
      },
    });

    if (isPlayerActive.length >= 1) {
      return res.status(400).json({
        error:
          "No se puede eliminar el jugador porque está activo en algún equipo.",
        result: null,
      });
    }

    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      error: null,
      result: deletedPlayer,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
      result: null,
    });
  }
});

export default router;