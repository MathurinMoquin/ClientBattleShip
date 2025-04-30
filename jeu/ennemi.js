
let positionBateaux;
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
    const couleur = "rgba(255, 255, 255, 0.5)";
    target.style.backgroundColor = couleur;
}

export function handleEnnemiMouseLeave(e) {
    const target = e.target;
    const couleur = "#202020";
    target.style.backgroundColor = couleur;
}

export function handleEnnemiMouseClick(e) {
    const target = e.target;
    const couleur = detectHit(parseInt(target.id.slice(6)));
    target.style.backgroundColor = couleur;
}

function detectHit(id) {
    const hitId = convertIdToPosition(id);
    for (const pos of positionBateaux.bateaux) {
        if (hitId === pos) {
            console.log("hit " + hitId);
            return "red";
        }
    }
    console.log("hit " + hitId);
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