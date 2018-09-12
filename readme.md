# Camino UI

> Interface web de [Camino](https://camino.beta.gouv.fr).

Application en cours de développement, provisoirement accessible [ici](https://camino.beta.gouv.fr).

---

## Technologies

- Vue.js
- Vuex
- Leaflet.js
- Apollo GraphQl client
- Postcss
- Docker
- Vue-cli / webpack
- Babel
- Postcss-preset-env
- Eslint
- Prettier
- Standardjs
- Stylelint

---

## Configuration

- Renommer les fichier `.env.example` en `.env` et le compléter.
- Pour la version de développement, renommer le fichier et `.env.development-example` en `.env.development` et compléter.
- Pour la version de production, renommer le fichier et `.env.production-example` en `.env.production` et compléter.

Pour plus d'informations sur les variables d'environnement, voir la doc de [vue-cli](https://cli.vuejs.org/guide/mode-and-env.html#modes).

---

## Npm scripts

```bash
# installe les dépendances
npm install

# lance un serveur de développement avec webpack-dev-server
# accessible à localhost:8080
npm run dev

# crée les fichiers de production dans le répertoire dist
npm run build

# lance le serveur de production
npm run start
```

---

## Docker

### Serveur local dans un container docker

```bash
# démarre l'application dans un conteneur Docker
# avec webpack-dev-server en mode `development`
# accessible à http://localhost:NODE_PORT
docker-compose -f ./docker-compose.localhost.yml up --build
```

### Tester l'application en local dans un environement de production

Pré-requis:

- une installation locale active de https://github.com/jwilder/nginx-proxy
- un certificat ssl auto-signé
- [instructions](https://medium.com/@francoisromain/set-a-local-web-development-environment-with-custom-urls-and-https-3fbe91d2eaf0)

```bash
# Démarre l'application dans un container Docker
# avec un serveur express.js en mode `production`
# accessible à https://camino.local
docker-compose -f ./docker-compose.local.yml up --build
```

### Serveur de production

Pré-requis:

- une installation active de https://github.com/jwilder/nginx-proxy
- [instructions](https://medium.com/@francoisromain/host-multiple-websites-with-https-inside-docker-containers-on-a-single-server-18467484ab95)

```bash
# démarre l'application dans un container Docker
# en mode `production`
# accessible à http://flux.camino.pw
docker-compose -f ./docker-compose.prod.yml up --build
```

---

## Contribution

Voir `contributing.md` (en anglais) pour plus d'infos.

---

## Credits

### Production

- [La Fabrique Numérique, Ministère de la transition écologique et solidaire](https://www.ecologique-solidaire.gouv.fr/inauguration-fabrique-numerique-lincubateur-des-ministeres-charges-lecologie-et-des-territoires)

### Équipe

- Guillaume Levieux, intrapreneur
- Joeffrey Arruyer, coach
- [François Romain](http://francoisromain.com), développeur

---

## Licence

Camino API, le cadastre minier numérique ouvert

[AGPL 3 ou plus récent](https://spdx.org/licenses/AGPL-3.0-or-later.html)
