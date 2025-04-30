import {startGame} from "./ennemi";

let bateauSelectionne = null;
const addX = 1;
const addY = 10;
let add = addX;
let bateauxPlace = 0;

export function placerBateaux() {
    const bateaux = document.getElementsByClassName('bateau');

    document.addEventListener('keypress', (e) => {
        if (e.key === 'r') {
            add = add === addX ? addY : addX;
        }
    });

    for (let bateau of bateaux) {
        bateau.addEventListener('click', (e) => {
            if (bateauSelectionne === null || bateauSelectionne !== bateau) {
                bateauSelectionne = bateau;
            } else {
                bateauSelectionne = null;
            }
        });
    }
}

export function handleMouseOver(e) {
    e.preventDefault();
    if (bateauSelectionne === null) return;
    const couleurBateaux = getCouleurBateaux() + "80";
    drawBoat(e, couleurBateaux);
}

export function handleMouseLeave(e) {
    e.preventDefault();
    if (bateauSelectionne === null) return;
    const couleurBateaux = "#202020";
    drawBoat(e, couleurBateaux);
}

export function handleMouseClick(e) {
    e.preventDefault();
    if (bateauSelectionne === null) return;
    const couleurBateaux = getCouleurBateaux();
    drawBoat(e, couleurBateaux, true);

    if (bateauxPlace === 5) {
        startGame();
    }
}

function drawBoat(e, couleur, click = false) {
    const target = e.target;
    const targetId = parseInt(target.id.slice(4));
    for (let i = 0; i < getSizeByBoatName(bateauSelectionne); i++) {
        if (insideBoat((targetId + i * add))) return;
        const newTarget = document.getElementById("cell" + (targetId + i * add));
        newTarget.style.backgroundColor = couleur;
        if (click) {
            newTarget.classList.add('place');
        }
    }
    if (click) {
        bateauSelectionne.remove();
        bateauSelectionne = null;
        bateauxPlace++;
    }
}

function getSizeByBoatName(bateau) {
    switch (bateau.id) {
        case 'porte-avions':
            return 5;
        case 'cuirasse':
            return 4;
        case 'destroyer':
            return 3;
        case 'sous-marin':
            return 3;
        case 'patrouilleur':
            return 2;
    }
}

function insideBoat(targetId) {
    if (targetId > 99 || targetId < 0) {
        return true;
    }
    const cell = document.getElementById("cell" + targetId);
    if (cell.classList.contains('place')) {
        return true;
    }
    return false;
}

function getCouleurBateaux() {
    switch (bateauSelectionne.id) {
        case "porte-avions":
            return "#8b008b"; // purple
        case "cuirasse":
            return "#00ffff"; // cyan
        case "destroyer":
            return "#ffa500"; // orange
        case "sous-marin":
            return "#0000ff"; // blue
        case "patrouilleur":
            return "#228b22"; // green
    }
}