import { enregistrerInfosJoueur } from './main.js';


document.getElementById("formulaire").addEventListener("submit", function(evenement) {
    evenement.preventDefault();

    const formulaire = document.forms["formulaire"];

    const nomJoueur = formulaire["username"].value.trim() || "Mathurin";
    const nomIA = formulaire["usernameIA"].value.trim() || "BOBER";
    const urlIA = formulaire["URL"].value.trim() || "http://localhost:8080/api";
    const jetonIA = formulaire["jeton"].value.trim() || "abc123";

    const infos = {
        nomJoueur,
        nomIA,
        urlIA,
        jetonIA
    };


    enregistrerInfosJoueur(infos);
    window.location.href = "jeu/jeu.html";
});
