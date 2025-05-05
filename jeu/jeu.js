import {instanceAxios, postBateaux} from '../main';
import {handleMouseClick, handleMouseLeave, handleMouseOver, placerBateaux} from "./placerBateaux";


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
        cell.classList.add("cell");

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
  document.getElementById("nom-joueur").textContent = joueur;
  document.getElementById("nom-ia").textContent = ia;
}

const partieId = JSON.parse(btoa(sessionStorage.getItem("battleship"))).data.id;
document.getElementById("retour").addEventListener("click", function () {
  const token = JSON.parse(sessionStorage.getItem("infos")).jetonIA;
  instanceAxios.delete(
      `/battleship-ia/parties/${partieId}/`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }

  ).then((response) => console.log(response))
      .catch((error) => console.error(error));
});
creerPlateau("plateau-joueur", false);
creerPlateau("plateau-ennemi", true);
placerBateaux();
afficherNomsDepuisSession();
