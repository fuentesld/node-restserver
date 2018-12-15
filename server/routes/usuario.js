const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const Usuario = require("../models/usuario");
const {
  verificaToken,
  verificaAdminRole
} = require("../middlewares/autenticacion");
const app = express();

app.get("/usuario", verificaToken, (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  let next = req.query.next || 5;
  next = Number(next);

  Usuario.find({ estado: true }, "nombre email role estado google img")
    .skip(desde)
    .limit(next)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      Usuario.countDocuments({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          cuantos: conteo
        });
      });
    });
});

app.post("/usuario", [verificaToken, verificaAdminRole], (req, res) => {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    } else {
      // usuarioDB.password = null;
      res.json({
        ok: true,
        usuario: usuarioDB
      });
    }
  });

  // if (body.nombre === undefined) {
  //   res.status(400).json({
  //     ok: false,
  //     mensaje: "nombre requerido"
  //   });
  // } else {
  //   res.json({ persona: body });
  // }
});

app.put("/usuario/:id", [verificaToken, verificaAdminRole], (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioBD) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      } else {
        res.json({
          ok: true,
          usuario: usuarioBD
        });
      }
    }
  );
});

app.delete("/usuario/:id", [verificaToken, verificaAdminRole], (req, res) => {
  let id = req.params.id;
  let statusBorrado = { estado: false };

  Usuario.findByIdAndUpdate(
    id,
    statusBorrado,
    { new: true },
    (err, usuarioBorrado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      if (!usuarioBorrado) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "usuario no encontrado"
          }
        });
      }
      res.json({
        ok: true,
        usuario: usuarioBorrado
      });
    }
  );
});

// **** Borrado físico en BD ****

// app.delete("/usuario/:id", function(req, res) {
//   let id = req.params.id;
//   Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
//     if (err) {
//       return res.status(400).json({
//         ok: false,
//         err
//       });
//     }

//     if (!usuarioBorrado) {
//       return res.status(400).json({
//         ok: false,
//         err: {
//           message: "Usuario no encontrado"
//         }
//       });
//     }

//     res.json({
//       ok: true,
//       usuario: usuarioBorrado
//     });
//   });
// });

module.exports = app;
