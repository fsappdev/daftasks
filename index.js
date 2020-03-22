const express = require("express");
const conectDB = require("./config/db");
const routeusers = require("./routes/usuarios");
const routeauth = require("./routes/auth");
const routeproyectos = require("./routes/proyectos");
const routetareas = require("./routes/tareas");
const cors = require("cors");

//creamos el server
const app = express();
//conectamos al bd con la funcion que se exporta
conectDB();

//habilitar cors
app.use(cors());

//express.json
app.use(express.json({ extended: true }));

//PUERTO DE LA APP
const port = process.env.port || 4000;
//DEF. LA PAG. PRINCIAPAL {pruebas}
/* app.get("/", (req, res) => {
  res.send("jelou word");
}); */

//importar rutas
app.use("/api/usuarios", routeusers);
app.use("/api/auth", routeauth);
app.use("/api/proyectos", routeproyectos);
app.use("/api/tareas", routetareas);

//ARRANCAR EL SERV.
app.listen(port, "0.0.0.0", () => {
  console.log(`serv. corriendo en el puerto ${PORT} `);
});
//
