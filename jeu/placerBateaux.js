import {convertIdToPosition, startGame} from "./ennemi";

let bateauSelectionne = null;
const addX = 1;
const addY = 10;
let add = addX;
let bateauxPlace = 0;
let mouseEvent;

let posBateaux = {
    'porte-avions': [],
    'cuirasse': [],
    'destroyer': [],
    'sous-marin': [],
    'patrouilleur': []
}

export function placerBateaux() {
    const bateaux = document.getElementsByClassName('bateau');

    document.addEventListener('keypress', (e) => {
        if (e.key === 'r') {
            if (mouseEvent !== undefined) {
                add = add === addX ? addY : addX;
                clearBoard();
                handleMouseOver(mouseEvent);
            }
        }

        if (e.key === '1') {
            bateauSelectionne = document.getElementById('porte-avions');
            if (bateauSelectionne === null) return;
            clearBoard();
        }
        if (e.key === '2') {
            bateauSelectionne = document.getElementById('cuirasse');
            if (bateauSelectionne === null) return;
            clearBoard();
        }
        if (e.key === '3') {
            bateauSelectionne = document.getElementById('destroyer')
            if (bateauSelectionne === null) return;
            clearBoard();
        }
        if (e.key === '4') {
            bateauSelectionne = document.getElementById('sous-marin');
            if (bateauSelectionne === null) return;
            clearBoard();
        }
        if (e.key === '5') {
            bateauSelectionne = document.getElementById('patrouilleur');
            if (bateauSelectionne === null) return;
            clearBoard();
        }

        if (bateauSelectionne !== null) {
            setCouleurBateauZoneDeploiement();
            handleMouseOver(mouseEvent);
        }
    });

    for (let bateau of bateaux) {
        bateau.addEventListener('click', (e) => {
            if (bateauSelectionne === null || bateauSelectionne !== bateau) {
                bateauSelectionne = bateau;
            } else {
                bateauSelectionne = null;
            }

            setCouleurBateauZoneDeploiement();
        });
    }
}

function setCouleurBateauZoneDeploiement() {
    const bateaux = document.getElementsByClassName('bateau');
    if (bateauSelectionne.style.backgroundColor === "gray") {
        bateauSelectionne.style.backgroundColor = "orange";
    } else {
        for (let b of bateaux) {
            b.style.backgroundColor = "orange";
        }
        bateauSelectionne.style.backgroundColor = "gray";
    }
}

export function handleMouseOver(e) {
    e.preventDefault();
    mouseEvent = e;
    if (bateauSelectionne === null) return;
    const couleurBateaux = getCouleurBateaux() + "87"; // Change l'opacité pour 0.5
    drawBoat(e, couleurBateaux);
}

export function handleMouseLeave(e) {
    e.preventDefault();
    if (bateauSelectionne === null) return;
    clearBoard();
}

export function handleMouseClick(e) {
    e.preventDefault();
    if (bateauSelectionne === null) return;
    const couleurBateaux = getCouleurBateaux();
    drawBoat(e, couleurBateaux, true);

    if (bateauxPlace === 5) {
        sessionStorage.setItem("bateaux", JSON.stringify(posBateaux));
        startGame();
    }
}

function drawBoat(e, couleur, click = false) {
    let idListToShow = [];
    const target = e.target;
    const targetId = parseInt(target.id.slice(4));
    for (let i = 0; i < getSizeByBoatName(bateauSelectionne); i++) {
        if (insideBoat((targetId + i * add), targetId)) return;
        idListToShow.push((targetId + i * add));
    }
    for (let id of idListToShow) {
        const newTarget = document.getElementById("cell" + id);
        newTarget.style.backgroundColor = couleur;
        if (click) {
            newTarget.classList.add('place');
            newTarget.classList.add(bateauSelectionne.id)
            posBateaux[bateauSelectionne.id].push(id);
        }
    }
    if (click) {
        bateauSelectionne.remove();
        bateauSelectionne = null;
        bateauxPlace++;
    }
}

function clearBoard() {
    const couleurBateaux = "#202020";
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        if (!cell.classList.contains('place')) {
            cell.style.backgroundColor = couleurBateaux;
        }
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

function insideBoat(targetId, firstTarget) {
    if (targetId > 99 || targetId < 0) {
        return true;
    }
    if (targetId % 10 === 0 && firstTarget % 10 !== 0) {
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