import { postBateaux } from '../main';
import {handleMouseClick, handleMouseLeave, handleMouseOver, placerBateaux} from "./placerBateaux";
import {handleEnnemiMouseLeave, handleEnnemiMouseOver} from "./ennemi";


postBateaux();
function creerPlateau(id, estEnnemi = false) {
  const lettres = "ABCDEFGHIJ".split("");
  const board = document.getElementById(id);
  board.innerHTML = "";
  let cellId = 0;
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
      } else if (!estEnnemi) {
        cell.id = "cell" + cellId;
        cell.addEventListener("mouseover", handleMouseOver);
        cell.addEventListener("mouseleave", handleMouseLeave);
        cell.addEventListener("click", handleMouseClick);

        cellId++;
      } else if (estEnnemi) {
        cell.id = "ennemi" + cellId;
        cell.classList.add("ennemiCell");

        cellId++;
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
placerBateaux();
afficherNomsDepuisSession();
