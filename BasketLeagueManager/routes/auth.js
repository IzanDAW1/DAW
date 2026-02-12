import express from "express";
import { generarToken } from "../auth/auth.js";
import User from "../models/users.js";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      login: req.body.login,
      password: req.body.password,
    });

    if (user) {
      const token = generarToken(user.login, user.rol);
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
      });
      res.redirect("/");
    } else {
      res.render('error', { error: "Login incorrecto" });
    }
  } catch (error) {
    console.error("Error en login:", error);
    res.render('error', { error: "Error interno del servidor" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
});

export default router;
