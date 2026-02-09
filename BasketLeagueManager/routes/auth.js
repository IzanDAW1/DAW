import express from "express";
import User from "../models/users.js";
import { generarToken } from "../auth/auth.js";

const router = express.Router();

router.get("/login" , (req,res) =>{
  res.render('login');
})

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
      return res.status(200).json({
        error: null,
        result: token,
      });
    } else {
      return res.status(401).json({
        error: "Login incorrecto",
        result: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
      result: null,
    });
  }
});

export default router;
