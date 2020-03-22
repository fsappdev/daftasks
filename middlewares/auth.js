const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  //leer el token
  const token = req.header("x-auth-token");
  //console.log(token);
  //chek si hay token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "no hay token de autenticacion... permiso denegado" });
  }
  //validar el token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token no valido" });
  }
};
