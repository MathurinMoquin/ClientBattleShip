**Création d'une partie**
----
  Ressource qui permet à l'IA de débuter une nouvelle partie.
  
* **URL**

  /battleship-ia/parties

  exemple : http://localhost/battleship-ia/parties

* **Méthode:**
  
  `POST` : Pour la création d'une partie. Les bateaux sont générés automatiquement.
  
* **Paramètres:**

   **Requis:**

   Content-Type: application/x-www-form-urlencoded
 
   `adversaire=[string]` : Le nom de l'adversaire pour cette partie.

* **Réponse de succès:**
  

  * **Code:** 201 <br />
    **Contenu:** `{
    "data": {
        "id": 1,
        "adversaire": "XXXXXXXXX",
        "bateaux": {
            "porte-avions": [
                "A-1",
                "A-2",
                "A-3",
                "A-4",
                "A-5"
            ],
            "cuirasse": [
                "B-1",
                "B-2",
                "B-3",
                "B-4"
            ],
            "destroyer": [
                "C-1",
                "C-2",
                "C-3"
            ],
            "sous-marin": [
                "D-1",
                "D-2",
                "D-3"
            ],
            "patrouilleur": [
                "E-1",
                "E-2"
            ]
        },
        "created_at": "2025-03-30T20:53:05.000000Z"
    }
}`
 
* **Réponse d'erreur:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Contenu:** `{ "message": "Non authentifié." }`

    OU

  * **Code:** 422 UNPROCESSABLE CONTENT <br />
    **Contenu:** `{
    "message": "Le champ adversaire est obligatoire.",
    "errors": {
        "adversaire": [
            "Le champ adversaire est obligatoire."
        ]
    }
}`
