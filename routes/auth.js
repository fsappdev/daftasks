//rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");

//crear un user
// /api/auth
router.post(
  "/",
  /* [ //ya esta en react
    check("email", "Agrega un email válido").isEmail(),
    check(
      "password",
      "La contraseña debe tener como minimo 6 caracteres"
    ).isLength({ min: 6 })
  ], */
  authController.autenticarUsuario
);

//obtiene el user autenticado
router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
