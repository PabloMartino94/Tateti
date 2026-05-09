const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./tateti.db");

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS partidas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ganador TEXT
    )
  `);

});

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.post("/partidas", (req, res) => {

  const ganador = req.body.ganador;

  db.run(
    "INSERT INTO partidas (ganador) VALUES (?)",
    [ganador],
    function(err) {

      if (err) {
        return res.status(500).send(err.message);
      }

      res.send("Partida guardada");
    }
  );

});

app.get("/partidas", (req, res) => {

  db.all(
    "SELECT * FROM partidas",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).send(err.message);
      }

      res.json(rows);
    }
  );

});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});