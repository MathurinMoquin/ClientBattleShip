import "./styles.css";
import axios from "axios";

const infos = JSON.parse(sessionStorage.getItem("infos")) || {};
const token = infos.jetonIA || "";

const url = infos.URL || "";

export const instanceAxios = axios.create({
    baseURL: "http://localhost:80",
    params: { adversaire: "NOM" },
    headers: {
        'Content-Type': 'application/json'
    }
});

export function enregistrerInfosJoueur(infos) {
    sessionStorage.setItem("infos", JSON.stringify(infos));
}

export function obtenirInfosJoueur() {
    return JSON.parse(sessionStorage.getItem("infos"));
}

export async function postBateaux() {
    instanceAxios.post(
        '/battleship-ia/parties',
        { adversaire:"BOBER" },
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }

    ).then((response) => sessionStorage.setItem("battleship", btoa(JSON.stringify(response.data))))
    .catch((error) => console.error(error));
}
