import {instanceAxios, postBateaux} from "../main";

let positionBateaux;
let tourIA = false;
export function startGame() {
    positionBateaux = JSON.parse(atob(sessionStorage.getItem("battleship"))).data;

    const cells = document.getElementsByClassName("ennemiCell");

    for (const cell of cells) {
        cell.addEventListener("mouseover", handleEnnemiMouseOver);
        cell.addEventListener("mouseleave", handleEnnemiMouseLeave);
        cell.addEventListener("click", handleEnnemiMouseClick)
    }
}

export function handleEnnemiMouseOver(e) {
    const target = e.target;
    if (target.classList.contains("hit")) return;
    const couleur = "rgba(255, 255, 255, 0.5)";
    target.style.backgroundColor = couleur;
}

export function handleEnnemiMouseLeave(e) {
    const target = e.target;
    if (target.classList.contains("hit")) return;
    const couleur = "#202020";
    target.style.backgroundColor = couleur;
}

export function handleEnnemiMouseClick(e) {
    const target = e.target;
    if (tourIA) return;
    console.log(target);
    if (target.classList.contains("hit")) return;
    const couleur = detectHit(parseInt(target.id.slice(6)));
    target.style.backgroundColor = couleur;

    tourIA = true;
    postApiMissile();
}

function postApiMissile() {
    const token = JSON.parse(sessionStorage.getItem("infos")).jetonIA;
    instanceAxios.post(
        '/battleship-ia/parties/1/missiles',
        { adversaire:"BOBER" },
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }

    ).then((response) => missileTourIa(response.data))
        .catch((error) => console.error(error));
}

function missileTourIa(response) {
    const coords = response.data.coordonnee;

    const cell = document.getElementById("cell" + convertPositionToId(coords));
    if (cell.classList.contains("hit")) {
        postApiMissile();
    }
    if (cell.classList.contains("place")) {
        cell.style.backgroundColor = "red";
    } else {
        cell.style.backgroundColor = "white";
    }
    cell.classList.add("hit");

    tourIA = false;
}

function detectHit(id) {
    const hitId = convertIdToPosition(id);
    for (let [type, listePos] of Object.entries(positionBateaux.bateaux)) {
        for (const pos of listePos) {
            if (hitId === pos) {
                document.getElementById("ennemi" + id).classList.add("hit");
                return "red";
            }
        }
    }
    document.getElementById("ennemi" + id).classList.add("hit");
    return "white";
}


function convertIdToPosition(id) {
    let number = id % 10;
    let letterInNumber = Math.floor(id / 10);
    let letter;
    switch (letterInNumber) {
        case 0:
            letter = 'A';
            break;
        case 1:
            letter = 'B';
            break;
        case 2:
            letter = 'C';
            break;
        case 3:
            letter = 'D';
            break;
        case 4:
            letter = 'E';
            break;
        case 5:
            letter = 'F';
            break;
        case 6:
            letter = 'G';
            break;
        case 7:
            letter = 'H';
            break;
        case 8:
            letter = 'I';
            break;
        case 9:
            letter = 'J';
            break;
    }
    return letter + "-" + (number + 1);
}

function convertPositionToId(pos) {
    const number = parseInt(pos.slice(2));
    const letterInNumber = pos.slice(0, 1);
    let letter;
    switch (letterInNumber) {
        case 'A':
            letter = 0;
            break;
        case 'B':
            letter = 1;
            break;
        case 'C':
            letter = 2;
            break;
        case 'D':
            letter = 3;
            break;
        case 'E':
            letter = 4;
            break;
        case 'F':
            letter = 5;
            break;
        case 'G':
            letter = 6;
            break;
        case 'H':
            letter = 7;
            break;
        case 'I':
            letter = 8;
            break;
        case 'J':
            letter = 9;
            break;
    }
    return letter * 10 + number;
}