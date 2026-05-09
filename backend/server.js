const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const archivo = "./partidas.json";

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.get("/partidas", (req, res) => {

  const datos =
    fs.readFileSync(archivo);

  const partidas =
    JSON.parse(datos);

  res.json(partidas);
});

app.post("/partidas", (req, res) => {

  const datos =
    fs.readFileSync(archivo);

  const partidas =
    JSON.parse(datos);

  const nuevaPartida = {
    id: partidas.length + 1,
    ganador: req.body.ganador
  };

  partidas.push(nuevaPartida);

  fs.writeFileSync(
    archivo,
    JSON.stringify(partidas, null, 2)
  );

  res.json(nuevaPartida);
});

app.listen(3000, () => {

  console.log(
    "Servidor corriendo en puerto 3000"
  );

});