# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [0.12.0](https://github.com/MTES-MCT/camino-ui/compare/v0.11.0...v0.12.0) (2019-02-20)


### Features

* met à jour le logo de la Fabrique Numérique ([f583de2](https://github.com/MTES-MCT/camino-ui/commit/f583de2))
* requiert la liste des systèmes géodésiques, les unités de volume et les devises ([869c21c](https://github.com/MTES-MCT/camino-ui/commit/869c21c))



<a name="0.11.0"></a>
# [0.11.0](https://github.com/MTES-MCT/camino-ui/compare/v0.10.0...v0.11.0) (2019-02-13)


### Features

* filtre la liste de titres par territoires ([c3ab3d8](https://github.com/MTES-MCT/camino-ui/commit/c3ab3d8))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/MTES-MCT/camino-ui/compare/v0.9.0...v0.10.0) (2019-02-11)


### Bug Fixes

* corrige une erreur si le titre n'a pas de communes ([ea296cd](https://github.com/MTES-MCT/camino-ui/commit/ea296cd))
* les metas ne s'ffichent pas dans les filtres ([75fc117](https://github.com/MTES-MCT/camino-ui/commit/75fc117))


### Features

* affiche les communes sur une page du titre ([6f4deaf](https://github.com/MTES-MCT/camino-ui/commit/6f4deaf))
* renomme communes en territoires ([baebcc5](https://github.com/MTES-MCT/camino-ui/commit/baebcc5))
* supprime le tri des communes par ordre alphabétique (fait par l'API) ([ad04b60](https://github.com/MTES-MCT/camino-ui/commit/ad04b60))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/MTES-MCT/camino-ui/compare/v0.8.0...v0.9.0) (2019-02-04)


### Bug Fixes

* les mots amodiataires et titulaires s'affichent même si le champs est vide ([fc665a8](https://github.com/MTES-MCT/camino-ui/commit/fc665a8))
* **rapports:** typerror sur la page titre si aucun utilisateur est connecté ([2ab9a2c](https://github.com/MTES-MCT/camino-ui/commit/2ab9a2c))
* erreur lors de la mise à jour d'un statut d'étape ([de93d8b](https://github.com/MTES-MCT/camino-ui/commit/de93d8b))
* lorsqu'un utilisateur supprime son compte, il n'est pas dé-loggué ([a9565b4](https://github.com/MTES-MCT/camino-ui/commit/a9565b4))


### Features

* **rapports:** donne la permission d'éditer un rapport à l'amodiataire si il existe ([6454837](https://github.com/MTES-MCT/camino-ui/commit/6454837))
* affiche les amodiataires dans l'entête du titre ([a8fa4b4](https://github.com/MTES-MCT/camino-ui/commit/a8fa4b4))
* mise à jour du type de l'étape ([d6057a0](https://github.com/MTES-MCT/camino-ui/commit/d6057a0))
* modifie le statut d'une étape ([56ccb6d](https://github.com/MTES-MCT/camino-ui/commit/56ccb6d))
* récupère le token lors de l'identification d'un utilisateur déjà loggué ([6a0268c](https://github.com/MTES-MCT/camino-ui/commit/6a0268c))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/MTES-MCT/camino-ui/compare/v0.7.0...v0.8.0) (2019-01-18)


### Bug Fixes

* **rapports:** affiche l'alerte quand un champs vut 0 ([c1266f4](https://github.com/MTES-MCT/camino-ui/commit/c1266f4))
* **rapports:** erreur si lors de la création de rapport ([c835242](https://github.com/MTES-MCT/camino-ui/commit/c835242))
* **rapports:** modifications graphiques sur le formulaire ([9a869bf](https://github.com/MTES-MCT/camino-ui/commit/9a869bf))
* **rapports:** n'affiche pas l'or net dans le récapitulatif ([9c19db2](https://github.com/MTES-MCT/camino-ui/commit/9c19db2))


### Features

* ajoute DEAL dans le placeholder du champs de filtre references ([07aa359](https://github.com/MTES-MCT/camino-ui/commit/07aa359))
* filtre la liste de titres par référence métier ([47b7d81](https://github.com/MTES-MCT/camino-ui/commit/47b7d81))
* **rapports:** ajoute un champs or net pour la déclaration du 4ème trimestre ([3403d65](https://github.com/MTES-MCT/camino-ui/commit/3403d65))
* **rapports:** permet de prévisualiser et d'enregistrer avant de valider ([871c957](https://github.com/MTES-MCT/camino-ui/commit/871c957))


### Reverts

* **rapports:** message de confirmation différent selon que l'on enregistre ou valide ([8714355](https://github.com/MTES-MCT/camino-ui/commit/8714355))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/MTES-MCT/camino-ui/compare/v0.6.0...v0.7.0) (2019-01-11)


### Bug Fixes

* **carte:** erreur lors du changement de fond de carte sur la page titre ([7cc8c60](https://github.com/MTES-MCT/camino-ui/commit/7cc8c60))
* **csp:** erreur dans la console de Firefox ([d0fe448](https://github.com/MTES-MCT/camino-ui/commit/d0fe448))
* **csp:** supprime child-src ([8468aea](https://github.com/MTES-MCT/camino-ui/commit/8468aea))
* **filtres:** met le focus sur le bouton de validation lorsqu'on valide au clavier ([5684c2d](https://github.com/MTES-MCT/camino-ui/commit/5684c2d))
* **menu:** le nom de l'entreprise ne s'affiche pas si l'utilisateur est déja loggué ([59622fa](https://github.com/MTES-MCT/camino-ui/commit/59622fa))
* ajoute sentry.io dans la csp ([eb0dc73](https://github.com/MTES-MCT/camino-ui/commit/eb0dc73))


### Features

* met à jour le titre et la description ([7dd0eea](https://github.com/MTES-MCT/camino-ui/commit/7dd0eea))
* renseigne la description de Camino qui apparait si js est désactivé (pe: google) ([7b232c1](https://github.com/MTES-MCT/camino-ui/commit/7b232c1))
* **menu:** affiche le nom de l'entreprise à côté du nom de l'utilisateur ([0c2e960](https://github.com/MTES-MCT/camino-ui/commit/0c2e960))
* **utilisateur:** affiche le numéro de siren à côté du nom de l'entreprise ([be83083](https://github.com/MTES-MCT/camino-ui/commit/be83083))
* **utilisateurs:** affiche le nom de l'entreprise dans la liste ([788b995](https://github.com/MTES-MCT/camino-ui/commit/788b995))
* envoie un email avant de créer un compte ([3b0381f](https://github.com/MTES-MCT/camino-ui/commit/3b0381f))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/MTES-MCT/camino-ui/compare/v0.5.0...v0.6.0) (2019-01-09)


### Bug Fixes

* ajoute un espace avant les : ([052586f](https://github.com/MTES-MCT/camino-ui/commit/052586f))
* bug ff 52: supprime code incompatible ([41f05ea](https://github.com/MTES-MCT/camino-ui/commit/41f05ea))
* bug ff 52: supprime la csp ([e3dcf6b](https://github.com/MTES-MCT/camino-ui/commit/e3dcf6b))
* bug ff52: ajoute une csp child-policy ([c8c0e8b](https://github.com/MTES-MCT/camino-ui/commit/c8c0e8b))
* compatibilité firefox 52 ([268a442](https://github.com/MTES-MCT/camino-ui/commit/268a442))
* deux fragments GraphQl portent le même nom: titre ([e089140](https://github.com/MTES-MCT/camino-ui/commit/e089140))
* formatage ([c7d3d93](https://github.com/MTES-MCT/camino-ui/commit/c7d3d93))
* modifie la config browslerslist pour être compatible avec firefox 52 ([8d226a6](https://github.com/MTES-MCT/camino-ui/commit/8d226a6))
* orthographe ([65c1a53](https://github.com/MTES-MCT/camino-ui/commit/65c1a53))
* typo ([05de287](https://github.com/MTES-MCT/camino-ui/commit/05de287))


### Features

* après l'init du mot de passe, redirige vers la home et identifie l'utilisateur ([7af5929](https://github.com/MTES-MCT/camino-ui/commit/7af5929))
* **footer:** affiche les liens vers mineralinfo et minergies ([264373f](https://github.com/MTES-MCT/camino-ui/commit/264373f))
* **titres:** affiche le mot 'résultats' devant le nombre de titres ([fd02715](https://github.com/MTES-MCT/camino-ui/commit/fd02715))


### Performance Improvements

* active vue-cli modern mode ([a82f175](https://github.com/MTES-MCT/camino-ui/commit/a82f175))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/MTES-MCT/camino-ui/compare/v0.4.1...v0.5.0) (2018-12-14)


### Bug Fixes

* agrandi l'interlignage dans les pills ([20d5894](https://github.com/MTES-MCT/camino-ui/commit/20d5894))
* diminue la taille du texte sur la vue liste ([ce95ba1](https://github.com/MTES-MCT/camino-ui/commit/ce95ba1))
* hauteur du bouton connexion et du loader ([e5c03d2](https://github.com/MTES-MCT/camino-ui/commit/e5c03d2))
* indique la langue à la page dans le document html ([f51f311](https://github.com/MTES-MCT/camino-ui/commit/f51f311))
* retour à la ligne dans les pills ([d1de30a](https://github.com/MTES-MCT/camino-ui/commit/d1de30a))
* **header:** logo trop large au format tablette ([1eec463](https://github.com/MTES-MCT/camino-ui/commit/1eec463))
* **loader:** change la couleur du loader qui n'est pas assez visible en blanc ([06a529a](https://github.com/MTES-MCT/camino-ui/commit/06a529a))


### Features

* affiche le nom du titulaire dans la liste de titres ([34a757a](https://github.com/MTES-MCT/camino-ui/commit/34a757a))
* affiche un loader lors des reuietes à l'API ([f33c081](https://github.com/MTES-MCT/camino-ui/commit/f33c081))
* affiche une information de taille minimum sous les champs de mot de passe ([11ab0dc](https://github.com/MTES-MCT/camino-ui/commit/11ab0dc))
* génère l'id utilisateur côté serveur ([e53ac10](https://github.com/MTES-MCT/camino-ui/commit/e53ac10))
* **filtres:** ajoute un bouton de validation sur les filtres ([34ba2af](https://github.com/MTES-MCT/camino-ui/commit/34ba2af))
* **filtres:** sépare les mots par un espace au lieu d'une virgule ([bf1a48f](https://github.com/MTES-MCT/camino-ui/commit/bf1a48f))
* **header:** remplace l'icone de connexion par du texte ([79f181a](https://github.com/MTES-MCT/camino-ui/commit/79f181a))
* remplace l'icone de la vue liste ([0e651ac](https://github.com/MTES-MCT/camino-ui/commit/0e651ac))



<a name="0.4.1"></a>
## [0.4.1](https://github.com/MTES-MCT/camino-ui/compare/v0.4.0...v0.4.1) (2018-12-12)


### Reverts

* supprime webpack_hash qui n'existe pas dans le bundle de prod ([1e89fad](https://github.com/MTES-MCT/camino-ui/commit/1e89fad))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/MTES-MCT/camino-ui/compare/v0.3.0...v0.4.0) (2018-12-12)


### Bug Fixes

* **auth:** le token n'est pas effacé quand l'utilisateur de déconnecte ([9096905](https://github.com/MTES-MCT/camino-ui/commit/9096905))
* **filtres:** ajoute une majuscule à la première lettre des noms des filtres ([f1e25cc](https://github.com/MTES-MCT/camino-ui/commit/f1e25cc))
* **footer:** supprime la marge en bas de page ([085742f](https://github.com/MTES-MCT/camino-ui/commit/085742f))


### Features

* ajoute le hash de webpack au numéro de release ([302210c](https://github.com/MTES-MCT/camino-ui/commit/302210c))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/MTES-MCT/camino-ui/compare/v0.2.1...v0.3.0) (2018-12-11)


### Features

* **footer:** ajoute un lien vers les releases github ([2222446](https://github.com/MTES-MCT/camino-ui/commit/2222446))
* filtre les titres par entreprises ([9fa9b5d](https://github.com/MTES-MCT/camino-ui/commit/9fa9b5d))



<a name="0.2.1"></a>

## [0.2.1](https://github.com/MTES-MCT/camino-ui/compare/v0.2.0...v0.2.1) (2018-12-10)

<a name="0.2.0"></a>

## [0.2.0](https://github.com/MTES-MCT/camino-ui/compare/v0.1.0...v0.2.0) (2018-12-10)

### Features

- **footer:** affiche le numéro de version de l'ui et de l'Api ([be2d97b](https://github.com/MTES-MCT/camino-ui/commit/be2d97b))

<a name="0.1.0"></a>

## 0.1.0 (2018-12-10)

- feat: 🎸 expose le numero de version dans l'application ([cd16034](https://github.com/MTES-MCT/camino-ui/commit/cd16034))
- chore: 🤖 supprime le changelog ([5c6ec13](https://github.com/MTES-MCT/camino-ui/commit/5c6ec13))
