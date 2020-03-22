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
app.use(cors({ credentials: true, origin: true }));

//solucionando problema de cors
/* app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://daftasks.herokuapp.com/"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
}); */
//opcion3
/* app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  app.options("*", (req, res) => {
    // allowed XHR methods
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
}); */
//fin de opcion3

//express.json
app.use(express.json({ extended: true }));

//PUERTO DE LA APP
const port = process.env.PORT || 4000;
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
