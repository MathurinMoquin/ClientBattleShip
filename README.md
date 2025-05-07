**Démarrer le client**
----
* **Il faut démarrer l'API avant le client**
* **Installer les nodes_modules**

  `npm install`
  
* **Démarrer le client sur le port 5174**

  `npm run dev`

* **Ajouter le dossier vendor**

  `docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php84-composer:latest \
    composer install --ignore-platform-reqs`
  
  `composer install`
