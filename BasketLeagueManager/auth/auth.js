import jwt from "jsonwebtoken";

const secreto = "secretoNode";

let generarToken = (login, rol) =>
  jwt.sign({ login: login, rol: rol }, secreto, { expiresIn: "2 hours" });

let validarToken = (token) => {
  try {
    let resultado = jwt.verify(token, secreto);
    return resultado;
  } catch (e) {}
};

let protegerRuta = (rolesPermitidos) => {
  return (req, res, next) => {
    let token = req.headers["authorization"];

    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7);
      let usuario = validarToken(token);

      if (usuario) {
        if (!rolesPermitidos || rolesPermitidos.includes(usuario.rol)) {
          req.user = usuario;
          next();
        } else {
          res.status(403).send({ error: "Acceso no autorizado", result: null });
        }
      }
    }
  };
};

module.exports = {
  generarToken: generarToken,
  validarToken: validarToken,
  protegerRuta: protegerRuta,
};
