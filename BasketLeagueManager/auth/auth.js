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

const protegerRuta = (rolesPermitidos) => {
  return (req, res, next) => {
    let token = req.cookies.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    
    if (token) {
      let usuario = validarToken(token);

      if (usuario) {
        if (!rolesPermitidos || rolesPermitidos.includes(usuario.rol)) {
          req.user = usuario;
          next();
        } else {
          res.redirect("/auth/login");
        }
      } else {
        res.redirect("/auth/login");
      }
    } else {
      res.redirect("/auth/login");
    }
  };
};

export { generarToken, validarToken, protegerRuta };
