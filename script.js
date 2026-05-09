const botones = document.querySelectorAll(".tablero button");
const mensaje = document.getElementById("mensaje");
const linea = document.getElementById("linea-ganadora");
const reiniciar = document.getElementById("reiniciar");

let turno = "X";
let juegoTerminado = false;

const combinaciones = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

botones.forEach((boton, index) => {
  boton.addEventListener("click", () => {

    if (boton.textContent === "" && !juegoTerminado) {

      boton.textContent = turno;

      verificarGanador();

      turno = turno === "X" ? "O" : "X";
    }

  });
});

function verificarGanador() {

  combinaciones.forEach(comb => {

    const [a, b, c] = comb;

    if (
      botones[a].textContent !== "" &&
      botones[a].textContent === botones[b].textContent &&
      botones[a].textContent === botones[c].textContent
    ) {

      juegoTerminado = true;

      mensaje.textContent =
        `Juego terminado - Ganó ${botones[a].textContent}`;

      dibujarLinea(comb);
    }

  });
}

function dibujarLinea(comb) {

  const posiciones = {
    "0,1,2": "translate(0px, 50px) rotate(0deg)",
    "3,4,5": "translate(0px, 155px) rotate(0deg)",
    "6,7,8": "translate(0px, 260px) rotate(0deg)",

    "0,3,6": "translate(50px, 0px) rotate(90deg)",
    "1,4,7": "translate(155px, 0px) rotate(90deg)",
    "2,5,8": "translate(260px, 0px) rotate(90deg)",

    "0,4,8": "translate(0px, 0px) rotate(45deg)",
    "2,4,6": "translate(210px, 0px) rotate(-45deg)"
  };

  linea.style.width = "300px";
  linea.style.transform = posiciones[comb.toString()];
}

reiniciar.addEventListener("click", () => {

  botones.forEach(boton => {
    boton.textContent = "";
  });

  turno = "X";
  juegoTerminado = false;

  mensaje.textContent = "";

  linea.style.width = "0";
});