const Usuario = require("../Models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  //revisamos si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer el email y password {}
  const { email, password } = req.body;

  try {
    //rev. que se haya registrado
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "Ese usuario no ha sido creado" });
    }

    //revisar el password
    const passcorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passcorrecto) {
      return res.status(400).json({ msg: "Password Incorrecto" });
    }

    //
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

    //
  } catch (error) {
    console.log(error);
  }
};

//obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
