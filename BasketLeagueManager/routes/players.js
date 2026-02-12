import express from "express";
import Player from "../models/player.js";
import Team from "../models/team.js";
import { protegerRuta } from "../auth/auth.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//hecho
router.get("/", protegerRuta(["admin", "manager", "user"]), async (req, res) => {
  try {
    const players = await Player.find();
    res.render("players_list", { players: players, user: req.user });
  } catch (error) {
    res.render("error", { error: "Error interno del servidor" });
  }
});

//hecho
router.post("/", protegerRuta(["admin"]), upload.single("image"), async (req, res) => {
  try {
    if (!req.body.nickname || !req.body.name || !req.body.country || !req.body.birthDate || !req.body.role) {
      res.render("error", {
        error: "Datos incorrectos: faltan campos obligatorios",
      });
    }

    const playerNickNameValidate = await Player.find({
      nickname: req.body.nickname,
    });

    if (playerNickNameValidate.length >= 1) {
      res.render("error", { error: "El nickname ya está registrado" });
    }

    let newPlayer = new Player({
      nickname: req.body.nickname,
      name: req.body.name,
      country: req.body.country,
      birthDate: req.body.birthDate,
      role: req.body.role,
    });
    
    if (req.file) {
      newPlayer.image = req.file.filename;
    }

    await newPlayer.save();

    res.redirect("/players");
  } catch (error) {
    res.render("error", { error: "Error interno del servidor" });
  }
});

//hecho
router.get("/find", protegerRuta(["admin", "manager", "user"]), async (req, res) => {
  try {
    if (!req.query.name) {
      res.render('error', {error: 'Falta el parámetro de búsqueda'});
    }
    const players = await Player.find({
      name: { $regex: req.query.name, $options: "i" },
    });
    if (players.length === 0) {
      return res.render("error", {
        error: "No existen jugadores con ese nombre",
      });
    }

    res.render("players_list", { players: players, user: req.user });
  } catch (error) {
    res.render("error", { error: "Error interno del servidor" });
  }
});

//hecho
router.get("/new", protegerRuta(["admin"]), (req, res) => {
  res.render("player_add");
});

//hecho
router.get("/:id", protegerRuta(["admin", "manager", "user"]), async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.render("error", { error: "No existe ese jugador" });
    }

    res.render("player_detail", { player: player });
  } catch (error) {
    res.render("error", { error: "Error interno del servidor" });
  }
});

//hecho
router.get("/:id/edit", protegerRuta(["admin"]), async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.render("error", { error: "No existe ese jugador" });
    }

    res.render("player_edit", { player: player });
  } catch (error) {
    res.render("error", { error: "Error interno del servidor" });
  }
});

//hecho
router.post("/:id", protegerRuta(["admin"]), upload.single("image"), async (req, res) => {
  try {
    const validatePlayer = await Player.findById(req.params.id);

    if (!validatePlayer) {
      res.render("error", { error: "Jugador no econtrado" });
    }

    let playerNickNameValidate = await Player.find({
      nickname: req.body.nickname,
      _id: { $ne: req.params.id },
    });

    if (playerNickNameValidate.length >= 1) {
      res.render("error", {
        error: "El nickname ya está siendo utilizado por otro jugador",
      });
    }

    const updateData = {
      nickname: req.body.nickname,
      name: req.body.name,
      country: req.body.country,
      birthDate: req.body.birthDate,
      role: req.body.role,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Player.findByIdAndUpdate(req.params.id, {
      $set: updateData,
    });

    res.redirect("/players/" + req.params.id);
    
  } catch (error) {
    res.render("error", { error: "Error interno dle servidor" });
  }
});

router.delete("/:id", protegerRuta(["admin"]), async (req, res) => {
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
        error: "No se puede eliminar el jugador porque está activo en algún equipo.",
        result: null,
      });
    }

    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      error: null,
      result: deletedPlayer,
    });
  } catch (error) {
    res.render("error", { error: "Error interno del servidor" });
  }
});

export default router;
