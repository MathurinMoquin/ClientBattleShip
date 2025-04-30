import { postBateaux } from '../main';


postBateaux();
function creerPlateau(id, estEnnemi = false) {
  const lettres = "ABCDEFGHIJ".split("");
  const board = document.getElementById(id);
  board.innerHTML = "";
  for (let row = 0; row <= 10; row++) {
    for (let col = 0; col <= 10; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (row === 0 && col === 0) {
        cell.textContent = "";
      } else if (col === 0) {
        cell.textContent = lettres[row - 1];
      } else if (row === 0) {
        cell.textContent = col;
      } else if (!estEnnemi && Math.random() < 0.2) {
        cell.classList.add("ship");
      } else if (estEnnemi && Math.random() < 0.1) {
        cell.classList.add("hit");
      } else if (estEnnemi && Math.random() < 0.2) {
        cell.classList.add("miss");
      }
      board.appendChild(cell);
    }
  }
}

function afficherNomsDepuisSession() {
  const data = JSON.parse(sessionStorage.getItem("infos"));
  const joueur = "👤 " + data?.nomJoueur || "👤 Joueur";
  const ia =   data?.nomIA + " 🤖" || "IA 🤖";
  document.getElementById("info-bar-content").innerHTML = `<span>${joueur}</span><span>VS</span><span>${ia}</span>`;
}

creerPlateau("board-player", false);
creerPlateau("board-enemy", true);
afficherNomsDepuisSession();
