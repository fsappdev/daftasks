const Proyecto = require("../Models/Proyecto");
const Tarea = require("../Models/Tarea");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  //revisamos si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //crear un nuevo proyecto
    const proyecto = new Proyecto(req.body);

    //guardar el creador via jwt
    proyecto.creador = req.usuario.id;

    //guardamos el proyecto
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarProyecto = async (req, res) => {
  //revisamos si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer la info del proyecto
  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    // revizar el id
    let proyecto = await Proyecto.findById(req.params.id);

    //si existe proyecto
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //verif. el creador del proy
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //actualizar
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

//elimina un proy. x su id
exports.eliminarProyecto = async (req, res) => {
  try {
    // revizar el id
    let proyecto = await Proyecto.findById(req.params.id);

    //si existe proyecto
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //verif. el creador del proy
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //Eliminar el proyecto y todas sus tareas
    await Tarea.deleteMany({ proyecto: req.params.id });
    await Proyecto.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto removido" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

exports.obtenerProyectos = async (req, res) => {
  try {
    console.log(req.usuario);
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1
    });
    res.send({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
