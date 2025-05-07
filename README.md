**Il faut démarrer l'API avant le client**
----
**Démarrer l'API**
----
* **Ajouter le dossier vendor**

  `docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php84-composer:latest \
    composer install --ignore-platform-reqs`
  
  `composer install`

* **Démarrer l'API**
  `./vendor/bin/sail up -d`

* **Avoir un token**
* `./vendor/bin/sail artisan migrate`
* `./vendor/bin/sail artisan migrate --seed`
* `./vendor/bin/sail artisan tinker`
* `\App\Models\User::find(1)->createToken('nom-du-token')->plainTextToken`

**Démarrer le client**
----
* **Installer les nodes_modules**

  `npm install`
  
* **Démarrer le client sur le port 5174**

  `npm run dev`
