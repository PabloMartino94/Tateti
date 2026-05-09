const botones = document.querySelectorAll("button");

let turno = "X";

botones.forEach(boton => {
  boton.addEventListener("click", () => {

    if (boton.textContent === "") {
      boton.textContent = turno;

      if (turno === "X") {
        turno = "O";
      } else {
        turno = "X";
      }
    }

  });
});