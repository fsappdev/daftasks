const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");

//crea proyectos
//api/proyectos
router.post(
  "/",
  auth,
  [
    check("nombre", "el nombre del proyecto es obligatorio")
      .not()
      .isEmpty()
  ],
  proyectoController.crearProyecto
);

//obtener todos los proyectos
router.get("/", auth, proyectoController.obtenerProyectos);

//actualizar proyecto via id
router.put(
  "/:id",
  auth,
  [check("nombre", "EL nombre del proyecto es obligatorio")],
  proyectoController.actualizarProyecto
);
//actualizar proyecto via id
router.delete("/:id", auth, proyectoController.eliminarProyecto);

module.exports = router;
