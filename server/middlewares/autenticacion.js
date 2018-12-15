// ====================
// Verificar Token
// ====================

const jwt = require("jsonwebtoken");

let verificaToken = (req, res, next) => {
  let token = req.get("token");
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err
      });
    }

    req.usuario = decoded.usuario;
    next();
    // res.json({
    //   token
    // });
  });
};

// ====================
// Verificar si usuario tien rol de administrador
// ====================
let verificaAdminRole = (req, res, next) => {
  let role = req.usuario.role;

  switch (role) {
    case "ADMIN_ROLE":
      next();
      break;
    case "USER_ROLE":
      return res.json({
        ok: false,
        err: { message: "Usuario no autorizado" }
      });
    default:
      return res.json({
        ok: false,
        err: { message: "ERROR!!" }
      });
  }
};

module.exports = { verificaToken, verificaAdminRole };
