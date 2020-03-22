const Usuario = require("../Models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  //revisamos si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer email y password
  const { email, password } = req.body;

  try {
    //revisar que el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }
    //crea el nuevo user
    usuario = new Usuario(req.body);

    //hashear el pass
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //save user
    await usuario.save();

    //crear y firmar el jwt
    const payload = {
      usuario: {
        id: usuario.id
      }
    };

    //firmar el jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 10800
      },
      (error, token) => {
        if (error) throw error;
        //mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("algo salió mal");
  }
};
