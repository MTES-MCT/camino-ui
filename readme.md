# Camino UI

[![Tests status][ci-img]][ci] [![codecov][codecov-img]][codecov] [![Dependency Status][dep-img]][dep]

[ci-img]: https://github.com/MTES-MCT/camino-ui/workflows/Tests/badge.svg
[ci]: https://github.com/MTES-MCT/camino-ui/actions
[codecov-img]: https://codecov.io/gh/MTES-MCT/camino-ui/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/MTES-MCT/camino-ui
[dep-img]: https://david-dm.org/MTES-MCT/camino-ui.svg
[dep]: https://david-dm.org/MTES-MCT/camino-ui

> Interface web de [Camino](https://camino.beta.gouv.fr), le cadastre minier numérique.

![camino screenshot](camino-screenshot.png)

---

## Technologies

- [Vue.js](https://v3.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Leaflet.js](https://leafletjs.com/)
- [graphql-react](https://github.com/jaydenseric/graphql-react)
- [vite](https://vitejs.dev/)
- [Babel](https://babeljs.io/)
- [Postcss](https://postcss.org/)
- [Postcss-preset-env](https://preset-env.cssdb.org/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Standardjs](https://standardjs.com/)
- [Stylelint](https://stylelint.io/)
- [Docker](https://www.docker.com/products/docker-engine)
- [Standard version](https://github.com/conventional-changelog/standard-version)
- [Commitizen](http://commitizen.github.io/cz-cli/)

---

## Configuration

- Cloner ce repo : `git clone https://github.com/MTES-MCT/camino-ui.git`.
- Renommer le fichier `.env-example` en `.env` et le compléter.

### Installation

```bash
# installe les dépendances
npm install
```

### Développement

```bash
# lance un serveur de développement avec webpack-dev-server
# accessible à localhost:8080
npm run dev
```

### Production

```bash
# crée les fichiers de production dans le répertoire dist
npm run build

# lance le serveur de production
npm run start
```

### Tests unitaires

```bash
# lance les tests unitaires en local
npm run test:jest
```

---

## Contribution

Voir `contributing.md` (en anglais) pour plus d'infos.

---

## Credits

### Production

- [La Fabrique Numérique, Ministère de la transition écologique](https://www.ecologique.gouv.fr/inauguration-fabrique-numerique-lincubateur-des-ministeres-charges-lecologie-et-des-territoires)

---

## Licence

Camino API, le cadastre minier numérique ouvert

[AGPL 3 ou plus récent](https://spdx.org/licenses/AGPL-3.0-or-later.html)
