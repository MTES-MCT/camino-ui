# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.22.11](https://github.com/MTES-MCT/camino-ui/compare/v0.22.8...v0.22.11) (2019-12-06)


### Features

* ajoute deux fonds de carte Géoportail ([#51](https://github.com/MTES-MCT/camino-ui/issues/51)) ([6e105d3](https://github.com/MTES-MCT/camino-ui/commit/6e105d388bf73677da198c88cf65bb48c7b8f2b9))
* **édition:** n'affiche que les sections ayant du contenu lors de la prévisualisation ([c2143d7](https://github.com/MTES-MCT/camino-ui/commit/c2143d739df81f001ac2f68171ce37507ca160db))
* **export csv:** ajoute les colonnes régions, départements et communes ([#52](https://github.com/MTES-MCT/camino-ui/issues/52)) ([75c7150](https://github.com/MTES-MCT/camino-ui/commit/75c7150c41768a945b7a84023c47fb10f50adab8))
* **ui:** limite la liste des types de références métier ([#43](https://github.com/MTES-MCT/camino-ui/issues/43)) ([1f1d2c7](https://github.com/MTES-MCT/camino-ui/commit/1f1d2c7f5342953258faa28b3eac78f4efd30c01))
* **ui:** prend en compte les paramètres de tri dans l'URL ([#47](https://github.com/MTES-MCT/camino-ui/issues/47)) ([f0914b3](https://github.com/MTES-MCT/camino-ui/commit/f0914b329cf562d575a9324c8b8d11eaa335bdaa))
* affiche les boutons d'éditions selon les permissions ([#46](https://github.com/MTES-MCT/camino-ui/issues/46)) ([0d50c1f](https://github.com/MTES-MCT/camino-ui/commit/0d50c1fc903020c294c117c72a2ae78eed21f629))
* charge contextuellement les metas lors de l'édition ([#49](https://github.com/MTES-MCT/camino-ui/issues/49)) ([c3958cb](https://github.com/MTES-MCT/camino-ui/commit/c3958cb449783b7255ee306f536c41c61a94bd1f))
* restreint les domaines et types de titre en fonction des permissions ([#48](https://github.com/MTES-MCT/camino-ui/issues/48)) ([109ad21](https://github.com/MTES-MCT/camino-ui/commit/109ad213d6f358572e23c2270acc9e70a9df23dd))


### Bug Fixes

* affiche des infos manquantes dans le fichier csv ([6024cb5](https://github.com/MTES-MCT/camino-ui/commit/6024cb5f59784585f3e8e861fe5b739d72afb8f3))
* affiche le bouton document qui manque sur certaines étapes ([cd743a8](https://github.com/MTES-MCT/camino-ui/commit/cd743a80559a534820ee11d0eaf6694ea779ad61))
* corrige l'affichage des points d'un titre ([c40884f](https://github.com/MTES-MCT/camino-ui/commit/c40884fe7eb6241ad8adc9de6b26d9ef0b7bfe9a))
* corrige l'édition de documents ([8746d7f](https://github.com/MTES-MCT/camino-ui/commit/8746d7f7adaa9fcc1253117de5890648ebbae8e6))
* corrige la gestion des filtres ([dcd2558](https://github.com/MTES-MCT/camino-ui/commit/dcd255809d0fb7fff7a89a9a23bb653550837dde))
* corrige le chargement de la liste des types de documents ([e7cbc84](https://github.com/MTES-MCT/camino-ui/commit/e7cbc849087b27cabd5f5bc41a015456130021c1))
* corrige le chargement des entreprises dans l'initialisation des metas ([d9b00f6](https://github.com/MTES-MCT/camino-ui/commit/d9b00f698c00e3cd2c2668f46028416303e378ea))
* corrige les permissions sur l'édition de documents ([0b73486](https://github.com/MTES-MCT/camino-ui/commit/0b734862bf0672f0e434150d86de2c7e219ad77e))
* corrige une erreur lors du chargement des metas ([46fffec](https://github.com/MTES-MCT/camino-ui/commit/46fffec5907d4231b60072e39aa915561c0385e7))
* initialise la colonne de tri si l'id sélectionnée n'existe pas ([2a0775a](https://github.com/MTES-MCT/camino-ui/commit/2a0775a138bc2ba726515ea557381c258689db4b))
* supprime un log ([c38bad0](https://github.com/MTES-MCT/camino-ui/commit/c38bad0528eb0990beade6b5d09ba2590bf7651b))
* **api:** contourne le cache sur certaines requêtes ([dde0ac3](https://github.com/MTES-MCT/camino-ui/commit/dde0ac34cfa8e35985194d793d19c0da6de30191))
* **export csv:** affiche engagement et surface ([#53](https://github.com/MTES-MCT/camino-ui/issues/53)) ([8bbf9e5](https://github.com/MTES-MCT/camino-ui/commit/8bbf9e556fe375b1a6a8270634cf3a1b85438bf0))
* désactive les boutons lors de l'édition ([f79d39d](https://github.com/MTES-MCT/camino-ui/commit/f79d39d9f6ca78e2eb38cd122de4d2eb946709c0))
* **édition:** désactive le bouton supprimer après avoir cliqué dessus ([#50](https://github.com/MTES-MCT/camino-ui/issues/50)) ([4b24dcd](https://github.com/MTES-MCT/camino-ui/commit/4b24dcd8f6b918fbb39d773af3264798db64baad))
* supprime une erreur 404 si l'utilisateur se loggue ([76edccb](https://github.com/MTES-MCT/camino-ui/commit/76edccbb044d57dd38d3389d8ce361f10be23a0b))

### [0.22.10](https://github.com/MTES-MCT/camino-ui/compare/v0.22.9...v0.22.10) (2019-11-27)


### Features

* affiche les boutons d'éditions selon les permissions ([#46](https://github.com/MTES-MCT/camino-ui/issues/46)) ([0d50c1f](https://github.com/MTES-MCT/camino-ui/commit/0d50c1fc903020c294c117c72a2ae78eed21f629))
* restreint les domaines et types de titre en fonction des permissions ([#48](https://github.com/MTES-MCT/camino-ui/issues/48)) ([109ad21](https://github.com/MTES-MCT/camino-ui/commit/109ad213d6f358572e23c2270acc9e70a9df23dd))


### Bug Fixes

* corrige l'affichage des points d'un titre ([c40884f](https://github.com/MTES-MCT/camino-ui/commit/c40884fe7eb6241ad8adc9de6b26d9ef0b7bfe9a))
* corrige les permissions sur l'édition de documents ([0b73486](https://github.com/MTES-MCT/camino-ui/commit/0b734862bf0672f0e434150d86de2c7e219ad77e))
* corrige une erreur lors du chargement des metas ([46fffec](https://github.com/MTES-MCT/camino-ui/commit/46fffec5907d4231b60072e39aa915561c0385e7))

### [0.22.9](https://github.com/MTES-MCT/camino-ui/compare/v0.22.8...v0.22.9) (2019-11-21)


### Bug Fixes

* **api:** contourne le cache sur certaines requêtes ([dde0ac3](https://github.com/MTES-MCT/camino-ui/commit/dde0ac3))
* corrige l'édition de documents ([8746d7f](https://github.com/MTES-MCT/camino-ui/commit/8746d7f))
* corrige la gestion des filtres ([dcd2558](https://github.com/MTES-MCT/camino-ui/commit/dcd2558))
* supprime une erreur 404 si l'utilisateur se loggue ([76edccb](https://github.com/MTES-MCT/camino-ui/commit/76edccb))


### Features

* **ui:** limite la liste des types de références métier ([#43](https://github.com/MTES-MCT/camino-ui/issues/43)) ([1f1d2c7](https://github.com/MTES-MCT/camino-ui/commit/1f1d2c7))

### [0.22.8](https://github.com/MTES-MCT/camino-ui/compare/v0.22.7...v0.22.8) (2019-11-13)


### Bug Fixes

* empêche de valider un rapport si il est incomplet ([4794720](https://github.com/MTES-MCT/camino-ui/commit/4794720))
* **édition:** empêche de valider un formulaire incomplet ([9e5c2f0](https://github.com/MTES-MCT/camino-ui/commit/9e5c2f0))
* corrige l'enregistrement d'une étape ([9820683](https://github.com/MTES-MCT/camino-ui/commit/9820683))
* n'affiche pas les utilisateurs dans la requête sur les titres ([898fb60](https://github.com/MTES-MCT/camino-ui/commit/898fb60))
* optimise les définitions graphql ([80da07c](https://github.com/MTES-MCT/camino-ui/commit/80da07c))
* supprime un log inutile ([9da3068](https://github.com/MTES-MCT/camino-ui/commit/9da3068))


### Features

* **édition:** ajoute une entreprise ([#40](https://github.com/MTES-MCT/camino-ui/issues/40)) ([34e994f](https://github.com/MTES-MCT/camino-ui/commit/34e994f))
* **édition:** gère l'unicité des étapes pendant l'édition ([#42](https://github.com/MTES-MCT/camino-ui/issues/42)) ([0d2f49e](https://github.com/MTES-MCT/camino-ui/commit/0d2f49e))
* lie un utilisateur à des entreprises ou des administrations ([#41](https://github.com/MTES-MCT/camino-ui/issues/41)) ([828958c](https://github.com/MTES-MCT/camino-ui/commit/828958c))

### [0.22.7](https://github.com/MTES-MCT/camino-ui/compare/v0.22.6...v0.22.7) (2019-10-28)


### Bug Fixes

* **édition de documents:** masque le bouton pendant l'enregistrement ([0ff79b3](https://github.com/MTES-MCT/camino-ui/commit/0ff79b3))
* classe les entreprises et les administrations par ordre alphabétique ([f60d920](https://github.com/MTES-MCT/camino-ui/commit/f60d920))
* supprime une instruction erronée ([0d0cdd6](https://github.com/MTES-MCT/camino-ui/commit/0d0cdd6))
* **édition de documents:** corrige des problèmes d'affichage ([8db280b](https://github.com/MTES-MCT/camino-ui/commit/8db280b))
* ajoute l'option "public" à l'édition de document ([ad5ca69](https://github.com/MTES-MCT/camino-ui/commit/ad5ca69))
* corrige la mise en page sur tablette ([dd7a75e](https://github.com/MTES-MCT/camino-ui/commit/dd7a75e))
* **actvités:** supprime le cartouche d'erreur lors de la validation d'une activité ([3620b19](https://github.com/MTES-MCT/camino-ui/commit/3620b19))
* **édition:** corrige une erreur lors de l'ajout d'un utilisateur ([7ac8daa](https://github.com/MTES-MCT/camino-ui/commit/7ac8daa))


### Features

* **édition de documents:** affiche "optionel" sur le champs nom ([ec95e67](https://github.com/MTES-MCT/camino-ui/commit/ec95e67))
* rend visible le bouton d'ajout de document si la liste est masquée ([ea5d103](https://github.com/MTES-MCT/camino-ui/commit/ea5d103))
* **édition:** désactive les boutons lors de l'enregistrement ([3cc92a9](https://github.com/MTES-MCT/camino-ui/commit/3cc92a9))

### [0.22.6](https://github.com/MTES-MCT/camino-ui/compare/v0.22.5...v0.22.6) (2019-10-23)


### Bug Fixes

* affiche l'icône de dépliage de documents pour les super utilisateurs même s'il l'étape ne possède pas de documents ([5451226](https://github.com/MTES-MCT/camino-ui/commit/5451226))
* enlève un caractère en trop dans l'affichage des administrations ([412535a](https://github.com/MTES-MCT/camino-ui/commit/412535a))
* identifie l'utilisateur après un changement de mot de passe ([#38](https://github.com/MTES-MCT/camino-ui/issues/38)) ([5c314c4](https://github.com/MTES-MCT/camino-ui/commit/5c314c4))


### Features

* **édition d'étape:** sélectionne le statut s'il n'y a q'un seul choix ([72382fe](https://github.com/MTES-MCT/camino-ui/commit/72382fe))
* ajoute les administrations aux utilisateurs ([#37](https://github.com/MTES-MCT/camino-ui/issues/37)) ([4a0405f](https://github.com/MTES-MCT/camino-ui/commit/4a0405f))
* ajoute une mention "optionel" sur le champs description ([252ff01](https://github.com/MTES-MCT/camino-ui/commit/252ff01))
* empêche les durées négatives sur les champs "number" ([5a2925a](https://github.com/MTES-MCT/camino-ui/commit/5a2925a))
* téléverse des fichiers ([#39](https://github.com/MTES-MCT/camino-ui/issues/39)) ([27e6ad9](https://github.com/MTES-MCT/camino-ui/commit/27e6ad9))

### [0.22.5](https://github.com/MTES-MCT/camino-ui/compare/v0.22.4...v0.22.5) (2019-10-16)


### Bug Fixes

* corrige l'affichage de la date ([6cce484](https://github.com/MTES-MCT/camino-ui/commit/6cce484))
* **activités:** corrige l'affichage des listes ([5ef97f0](https://github.com/MTES-MCT/camino-ui/commit/5ef97f0))
* **filtres:** prend en compte les champs textes lorsqu'on valide au clavier ([e9fed23](https://github.com/MTES-MCT/camino-ui/commit/e9fed23))
* affiche les dates correctement quelque soit le fuseau horaire ([15ab04c](https://github.com/MTES-MCT/camino-ui/commit/15ab04c))
* corrige la construction d'un groupe de points ([36fee75](https://github.com/MTES-MCT/camino-ui/commit/36fee75))
* corrige un bug d'url qui empêche le chargement des titres ([53b9f11](https://github.com/MTES-MCT/camino-ui/commit/53b9f11))
* corrige une alerte de vue-router NavigationDuplicated ([809c475](https://github.com/MTES-MCT/camino-ui/commit/809c475))
* valide les filtres avec la touche "entrée" ([6fe3531](https://github.com/MTES-MCT/camino-ui/commit/6fe3531))
* **édition d'activité:** affiche un message différent lors de l'enregistrement et de la validation ([4a6d5f2](https://github.com/MTES-MCT/camino-ui/commit/4a6d5f2))
* **édition d'étape:** supprime le nom du point s'il fait parti d'un lot ([e9a8cff](https://github.com/MTES-MCT/camino-ui/commit/e9a8cff))
* **table:** affiche le bouton de la dernière page manquant ([3869e73](https://github.com/MTES-MCT/camino-ui/commit/3869e73))
* met à jour l'url de la page après l'ajout d'une étape ([d3daf6b](https://github.com/MTES-MCT/camino-ui/commit/d3daf6b))
* **filtres:** corrige la recherche filtrée avec un slash ([#34](https://github.com/MTES-MCT/camino-ui/issues/34)) ([8fcb059](https://github.com/MTES-MCT/camino-ui/commit/8fcb059))


### Features

* **statistiques:** met à jour les données ([dd279d5](https://github.com/MTES-MCT/camino-ui/commit/dd279d5))
* **table:** propose le tri par colonne pour une colonne sans intitulé (p.e.: "domaine") ([ccc3473](https://github.com/MTES-MCT/camino-ui/commit/ccc3473))
* affiche l'étiquette "subsidiaire" dans la liste de points ([19f1390](https://github.com/MTES-MCT/camino-ui/commit/19f1390))
* améliore la présentation de la liste de  points ([#36](https://github.com/MTES-MCT/camino-ui/issues/36)) ([480da0b](https://github.com/MTES-MCT/camino-ui/commit/480da0b))
* change l'affichage de la liste de points [#33](https://github.com/MTES-MCT/camino-ui/issues/33) ([db1825e](https://github.com/MTES-MCT/camino-ui/commit/db1825e))
* supprime les unités sur les références de points ([#35](https://github.com/MTES-MCT/camino-ui/issues/35)) ([0a55934](https://github.com/MTES-MCT/camino-ui/commit/0a55934))

### [0.22.4](https://github.com/MTES-MCT/camino-ui/compare/v0.22.3...v0.22.4) (2019-10-02)


### Bug Fixes

* **carte:** rafraichit l'affichage après la mise à jour de points ([c1f1470](https://github.com/MTES-MCT/camino-ui/commit/c1f1470))


### Features

* affiche l'id du système géographique dans le sélecteur ([925a8b6](https://github.com/MTES-MCT/camino-ui/commit/925a8b6))
* affiche le champs date au format français ([d9e78d1](https://github.com/MTES-MCT/camino-ui/commit/d9e78d1))
* édite un lot de points de périmètre géo ([#30](https://github.com/MTES-MCT/camino-ui/issues/30)) ([67688fb](https://github.com/MTES-MCT/camino-ui/commit/67688fb))

### [0.22.3](https://github.com/MTES-MCT/camino-ui/compare/v0.22.2...v0.22.3) (2019-09-23)


### Bug Fixes

* affiche le tag opposable dans le tableau de coordonnées ([8af9f40](https://github.com/MTES-MCT/camino-ui/commit/8af9f40))
* corrige erreur Cannot read property 'references' of undefined ([fb8de80](https://github.com/MTES-MCT/camino-ui/commit/fb8de80))
* définit le format des coordonnnées de références en nombres ([a88d251](https://github.com/MTES-MCT/camino-ui/commit/a88d251))
* uniformise la description d'un point ([6cf326a](https://github.com/MTES-MCT/camino-ui/commit/6cf326a))


### Features

* affiche le lien vers la fiche entreprise depuis un titre ([64a3f3d](https://github.com/MTES-MCT/camino-ui/commit/64a3f3d))
* **entreprise:** rend les entreprises visible au public ([#28](https://github.com/MTES-MCT/camino-ui/issues/28)) ([02501c6](https://github.com/MTES-MCT/camino-ui/commit/02501c6))

### [0.22.2](https://github.com/MTES-MCT/camino-ui/compare/v0.22.1...v0.22.2) (2019-08-15)


### Bug Fixes

* corrige les appels à l'API ([892e252](https://github.com/MTES-MCT/camino-ui/commit/892e252))
* **édition d'étape:** supprime les champs dont les ids sont vides ([a47ec99](https://github.com/MTES-MCT/camino-ui/commit/a47ec99))


### Features

* affiche l'unités du sytème de coordonnées géo ([375c48b](https://github.com/MTES-MCT/camino-ui/commit/375c48b))
* ajoute les tags coordonnées opposables et subsidiaires ([8894a41](https://github.com/MTES-MCT/camino-ui/commit/8894a41))
* ajoute les utilisateurs et les titres dans la vue entreprise ([fe480e7](https://github.com/MTES-MCT/camino-ui/commit/fe480e7))
* crée un composant table générique ([ba009fb](https://github.com/MTES-MCT/camino-ui/commit/ba009fb))
* désactive gestureHandling sur la carte en plein écran ([1e77e52](https://github.com/MTES-MCT/camino-ui/commit/1e77e52))
* édite les références des points géo ([8346309](https://github.com/MTES-MCT/camino-ui/commit/8346309))
* met à jour l'API ([d19c60e](https://github.com/MTES-MCT/camino-ui/commit/d19c60e))
* organise les tables par colonnes en clic ([e862856](https://github.com/MTES-MCT/camino-ui/commit/e862856))

### [0.22.1](https://github.com/MTES-MCT/camino-ui/compare/v0.22.0...v0.22.1) (2019-07-31)


### Bug Fixes

* ajoute dynamiquement l'url de l'API à la CSP ([29dfc73](https://github.com/MTES-MCT/camino-ui/commit/29dfc73))
* ajuste l'affichage des clusters ([2b74a41](https://github.com/MTES-MCT/camino-ui/commit/2b74a41))
* corrige l'édition des points ([2b45137](https://github.com/MTES-MCT/camino-ui/commit/2b45137))
* corrige la création d'un utilisateur ([213c0bb](https://github.com/MTES-MCT/camino-ui/commit/213c0bb))
* corrige la création de titres, démarches, étapes ([b98fe00](https://github.com/MTES-MCT/camino-ui/commit/b98fe00))
* corrige la mise en page de l'entête d'un accordéon ([e9226a2](https://github.com/MTES-MCT/camino-ui/commit/e9226a2))
* supprime un composant inutile ([bfefc9d](https://github.com/MTES-MCT/camino-ui/commit/bfefc9d))


### Features

* affiche la carte en plein écran ([25f04f8](https://github.com/MTES-MCT/camino-ui/commit/25f04f8))
* affiche la durée en années / mois ([328178f](https://github.com/MTES-MCT/camino-ui/commit/328178f))
* affiche les infos géographiques sur un titre ([581eeed](https://github.com/MTES-MCT/camino-ui/commit/581eeed))
* ajoute des champs dynamiques sur une étape (pe: ONF) ([b96e7df](https://github.com/MTES-MCT/camino-ui/commit/b96e7df))
* ajoute une url de serveur d'api ([3daf611](https://github.com/MTES-MCT/camino-ui/commit/3daf611))
* améliore la mise en page des étapes ([c8ce8b8](https://github.com/MTES-MCT/camino-ui/commit/c8ce8b8))
* corrige l'extension lors du téléchargement du geojson ([#27](https://github.com/MTES-MCT/camino-ui/issues/27)) ([defa988](https://github.com/MTES-MCT/camino-ui/commit/defa988))
* regroupe les marqueurs en clusters ([2ff959a](https://github.com/MTES-MCT/camino-ui/commit/2ff959a))
* uniformise les boutons pour passer de la vue carte à la vue liste ([10d711d](https://github.com/MTES-MCT/camino-ui/commit/10d711d))

## [0.22.0](https://github.com/MTES-MCT/camino-ui/compare/v0.21.0...v0.22.0) (2019-07-04)


### Bug Fixes

* corrige un bug lors de l'ajout d'une entreprise vide à un utilisateur ([#24](https://github.com/MTES-MCT/camino-ui/issues/24)) ([97b16a4](https://github.com/MTES-MCT/camino-ui/commit/97b16a4))
* **export:** corrige le format de la date dans le nom du fichier ([#21](https://github.com/MTES-MCT/camino-ui/issues/21)) ([4905d9b](https://github.com/MTES-MCT/camino-ui/commit/4905d9b))
* corrige la navigation dans l'historique du navigateur ([747bc10](https://github.com/MTES-MCT/camino-ui/commit/747bc10))
* **firefox:** prévient un double appel à l'api sur la liste des titres ([4e33bd2](https://github.com/MTES-MCT/camino-ui/commit/4e33bd2))
* ajoute l'api de preprod à la csp ([a570525](https://github.com/MTES-MCT/camino-ui/commit/a570525))
* met à jour les filtres lorsqu'un utilisateur se connecte / déconnecte ([3ec6ccd](https://github.com/MTES-MCT/camino-ui/commit/3ec6ccd))


### Build System

* met à jour les dépendances ([e2a89b1](https://github.com/MTES-MCT/camino-ui/commit/e2a89b1))
* revient à eslint 5 ([cf19557](https://github.com/MTES-MCT/camino-ui/commit/cf19557))


### Features

* ajoute le docker-compose de preprod ([2262d71](https://github.com/MTES-MCT/camino-ui/commit/2262d71))
* ajoute une redirection de stats vers statistiques ([ae94755](https://github.com/MTES-MCT/camino-ui/commit/ae94755))
* corrige l'édition des étapes ([#25](https://github.com/MTES-MCT/camino-ui/issues/25)) ([c17456e](https://github.com/MTES-MCT/camino-ui/commit/c17456e))
* télécharge un geojson des titres ([#22](https://github.com/MTES-MCT/camino-ui/issues/22)) ([fb2d9ab](https://github.com/MTES-MCT/camino-ui/commit/fb2d9ab))



## [0.21.0](https://github.com/MTES-MCT/camino-ui/compare/v0.20.0...v0.21.0) (2019-06-17)


### Bug Fixes

* désactive le lien sur le logo sur la pages titres ([aff40a7](https://github.com/MTES-MCT/camino-ui/commit/aff40a7))
* supprime un test inutile ([f1e27ee](https://github.com/MTES-MCT/camino-ui/commit/f1e27ee))


### Build System

* met à jour les dépendances ([8320b8b](https://github.com/MTES-MCT/camino-ui/commit/8320b8b))


### Features

* affiche la durée en mois ([a6e15c4](https://github.com/MTES-MCT/camino-ui/commit/a6e15c4))
* ajoute une page entreprise ([18e84ae](https://github.com/MTES-MCT/camino-ui/commit/18e84ae))
* autorise plusieurs entreprises par utilisateurs ([99661ad](https://github.com/MTES-MCT/camino-ui/commit/99661ad))


### Tests

* teste l'état des entreprises ([418dffa](https://github.com/MTES-MCT/camino-ui/commit/418dffa))
* teste si l'api retourne null sur une liste d'entreprises ([5167791](https://github.com/MTES-MCT/camino-ui/commit/5167791))



## [0.20.0](https://github.com/MTES-MCT/camino-ui/compare/v0.19.0...v0.20.0) (2019-06-11)


### Build System

* met à jour les dépendances ([481eee7](https://github.com/MTES-MCT/camino-ui/commit/481eee7))
* met à jour les dépendances ([08c70e9](https://github.com/MTES-MCT/camino-ui/commit/08c70e9))


### Features

* utilise les date de demande, de début et de fin exposées par l'api ([c64a6f9](https://github.com/MTES-MCT/camino-ui/commit/c64a6f9))



## [0.19.0](https://github.com/MTES-MCT/camino-ui/compare/v0.18.0...v0.19.0) (2019-06-04)


### Bug Fixes

* **carte:** ajoute la dépendance à leaflet.markercluster ([d3d1fe8](https://github.com/MTES-MCT/camino-ui/commit/d3d1fe8))
* **titres:** corrige la liste des titres qui se charge 2 fois si un utilisateur est connecté ([4c4b513](https://github.com/MTES-MCT/camino-ui/commit/4c4b513))
* corrige la position du bouton "ajouter un titre" ([8cb7b57](https://github.com/MTES-MCT/camino-ui/commit/8cb7b57))
* corrige une erreur graphql lors du passage des titres à un titre ([bed037d](https://github.com/MTES-MCT/camino-ui/commit/bed037d))


### Build System

* met à jour les dépendances ([f7a14c1](https://github.com/MTES-MCT/camino-ui/commit/f7a14c1))
* met à jour les dépendances (vue-cli@4-alpha) ([e0082e7](https://github.com/MTES-MCT/camino-ui/commit/e0082e7))


### Features

* **carte:** regroupe les marqueurs en groupes ([#19](https://github.com/MTES-MCT/camino-ui/issues/19)) ([5851251](https://github.com/MTES-MCT/camino-ui/commit/5851251))



## [0.18.0](https://github.com/MTES-MCT/camino-ui/compare/v0.17.0...v0.18.0) (2019-05-23)


### Bug Fixes

* corrige un problème de chargement des titres lors de la création de compte ([1e83fbc](https://github.com/MTES-MCT/camino-ui/commit/1e83fbc))
* **fichiers:** affiche l'extension pdf ([8b917fd](https://github.com/MTES-MCT/camino-ui/commit/8b917fd))
* **fichiers:** retourne une erreur si le fichier est introuvable ([e1cdbcd](https://github.com/MTES-MCT/camino-ui/commit/e1cdbcd))
* activtés ([780d37e](https://github.com/MTES-MCT/camino-ui/commit/780d37e))
* affiche les bouton de zoom sur la carte ([a444d13](https://github.com/MTES-MCT/camino-ui/commit/a444d13))
* affiche une légende "source indisponible" ([10d08f1](https://github.com/MTES-MCT/camino-ui/commit/10d08f1))
* corrige la fonction de tri des entreprises ([143e98b](https://github.com/MTES-MCT/camino-ui/commit/143e98b))
* remplace le label "présumé" par une icone ([a03429c](https://github.com/MTES-MCT/camino-ui/commit/a03429c))
* **fichiers:** ajoute l'extension pdf au fichier téléchargé ([00f01b6](https://github.com/MTES-MCT/camino-ui/commit/00f01b6))


### Build System

* ajoute codecov ([0ce0930](https://github.com/MTES-MCT/camino-ui/commit/0ce0930))
* met à jour les dépendances ([f2d126c](https://github.com/MTES-MCT/camino-ui/commit/f2d126c))
* met à jour les dépendances ([e7383c7](https://github.com/MTES-MCT/camino-ui/commit/e7383c7))


### Features

* redirige vers la page du titre avec sa nouvelle id lors de la mise à jour ([37fc1d3](https://github.com/MTES-MCT/camino-ui/commit/37fc1d3))
* renomme l'onglet titres en droits miniers ([af579e5](https://github.com/MTES-MCT/camino-ui/commit/af579e5))
* **recherche:** permet de combiner des mots dans un filtre de recherche ([d1018ee](https://github.com/MTES-MCT/camino-ui/commit/d1018ee))
* dynamise certaines statistiques ([#17](https://github.com/MTES-MCT/camino-ui/issues/17)) ([424de04](https://github.com/MTES-MCT/camino-ui/commit/424de04))
* édite les incertitudes au sein d'une étape ([cecc0fc](https://github.com/MTES-MCT/camino-ui/commit/cecc0fc))
* remplace le champs source indisponible par des champs incertitudes ([9753029](https://github.com/MTES-MCT/camino-ui/commit/9753029))
* **activités:** prend en compte la date de fin d'une activité ([ae3c560](https://github.com/MTES-MCT/camino-ui/commit/ae3c560))
* **fichiers:** met à jour le téléchargement selon la nouvelle api ([e1662a8](https://github.com/MTES-MCT/camino-ui/commit/e1662a8))
* **fichiers:** télécharge un fichier pdf ([b297721](https://github.com/MTES-MCT/camino-ui/commit/b297721))
* **stats:** ajout d'une page de stats ([10d98ac](https://github.com/MTES-MCT/camino-ui/commit/10d98ac))


### Tests

* Ajoute des tests ([2d755aa](https://github.com/MTES-MCT/camino-ui/commit/2d755aa))
* corrige la config jest et ajoute les badges ([23ca762](https://github.com/MTES-MCT/camino-ui/commit/23ca762))
* elabore router sur index ([6fbb9b6](https://github.com/MTES-MCT/camino-ui/commit/6fbb9b6))
* modifie user,index ([022d598](https://github.com/MTES-MCT/camino-ui/commit/022d598))
* modify index ([cc64e1c](https://github.com/MTES-MCT/camino-ui/commit/cc64e1c))
* supprime un message d'erreur ([1cff0a2](https://github.com/MTES-MCT/camino-ui/commit/1cff0a2))
* supprime un message d'erreur [#16](https://github.com/MTES-MCT/camino-ui/issues/16) ([5ad8370](https://github.com/MTES-MCT/camino-ui/commit/5ad8370))
* termine les tests sur le store ([1d5793a](https://github.com/MTES-MCT/camino-ui/commit/1d5793a))
* teste en cours ([663505a](https://github.com/MTES-MCT/camino-ui/commit/663505a))
* teste partiellement utilisateurs ([de3f943](https://github.com/MTES-MCT/camino-ui/commit/de3f943))
* teste titre,utilisateurs,metas,titre-activites,utilisateur ([02047c8](https://github.com/MTES-MCT/camino-ui/commit/02047c8))
* teste user,index ([62a92b2](https://github.com/MTES-MCT/camino-ui/commit/62a92b2))
* update metas ([1d0f707](https://github.com/MTES-MCT/camino-ui/commit/1d0f707))



## [0.17.0](https://github.com/MTES-MCT/camino-ui/compare/v0.16.0...v0.17.0) (2019-05-07)


### Bug Fixes

* affiche le type de titre lors de la suppression d'une étape ([64676ae](https://github.com/MTES-MCT/camino-ui/commit/64676ae))
* **édition:** corrige des erreurs dans le formulaire d'ajout d'étapes ([024d036](https://github.com/MTES-MCT/camino-ui/commit/024d036))
* **édition:** limite les types de titre au domaine selectionné ([816d170](https://github.com/MTES-MCT/camino-ui/commit/816d170))


### Build System

* met à jour les dépendances ([c6c63d0](https://github.com/MTES-MCT/camino-ui/commit/c6c63d0))
* met à jour les dépendances ([b5947e3](https://github.com/MTES-MCT/camino-ui/commit/b5947e3))


### Features

* **carte:** utilise ctrl + click pour zoomer (ou 2 doigts sur support tactile) ([3901ee4](https://github.com/MTES-MCT/camino-ui/commit/3901ee4))
* **design:** agrandit la carte ([e3cb612](https://github.com/MTES-MCT/camino-ui/commit/e3cb612))
* ajoute un nouveau titre ([038134b](https://github.com/MTES-MCT/camino-ui/commit/038134b))


### Tests

* **store:** teste utilisateur et substances ([c8f96c9](https://github.com/MTES-MCT/camino-ui/commit/c8f96c9))



# [0.16.0](https://github.com/MTES-MCT/camino-ui/compare/v0.15.0...v0.16.0) (2019-04-30)


### Bug Fixes

* converti les évènements click sur les lignes des tableaux en liens ([2bb312c](https://github.com/MTES-MCT/camino-ui/commit/2bb312c))
* créé une copie du titre avant de le modifier ([1094287](https://github.com/MTES-MCT/camino-ui/commit/1094287))
* édite une démarche ([df14ed4](https://github.com/MTES-MCT/camino-ui/commit/df14ed4))
* supprime un filet inutile ([d424d29](https://github.com/MTES-MCT/camino-ui/commit/d424d29))
* **csv:** exporte le csv si les titres n'ont pas de références ([78f47c4](https://github.com/MTES-MCT/camino-ui/commit/78f47c4))


### Features

* **activités:** autorise un utilisateur admin à modifier une activité ([ba48d03](https://github.com/MTES-MCT/camino-ui/commit/ba48d03))
* ajoute une nouvelle démarche ([0260a20](https://github.com/MTES-MCT/camino-ui/commit/0260a20))
* édite et supprime un titre ([edcdacd](https://github.com/MTES-MCT/camino-ui/commit/edcdacd))
* édite les démarches ([f21b938](https://github.com/MTES-MCT/camino-ui/commit/f21b938))
* supprime une démarche ([210f951](https://github.com/MTES-MCT/camino-ui/commit/210f951))
* supprime une étape ([93a5fbf](https://github.com/MTES-MCT/camino-ui/commit/93a5fbf))



# [0.15.0](https://github.com/MTES-MCT/camino-ui/compare/v0.14.0...v0.15.0) (2019-04-17)


### Bug Fixes

* **cgu:** corrige la mise en page ([f5aae66](https://github.com/MTES-MCT/camino-ui/commit/f5aae66))
* supprime un log ([d432516](https://github.com/MTES-MCT/camino-ui/commit/d432516))
* **filtres:** supprime le bouton inverse ([e2080c7](https://github.com/MTES-MCT/camino-ui/commit/e2080c7))
* **url:** charge les paramètre de filtres lorsqu'on revient sur la page liste ([8d4bb35](https://github.com/MTES-MCT/camino-ui/commit/8d4bb35))
* affiche 'établissement' au singulier si il n'y en a qu'un ([17717ce](https://github.com/MTES-MCT/camino-ui/commit/17717ce))
* change la structure des activités de type checkbox en tableau ([bbbf70b](https://github.com/MTES-MCT/camino-ui/commit/bbbf70b))
* évite de scroller en haut de page lorsque les paramètres d'url changent ([a553914](https://github.com/MTES-MCT/camino-ui/commit/a553914))
* gère l'historique des urls ([32cfd34](https://github.com/MTES-MCT/camino-ui/commit/32cfd34))
* met à jour le contenu de la page si l'url change (bouton back) ([df7bbf3](https://github.com/MTES-MCT/camino-ui/commit/df7bbf3))
* n'affiche l'accordéon que si une entreprise contient des informations ([a16f120](https://github.com/MTES-MCT/camino-ui/commit/a16f120))
* retourne des ids sur les éléments lié lors de la mise à jour d'étapes ([63d8e8e](https://github.com/MTES-MCT/camino-ui/commit/63d8e8e))
* **sentry:** change la config sentry pour être compatible avec la v.5 ([48e0743](https://github.com/MTES-MCT/camino-ui/commit/48e0743))
* **sentry:** config sentry ([e7becd8](https://github.com/MTES-MCT/camino-ui/commit/e7becd8))
* **sentry:** désactive sentry qui plante tout ([e8e94fd](https://github.com/MTES-MCT/camino-ui/commit/e8e94fd))
* met en page ([5fe4eaf](https://github.com/MTES-MCT/camino-ui/commit/5fe4eaf))


### Features

* ajoute une nouvelle étape ([2859a6f](https://github.com/MTES-MCT/camino-ui/commit/2859a6f))
* édite l'emprise territoriale d'une étape ([208149c](https://github.com/MTES-MCT/camino-ui/commit/208149c))
* injecte les paramètres de filtre dans l'url ([92aec76](https://github.com/MTES-MCT/camino-ui/commit/92aec76))
* met à jour une étape ([f02c0dc](https://github.com/MTES-MCT/camino-ui/commit/f02c0dc))
* mise à jour des CGU et mentions légales ([cab8881](https://github.com/MTES-MCT/camino-ui/commit/cab8881))
* **a-propos:** ajout de Florent et d'Adrien ([b085617](https://github.com/MTES-MCT/camino-ui/commit/b085617))
* **activités:** affiche les activités à traiter dans la liste des titres ([a95e0e1](https://github.com/MTES-MCT/camino-ui/commit/a95e0e1))
* **activités:** limite l'édition des activités à certains rôles ([ea66c35](https://github.com/MTES-MCT/camino-ui/commit/ea66c35))
* **entreprises:** affiche la liste des établissements dans l'encart entreprises ([b35e195](https://github.com/MTES-MCT/camino-ui/commit/b35e195))
* **titre:** affiche les administrations ([79b4e3a](https://github.com/MTES-MCT/camino-ui/commit/79b4e3a))



# [0.14.0](https://github.com/MTES-MCT/camino-ui/compare/v0.13.0...v0.14.0) (2019-03-22)


### Bug Fixes

* **activités:** affiche la liste des travaux ([c4de22a](https://github.com/MTES-MCT/camino-ui/commit/c4de22a))
* **build:** fonctionne avec les anciens navigateurs ([a34b2ce](https://github.com/MTES-MCT/camino-ui/commit/a34b2ce))
* corrige une typeError sur les anciens navigateurs ([5dd872e](https://github.com/MTES-MCT/camino-ui/commit/5dd872e))
* prend en compte les établissements d'une entreprise sur une requête utilisateur ([d5c4c18](https://github.com/MTES-MCT/camino-ui/commit/d5c4c18))
* **activités:** classe les années par ordre desc ([c7b3a2d](https://github.com/MTES-MCT/camino-ui/commit/c7b3a2d))
* **activités:** ouverture de la popup sur une activité dont le statut est absent ([289be48](https://github.com/MTES-MCT/camino-ui/commit/289be48))
* **activités:** prend en compte les champs optionels ([2049178](https://github.com/MTES-MCT/camino-ui/commit/2049178))
* **compat:** compatibilité avec iOs 9 ([1445e4e](https://github.com/MTES-MCT/camino-ui/commit/1445e4e))


### Features

* **activités:** affiche la date de modification si elle existe ([1d8f616](https://github.com/MTES-MCT/camino-ui/commit/1d8f616))
* **activités:** affiche le formulaire d'édition d'activité ([1b685dc](https://github.com/MTES-MCT/camino-ui/commit/1b685dc))
* **activités:** affiche les activités dans un onglet ([39480a0](https://github.com/MTES-MCT/camino-ui/commit/39480a0))
* **activités:** affiche une pastille avec le nombre d'erreurs dans l'onglet ([af954a8](https://github.com/MTES-MCT/camino-ui/commit/af954a8))
* **activités:** amélioration du design ([c9bc98b](https://github.com/MTES-MCT/camino-ui/commit/c9bc98b))
* **activités:** enregistre une activité après modification ([4ed603c](https://github.com/MTES-MCT/camino-ui/commit/4ed603c))
* **activités:** n'affiche un élément archivé que sur les activités concernées ([cd35d56](https://github.com/MTES-MCT/camino-ui/commit/cd35d56))
* **api:** prend en compte les établissements d'une entreprise ([923f342](https://github.com/MTES-MCT/camino-ui/commit/923f342))
* **api:** supprime le champs raisonSociale d'une entreprise ([fb8887f](https://github.com/MTES-MCT/camino-ui/commit/fb8887f))
* **entreprises:** affiche le bloc répertoire ([73e2e79](https://github.com/MTES-MCT/camino-ui/commit/73e2e79))
* met à jour le schema graphql suivant les évolution de l'API ([fb02f9e](https://github.com/MTES-MCT/camino-ui/commit/fb02f9e))



# [0.13.0](https://github.com/MTES-MCT/camino-ui/compare/v0.12.0...v0.13.0) (2019-02-28)


### Bug Fixes

* n'affiche le bouton télécharger que si les titres sont chargés ([198e294](https://github.com/MTES-MCT/camino-ui/commit/198e294))
* remplace l'intitulé engagement par engagement financier ([f93aee8](https://github.com/MTES-MCT/camino-ui/commit/f93aee8))


### Features

* affiche l'engagement financier sur la page d'un titre ([4c624bd](https://github.com/MTES-MCT/camino-ui/commit/4c624bd))
* ajoute l'engagement financier dans l'export csv ([505e204](https://github.com/MTES-MCT/camino-ui/commit/505e204))
* améliore l'ergonomie du formulaire d'édition d'étape ([b1ec692](https://github.com/MTES-MCT/camino-ui/commit/b1ec692))
* formate l'export csv de la liste des titres ([9d430ca](https://github.com/MTES-MCT/camino-ui/commit/9d430ca))
* formatte la valeur de l'engagement financier ([ae7965a](https://github.com/MTES-MCT/camino-ui/commit/ae7965a))
* télécharge la liste des titres en csv ([a5474ea](https://github.com/MTES-MCT/camino-ui/commit/a5474ea))



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
