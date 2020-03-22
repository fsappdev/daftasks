//rutas para crear usuarios
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { check } = require("express-validator");

//crear un user
// api/usuarios
router.post(
  "/",
  [
    check("nombre", "EL nombre es obligatorio")
      .not()
      .isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check(
      "password",
      "La contraseña debe tener como minimo 6 caracteres"
    ).isLength({ min: 6 })
  ],
  usuarioController.crearUsuario
);

module.exports = router;
