import {instanceAxios, postBateaux} from "../main";

let positionBateaux;
let tourIA = false;
const posBateaux = {
    'porte-avions': false,
    'cuirasse': false,
    'destroyer': false,
    'sous-marin': false,
    'patrouilleur': false,
}
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
    if (target.classList.contains("hit")) return;
    tourIA = true;
    const couleur = detectHit(parseInt(target.id.slice(6)));
    target.style.backgroundColor = couleur;

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
    let isHit = false;

    const cell = document.getElementById("cell" + convertPositionToId(coords));
    if (cell === null) {
        console.log(coords);
        console.log(convertPositionToId(coords));
        return;
    }
    if (cell.classList.contains("hit")) {
        postApiMissile();
        return;
    }
    if (cell.classList.contains("place")) {
        cell.style.backgroundColor = "red";
        regarderToutBateau();
        isHit = true;
    } else {
        cell.style.backgroundColor = "white";
        isHit = false;
    }
    cell.classList.add("hit");

    const token = JSON.parse(sessionStorage.getItem("infos")).jetonIA;
    let result = isHit ? getResultat() : 0;
    instanceAxios.put(
        "/battleship-ia/parties/1/missiles/" + coords,
        { resultat: result },
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
    ).then((response) => console.log("Resultat: " + result))
        .catch((error) => console.error(error));

    tourIA = false;
}

function getResultat() {
    // let id = 2;
    // for (let [type, result] of Object.entries(posBateaux)) {
    //     if (result) {
    //         return id;
    //     }
    //     id++;
    // }
    return 1;
}

function regarderToutBateau() {
    const pos = JSON.parse(sessionStorage.getItem("bateaux"));
    for (let [type, listePos] of Object.entries(pos)) {
        let cont = false;
        for (const p of listePos) {
            if (document.getElementById("cell" + p).classList.contains('hit')) {
                document.getElementById("cell" + p).classList.remove(type);
            }
        }
        posBateaux[type] = document.getElementsByClassName(type).length === 0;
    }
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


export function convertIdToPosition(id) {
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
        default:
            letter = '';
            break;
    }
    return letter + "-" + (number + 1);
}

export function convertPositionToId(pos) {
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
        default:
            letter = '';
            break;
    }
    return letter * 10 + number - 1;
}
