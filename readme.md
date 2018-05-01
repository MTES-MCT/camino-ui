# Camino front

Application en cours de développement, provisoirement accessible [ici](https://camino.site).

Plus d'infos sur le projet [ici](http://camino.beta.gouv.fr/).

---

## Npm scripts

```bash
# Install dependencies.
npm install

# Serve with hot reload at localhost:8080
npm run serve

# Build for production
npm run dist

# Run lint
npm run lint
```

---

## Dev local avec docker-compose

Un environement de dévelopement doit être configuré comme indiqué ici: [Set a local web development environment with custom Urls and HTTPS](https://medium.com/@francoisromain/set-a-local-web-development-environment-with-custom-urls-and-https-3fbe91d2eaf0)

L'url de dévelopement est `camino.local`.

Pour lancer l'application dans un container:

```bash
docker-compose -f ./docker-compose.local.yml up --build
```

---

## Contribution

Voir `contributing.md` (en anglais) pour plus d'infos.

---

## Credits

#### Production

* [La Fabrique Numérique, Ministère de la transition écologique et solidaire](https://www.ecologique-solidaire.gouv.fr/inauguration-fabrique-numerique-lincubateur-des-ministeres-charges-lecologie-et-des-territoires)

#### Équipe

* Guillaume Levieux, intrapreneur
* Joeffrey Arruyer, coach
* [François Romain](http://francoisromain.com), dévelopeur
