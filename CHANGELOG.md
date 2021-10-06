# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.23.0](https://github.com/MTES-MCT/camino-ui/compare/v0.22.84...v0.23.0) (2021-10-06)


### Features

* **titre:** permet d’ajouter manuellement une administration sur un titre ([#391](https://github.com/MTES-MCT/camino-ui/issues/391)) ([789cb43](https://github.com/MTES-MCT/camino-ui/commit/789cb43af05808378230088bae3a62092e5b4e8c))
* **titres:** affiche sur la carte les périmètres des ARM en cours de demande pour les entreprises ([#389](https://github.com/MTES-MCT/camino-ui/issues/389)) ([aa2cc17](https://github.com/MTES-MCT/camino-ui/commit/aa2cc17615fc58abd04a8c7ae805c72d821629b4))
* **upload:** renforce les capacités de téléversement ([#385](https://github.com/MTES-MCT/camino-ui/issues/385)) ([4340e8c](https://github.com/MTES-MCT/camino-ui/commit/4340e8c73274e9f83cc03e46de44d0ca967aefd6))


### Bug Fixes

* **accueil:** corrige le lien de l’accueil quand on est sur une page introuvable ([#396](https://github.com/MTES-MCT/camino-ui/issues/396)) ([3fcb34d](https://github.com/MTES-MCT/camino-ui/commit/3fcb34de1c471674a3a208205b10ccb192025ccc))
* **etape:** corrige bug d'accès à référence de pointReference ([#394](https://github.com/MTES-MCT/camino-ui/issues/394)) ([a0c34ee](https://github.com/MTES-MCT/camino-ui/commit/a0c34eeef5c76d0238ee14ebe74848d7600314c2))
* **étape:** corrige l’ajout manuel d’un périmètre sur une étape ([#388](https://github.com/MTES-MCT/camino-ui/issues/388)) ([2ea9683](https://github.com/MTES-MCT/camino-ui/commit/2ea968312a56e4b4653cf5e880d407510d1d339b))
* **git:** corrige husky ([#392](https://github.com/MTES-MCT/camino-ui/issues/392)) ([de9d455](https://github.com/MTES-MCT/camino-ui/commit/de9d4552a839c93e71026e797d94aea25517ff09))

### [0.22.84](https://github.com/MTES-MCT/camino-ui/compare/v0.22.83...v0.22.84) (2021-09-27)


### Features

* **àpropos:** mise à jour de la page « à propos » de l’équipe ([#380](https://github.com/MTES-MCT/camino-ui/issues/380)) ([9198266](https://github.com/MTES-MCT/camino-ui/commit/9198266a36f290e6bee30165be24ccb265ec52e7))
* **logs:** affiche les modifications effectuées par les utilisateurs ([#386](https://github.com/MTES-MCT/camino-ui/issues/386)) ([29c1ed7](https://github.com/MTES-MCT/camino-ui/commit/29c1ed73a0a3833ace701c6f1918ee4667181089))
* **métas:** permet l’ajout d’un nouveau type de document dans les métas ([#382](https://github.com/MTES-MCT/camino-ui/issues/382)) ([3397c15](https://github.com/MTES-MCT/camino-ui/commit/3397c15b2da42f0b0a7a58a5b726738517b37599))


### Bug Fixes

* **étape:** corrige l’import d’un périmètre d’une étape ([#387](https://github.com/MTES-MCT/camino-ui/issues/387)) ([2e7b020](https://github.com/MTES-MCT/camino-ui/commit/2e7b0208ddabe719d8abc330b3604d6d325dd011))
* **map:** corrige nullité de '_latLngToNewLayerPoint' et 'this._map' ([#384](https://github.com/MTES-MCT/camino-ui/issues/384)) ([ba73630](https://github.com/MTES-MCT/camino-ui/commit/ba7363027603e47099b981f5effabc294320c457))
* **tests:** corrige les scripts de tests locaux 'simple' et 'watch' ([#383](https://github.com/MTES-MCT/camino-ui/issues/383)) ([7fdb23d](https://github.com/MTES-MCT/camino-ui/commit/7fdb23d220df01427308d29baa8198ffa5672c4f))

### [0.22.83](https://github.com/MTES-MCT/camino-ui/compare/v0.22.82...v0.22.83) (2021-09-13)


### Features

* **documents:** ajoute une description sur les types de documents ([#377](https://github.com/MTES-MCT/camino-ui/issues/377)) ([e93bf5e](https://github.com/MTES-MCT/camino-ui/commit/e93bf5e9bb858de4644b498c10ee438b6697c951))


### Bug Fixes

* **étape:** repenser l'UX du bouton Enregistrer sur le formulaire ([#374](https://github.com/MTES-MCT/camino-ui/issues/374)) ([310c6b1](https://github.com/MTES-MCT/camino-ui/commit/310c6b1980472a6872103da28c658b540552ed01))
* **fichier:** désactive les raccourcis clavier pendant le téléversement d’un fichier ([#378](https://github.com/MTES-MCT/camino-ui/issues/378)) ([f59f56c](https://github.com/MTES-MCT/camino-ui/commit/f59f56c1d877b64fbd4ad3235aeedf9d693812c9))
* **titre:** ajoute les documents obligatoires pour les ARM mécanisées ([#375](https://github.com/MTES-MCT/camino-ui/issues/375)) ([f538277](https://github.com/MTES-MCT/camino-ui/commit/f53827795823c8cd2e95775175970a5338f57a79))
* **titre:** corrige l'affichage du lien du titre en doublon ([#373](https://github.com/MTES-MCT/camino-ui/issues/373)) ([f5a0e64](https://github.com/MTES-MCT/camino-ui/commit/f5a0e64029a2fec0ee4f0e88b141a9b4410e83a4))

### [0.22.82](https://github.com/MTES-MCT/camino-ui/compare/v0.22.81...v0.22.82) (2021-09-06)


### Features

* **périmètre:** permet l’import du périmètre d’un titre via un fichier shape ou geojson ([#372](https://github.com/MTES-MCT/camino-ui/issues/372)) ([f74ba54](https://github.com/MTES-MCT/camino-ui/commit/f74ba54859b5113a6fae3156095cd708dcdd83db))
* **titre:** optimise la suppression d'un titre ([c51bbf5](https://github.com/MTES-MCT/camino-ui/commit/c51bbf5a5acde028e997d531ba0223ee8d27d846))


### Bug Fixes

* **pagination:** réinitialise la pagination si la page courante n'existe pas ([069964d](https://github.com/MTES-MCT/camino-ui/commit/069964dbfc09db84b0ae95f81401ad93b020110b))

### [0.22.81](https://github.com/MTES-MCT/camino-ui/compare/v0.22.80...v0.22.81) (2021-08-05)


### Features

* **métas:** permet d'ajouter des métas pour les travaux ([ebf44d1](https://github.com/MTES-MCT/camino-ui/commit/ebf44d157265ad1d4b33078c8f3f1a46668e09d4))

### [0.22.80](https://github.com/MTES-MCT/camino-ui/compare/v0.22.79...v0.22.80) (2021-08-05)


### Features

* **arm:** simplifie le formulaire d'ajout de demande d'ARM pour les opérateurs ([#371](https://github.com/MTES-MCT/camino-ui/issues/371)) ([b244895](https://github.com/MTES-MCT/camino-ui/commit/b2448950f0423fe8a4e5471d102722d570998c90))


### Bug Fixes

* **démarche:** utilise le slug pour ajouter une nouvelle étape à une démarche ([c1551c2](https://github.com/MTES-MCT/camino-ui/commit/c1551c258d6abb12d66796b1048512daaa873bec))
* **étape:** corrige l’affichage de l’aide sur les demandes d’ARM ([572ac0b](https://github.com/MTES-MCT/camino-ui/commit/572ac0bb425e8fec6fe63d82a86652511d0a6726))
* **utilisateurs:** supprime les requêtes inutiles pendant la modification d'un utilisateur ([32d4934](https://github.com/MTES-MCT/camino-ui/commit/32d49344c6d8021f25db9840ab7ced5d5989e9df))

### [0.22.79](https://github.com/MTES-MCT/camino-ui/compare/v0.22.78...v0.22.79) (2021-08-02)

### [0.22.78](https://github.com/MTES-MCT/camino-ui/compare/v0.22.77...v0.22.78) (2021-07-21)


### Features

* **étape:** améliore la gestion des documents sur les étapes ([#369](https://github.com/MTES-MCT/camino-ui/issues/369)) ([b065c4e](https://github.com/MTES-MCT/camino-ui/commit/b065c4e77cc1b9093c720b17effb5cfce07a1d35))
* **metas:** affiche l'id et le nom des metas dans les relations ([#367](https://github.com/MTES-MCT/camino-ui/issues/367)) ([84f8e0e](https://github.com/MTES-MCT/camino-ui/commit/84f8e0e21ef5dba652c41a3a26f807ab13d03bee))

### [0.22.77](https://github.com/MTES-MCT/camino-ui/compare/v0.22.76...v0.22.77) (2021-07-07)


### Features

* **justificatifs:** améliore l’interface pour éditer les justificatifs d’une étape ([#368](https://github.com/MTES-MCT/camino-ui/issues/368)) ([375f12a](https://github.com/MTES-MCT/camino-ui/commit/375f12a66acbd0f6d2ebfefb17b3ce8fcb06e9f0))


### Bug Fixes

* **étape:** redirige vers l’étape que si on a son identifiant ([6b30d56](https://github.com/MTES-MCT/camino-ui/commit/6b30d56ad102bb245164e75e6a0e251748acc729))

### [0.22.76](https://github.com/MTES-MCT/camino-ui/compare/v0.22.75...v0.22.76) (2021-07-02)


### Features

* **autoupdate:** met à jour le site automatiquement après la livraison d'une nouvelle version ([#365](https://github.com/MTES-MCT/camino-ui/issues/365)) ([b7cb2a8](https://github.com/MTES-MCT/camino-ui/commit/b7cb2a8bf32ca5654b80efbe99d6ad17033405e0))
* **connexion:** utilise des labels pour les champs du formulaire de connexion ([5ba4f2c](https://github.com/MTES-MCT/camino-ui/commit/5ba4f2c84b46e8a055c381e49dda69f58f9bd3fc))


### Bug Fixes

* **documents:** corrige la modification d’un document sans modifier le fichier ([a494748](https://github.com/MTES-MCT/camino-ui/commit/a494748b5f40ae27dc576ad33e3ce5424b6cc116))
* **filtres:** corrige le tracking des filtres vers matomo ([#364](https://github.com/MTES-MCT/camino-ui/issues/364)) ([d3a1750](https://github.com/MTES-MCT/camino-ui/commit/d3a1750f723ae7b48726c4a3ba57f149cab2e1a0))
* **firefox:** renomme le fichier de matomo pour corriger le lancement en dev avec Firefox ([6e91e04](https://github.com/MTES-MCT/camino-ui/commit/6e91e045920edf84e312bfe60b56d3dc39b8d2a6))
* **matomo:** corrige la content security policy pour Matomo ([29fd35b](https://github.com/MTES-MCT/camino-ui/commit/29fd35b89bd175514abc20e66c9dbdf64004640e))

### [0.22.75](https://github.com/MTES-MCT/camino-ui/compare/v0.22.74...v0.22.75) (2021-06-24)


### Features

* **arm:** ajoute un message d'aide sur la demande d'ARM à destination des entreprises ([ccfc05d](https://github.com/MTES-MCT/camino-ui/commit/ccfc05d1f6217ca910cb7afac944a2a2e486c042))


### Bug Fixes

* **activités:** corrige l'affichage des Statuts des travaux ([3c8e8f4](https://github.com/MTES-MCT/camino-ui/commit/3c8e8f4e023eeb66ce88fc17305e80262719053d))
* **étape:** corrige l’enregistrement des étapes avec des justificatifs ([d5e1f61](https://github.com/MTES-MCT/camino-ui/commit/d5e1f618ec05b25003cf9b316c1535761d0bbbc0))
* **matomo:** corrige la configuration matomo avec vue 3 ([#363](https://github.com/MTES-MCT/camino-ui/issues/363)) ([2c99a1a](https://github.com/MTES-MCT/camino-ui/commit/2c99a1ab5c69ffdcb09f2c89707da0584c1104f9))

### [0.22.74](https://github.com/MTES-MCT/camino-ui/compare/v0.22.73...v0.22.74) (2021-06-21)


### Features

* **étape:** n'affiche pas les dates pour les entreprises sur des arms ([c2000e4](https://github.com/MTES-MCT/camino-ui/commit/c2000e483d4bb30dec6db386610d332a2157473c))
* **justificatifs:** sélectionne le justificatif qui vient juste d’être ajouté via la popup ([#357](https://github.com/MTES-MCT/camino-ui/issues/357)) ([737f84e](https://github.com/MTES-MCT/camino-ui/commit/737f84efe05fed5dd19edec3b485d9d32eabf421))


### Bug Fixes

* **carte:** rend les périmètres des titres cliquables quand les marqueurs sont cachés ([#359](https://github.com/MTES-MCT/camino-ui/issues/359)) ([065c53b](https://github.com/MTES-MCT/camino-ui/commit/065c53b0ddf9b27c4f959e40b2af5bb1e14cfd96))

### [0.22.73](https://github.com/MTES-MCT/camino-ui/compare/v0.22.72...v0.22.73) (2021-06-15)


### Bug Fixes

* **activités:** permet d’ajouter les fichiers sur les activités ([e0c58ac](https://github.com/MTES-MCT/camino-ui/commit/e0c58ac840f38e10a2bc3311da6365abcd66aef2))
* **documents:** corrige le style des boutons dans la popup d’édition d’un document ([39c3c2a](https://github.com/MTES-MCT/camino-ui/commit/39c3c2a11110f02effba303e7c76b0ae70d39b3a))

### [0.22.72](https://github.com/MTES-MCT/camino-ui/compare/v0.22.71...v0.22.72) (2021-06-14)


### Features

* **étape:** permet d’ajouter à la volée les documents dans une étape ([#353](https://github.com/MTES-MCT/camino-ui/issues/353)) ([42ea50e](https://github.com/MTES-MCT/camino-ui/commit/42ea50e85c40fd1c291eb3064e1832e6b18c7461))
* ajoute un document d'entreprise lors de l'édition d'une étape ([#351](https://github.com/MTES-MCT/camino-ui/issues/351)) ([93c1593](https://github.com/MTES-MCT/camino-ui/commit/93c159368ca0c74c887e45dda79317fb72d35e76))
* améliore l'ergonomie de la dépose de demande ([#352](https://github.com/MTES-MCT/camino-ui/issues/352)) ([393aa6e](https://github.com/MTES-MCT/camino-ui/commit/393aa6e1fdfdcbb1636155a579d4f25fcd654bc9))
* supprime le widget mailjet ([#354](https://github.com/MTES-MCT/camino-ui/issues/354)) ([c8081e5](https://github.com/MTES-MCT/camino-ui/commit/c8081e582e8c17da2ba2daa88fc2d20fbf9f1fc0))

### [0.22.71](https://github.com/MTES-MCT/camino-ui/compare/v0.22.70...v0.22.71) (2021-06-02)


### Features

* affiche la carte sur les étapes ([#347](https://github.com/MTES-MCT/camino-ui/issues/347)) ([36f9cdf](https://github.com/MTES-MCT/camino-ui/commit/36f9cdf88857ed18dff2df7b28fe19a7444b6857))
* **documents:** permet de télécharger les documents dans la page de l’étape ([#346](https://github.com/MTES-MCT/camino-ui/issues/346)) ([b98d78e](https://github.com/MTES-MCT/camino-ui/commit/b98d78e8e4955bacfd19b54d7e8d4908733b0d68))
* affiche le bouton pour déposer une demande de titre ([#343](https://github.com/MTES-MCT/camino-ui/issues/343)) ([20661e1](https://github.com/MTES-MCT/camino-ui/commit/20661e10cf360d48930920d9727db4a16893bb39))
* améliore l'affichage de la prévisualisation d'étape ([#341](https://github.com/MTES-MCT/camino-ui/issues/341)) ([cb9dcb2](https://github.com/MTES-MCT/camino-ui/commit/cb9dcb24e7343cab20293144087e27535a2eae08))
* prévisualise l'étape avant validation ([#339](https://github.com/MTES-MCT/camino-ui/issues/339)) ([132ee46](https://github.com/MTES-MCT/camino-ui/commit/132ee46c733923f2e2550c2171733254adc5e6b9))
* utilise la nouvelle interface pour créer les étapes ([#342](https://github.com/MTES-MCT/camino-ui/issues/342)) ([3081882](https://github.com/MTES-MCT/camino-ui/commit/308188227a98c9349a3eeaf532d7ad1674022611))
* **étape:** ajoute les propriétés manquantes dans page d’édition d’une étape ([#335](https://github.com/MTES-MCT/camino-ui/issues/335)) ([67add21](https://github.com/MTES-MCT/camino-ui/commit/67add218534e22bf98d151ce2abfb02adc58701e))
* **justificatifs:** ajoute l’édition des métas des justificatifs ([#337](https://github.com/MTES-MCT/camino-ui/issues/337)) ([20361ce](https://github.com/MTES-MCT/camino-ui/commit/20361ce333c38a988e08b5628a064dd9e10e4dbc))
* **justificatifs:** ajoute un bloc permettant de lier les justificatifs dans une étape ([#338](https://github.com/MTES-MCT/camino-ui/issues/338)) ([8474623](https://github.com/MTES-MCT/camino-ui/commit/8474623febba34805ef9d735c7d51113ceb1e310))


### Bug Fixes

* corrige l'édition de l'étape ([#345](https://github.com/MTES-MCT/camino-ui/issues/345)) ([c563d4c](https://github.com/MTES-MCT/camino-ui/commit/c563d4c834eddfe8deb568994c6daeee812d93c0)), closes [#343](https://github.com/MTES-MCT/camino-ui/issues/343)
* élargi la popup ([#350](https://github.com/MTES-MCT/camino-ui/issues/350)) ([3428c4f](https://github.com/MTES-MCT/camino-ui/commit/3428c4f5ed0e1ebcadb86ddb03f71518d73fcfcd))
* **points:** corrige l’enregistrement des points renseignés sur une étape ([#344](https://github.com/MTES-MCT/camino-ui/issues/344)) ([5d25f5b](https://github.com/MTES-MCT/camino-ui/commit/5d25f5bf8886e9bf0d05aabe888a1c7526e502ff))

### [0.22.70](https://github.com/MTES-MCT/camino-ui/compare/v0.22.69...v0.22.70) (2021-05-19)


### Features

* ajoute une demande de titre ([#325](https://github.com/MTES-MCT/camino-ui/issues/325)) ([bd84dfc](https://github.com/MTES-MCT/camino-ui/commit/bd84dfc111db57c5e2f088c2e83ddf313dfed7a3))
* ajoute une interface d'édition des étapes ([#330](https://github.com/MTES-MCT/camino-ui/issues/330)) ([ae259d3](https://github.com/MTES-MCT/camino-ui/commit/ae259d304d1676c25f29dc84aac6e8bc237c19b4))
* édite une étape ([#334](https://github.com/MTES-MCT/camino-ui/issues/334)) ([eafe749](https://github.com/MTES-MCT/camino-ui/commit/eafe74926735cce8c624f92ac8faaa86d6941cb0))
* **entreprise:** ajoute une propriété titresCreation ([#323](https://github.com/MTES-MCT/camino-ui/issues/323)) ([fb4f6ce](https://github.com/MTES-MCT/camino-ui/commit/fb4f6cea70b81ca0b8fa9114f802713521e7d033))
* vérifie si l’application est à jour à chaque appel à l’API ([#322](https://github.com/MTES-MCT/camino-ui/issues/322)) ([b18f292](https://github.com/MTES-MCT/camino-ui/commit/b18f2924cd9d741ccbc34ffd994c59b8edbd35eb))
* **demande:** initialise la mécanisation des demandes mécanisées ([#318](https://github.com/MTES-MCT/camino-ui/issues/318)) ([62ad238](https://github.com/MTES-MCT/camino-ui/commit/62ad2381c626dc953d050c7170b898bb189b552e))


### Bug Fixes

* **glossaire:** corrige l'affichage des définitions du glossaire ([#333](https://github.com/MTES-MCT/camino-ui/issues/333)) ([078abc2](https://github.com/MTES-MCT/camino-ui/commit/078abc2eb1ee8fdc8f8aaae21f95c0b5acbd7da8))
* **statistiques:** ajoute les années 2017 et 2018 ([#332](https://github.com/MTES-MCT/camino-ui/issues/332)) ([b19828e](https://github.com/MTES-MCT/camino-ui/commit/b19828e2227891665e981aef634c44cdb005ed3e))
* corrige l'édition des champs json ([#331](https://github.com/MTES-MCT/camino-ui/issues/331)) ([5efab2e](https://github.com/MTES-MCT/camino-ui/commit/5efab2e81a975f3344e974d9bbed0d1e905dc23e))
* corrige le lien vers une page entreprise ([#327](https://github.com/MTES-MCT/camino-ui/issues/327)) ([7527058](https://github.com/MTES-MCT/camino-ui/commit/752705875a899b44b30242d2eda63759aa8d4c23))
* **étape:** corrige l’affichage des dates dans les sections ([#326](https://github.com/MTES-MCT/camino-ui/issues/326)) ([66ab32d](https://github.com/MTES-MCT/camino-ui/commit/66ab32d50a9c4938609aa242885f4af23c7de1b7))
* **étapes:** les éléments de type radio et checkbox ne sont plus optionnels ([#320](https://github.com/MTES-MCT/camino-ui/issues/320)) ([e2b2c72](https://github.com/MTES-MCT/camino-ui/commit/e2b2c72d16875544ae307fa06c8c6fb1392ae0e7))
* **map:** corrige les erreurs de type 'this._map is null' lors des zooms ([#321](https://github.com/MTES-MCT/camino-ui/issues/321)) ([c0f86fa](https://github.com/MTES-MCT/camino-ui/commit/c0f86fa67f0d1970bb8b93a974fc58d738588316))
* **stats:** corrige les échelles et légendes des pages statistiques ([#319](https://github.com/MTES-MCT/camino-ui/issues/319)) ([bb1cf80](https://github.com/MTES-MCT/camino-ui/commit/bb1cf80272affac65accdec4f4782645df05fb44))
* formate la date dans une section ([#317](https://github.com/MTES-MCT/camino-ui/issues/317)) ([ba452f1](https://github.com/MTES-MCT/camino-ui/commit/ba452f161d65274e959d15f10af4bbbc7cdaa856))

### [0.22.69](https://github.com/MTES-MCT/camino-ui/compare/v0.22.68...v0.22.69) (2021-05-04)


### Bug Fixes

* **métas:** corrige une erreur lorsqu'on clique sur une entête ([#315](https://github.com/MTES-MCT/camino-ui/issues/315)) ([531c4e0](https://github.com/MTES-MCT/camino-ui/commit/531c4e02b7a57ea0de6de0f5ea2f86a466028024))
* corrige le téléchargement de fichier sur ff60 ([1d86964](https://github.com/MTES-MCT/camino-ui/commit/1d869640fdd5b55e0295c8c085d39b21c0478868))
* **contenu:** corrige une erreur lors de l’utilisation de champ multiple dans les étapes ([6c0d29f](https://github.com/MTES-MCT/camino-ui/commit/6c0d29fac090904e6931a93c737c8580efdcc498))

### [0.22.68](https://github.com/MTES-MCT/camino-ui/compare/v0.22.67...v0.22.68) (2021-04-27)


### Features

* affiche les descriptions des types d'activités ([#307](https://github.com/MTES-MCT/camino-ui/issues/307)) ([71c05ca](https://github.com/MTES-MCT/camino-ui/commit/71c05caaa8c99f695f321825c03269ed47fb2360))


### Bug Fixes

* **titres:** initialise les filtres en fonction des paramètres d'url ([499829d](https://github.com/MTES-MCT/camino-ui/commit/499829db5ee32bde125e57cbe4e09a5cb78c9f76))
* corrige l'affichage des stats ([#309](https://github.com/MTES-MCT/camino-ui/issues/309)) ([0315cac](https://github.com/MTES-MCT/camino-ui/commit/0315cacdc69aa46a353930a21915d6d760246977))
* masque le bouton d'ouverture d'une étape si elle est vide ([05a2403](https://github.com/MTES-MCT/camino-ui/commit/05a240377ef13fa386a6e7809f7fecffb3d03718))
* rend compatible avec les vieilles versions de firefox ([#310](https://github.com/MTES-MCT/camino-ui/issues/310)) ([48a7c12](https://github.com/MTES-MCT/camino-ui/commit/48a7c1265e44635295cfcd1ec76627132ebaa8fb))
* **statistiques:** corrige l'affichage des graphs ([#308](https://github.com/MTES-MCT/camino-ui/issues/308)) ([d7daa64](https://github.com/MTES-MCT/camino-ui/commit/d7daa6401062810583c33ca3ae49c063e25f433b))

### [0.22.67](https://github.com/MTES-MCT/camino-ui/compare/v0.22.66...v0.22.67) (2021-04-21)


### Features

* **activités:** affiche une description pour les types d'activité ([#300](https://github.com/MTES-MCT/camino-ui/issues/300)) ([8b18ee4](https://github.com/MTES-MCT/camino-ui/commit/8b18ee47f98edf611fe62ba89a651641e3de6971))
* **fichier:** prend en compte les nouveaux éléments de type fichier ([#301](https://github.com/MTES-MCT/camino-ui/issues/301)) ([3202c87](https://github.com/MTES-MCT/camino-ui/commit/3202c87f8200dd24679112ac96d86ac4dd03963a))
* ajoute des étapes de travaux ([#302](https://github.com/MTES-MCT/camino-ui/issues/302)) ([85a2009](https://github.com/MTES-MCT/camino-ui/commit/85a2009ae4ab6d57c860fc510f22a9fdfa4ea3af))
* ajoute un indicateur de chargement de fichier ([#291](https://github.com/MTES-MCT/camino-ui/issues/291)) ([bab9c9d](https://github.com/MTES-MCT/camino-ui/commit/bab9c9de0635ab772507d8f07842c3e607224589))
* édite les méta-données des travaux ([#303](https://github.com/MTES-MCT/camino-ui/issues/303)) ([9fdeee1](https://github.com/MTES-MCT/camino-ui/commit/9fdeee148390d277cde7e2a7617c85099a92fc6c))
* **étapes:** vérifie si toutes les sections obligatoires sont renseignées ([#286](https://github.com/MTES-MCT/camino-ui/issues/286)) ([0c05f19](https://github.com/MTES-MCT/camino-ui/commit/0c05f19d7de5ebc1a0d7990819d15fa414f3f9d5))
* **map:** corrige le sélecteur de fond de carte sur la page d'un titre ([#299](https://github.com/MTES-MCT/camino-ui/issues/299)) ([f9427d6](https://github.com/MTES-MCT/camino-ui/commit/f9427d6a5e67b70b392b33b86167872f589d8570))
* **sections:** permet d’avoir des éléments multiple dans les sections ([#293](https://github.com/MTES-MCT/camino-ui/issues/293)) ([cde4999](https://github.com/MTES-MCT/camino-ui/commit/cde49999a52c2b3b63ab7de67ee47e265dedc024))
* **sections:** récupère les sections du type d’étape lors de la récupération de l’héritage ([#289](https://github.com/MTES-MCT/camino-ui/issues/289)) ([7e9c706](https://github.com/MTES-MCT/camino-ui/commit/7e9c706f6832712afe9de2fdce25a56e35932eaf))


### Bug Fixes

* **activités:** corrige la vérification de complétion ([a296008](https://github.com/MTES-MCT/camino-ui/commit/a29600891c568f556e5ea91da9902c49d620956e))
* **carte:** corrige une erreur quand l’utilisateur change de page pendant un chargement ([#297](https://github.com/MTES-MCT/camino-ui/issues/297)) ([3766ec6](https://github.com/MTES-MCT/camino-ui/commit/3766ec67f1d42ff53391f1e46927d8672c4265bb))
* **dateformat:** corrige l'erreur sur dateFormat (édition d'étapes) ([#292](https://github.com/MTES-MCT/camino-ui/issues/292)) ([5eeac56](https://github.com/MTES-MCT/camino-ui/commit/5eeac564004d2981ef4cf4fd5d7d87367ececc5c))
* **démarches:** corrige le sélecteur de types d'étape ([818f9c3](https://github.com/MTES-MCT/camino-ui/commit/818f9c3616e9816e37e92d12492ecf30edb5555a))
* **documents:** corrige une erreur pendant le chargement des métas ([#294](https://github.com/MTES-MCT/camino-ui/issues/294)) ([b8712d7](https://github.com/MTES-MCT/camino-ui/commit/b8712d7f171545c55393c93c0fa4821a30edeaeb))
* **documents:** supprime la colonne répertoire ([#306](https://github.com/MTES-MCT/camino-ui/issues/306)) ([533c07d](https://github.com/MTES-MCT/camino-ui/commit/533c07db83f39d99cfb7b1b424a740546298995f))
* **etape:** corrige l’erreur pendant le changement de type d’étape ([#305](https://github.com/MTES-MCT/camino-ui/issues/305)) ([7161886](https://github.com/MTES-MCT/camino-ui/commit/7161886120f93cbc569a33dc5dfd6fff9464ead0))
* **étape:** corrige le changement de type lors de l'édition ([1fa4800](https://github.com/MTES-MCT/camino-ui/commit/1fa4800facab7887fb1cee95ea835031523b8922))
* **étape:** corrige le sélecteur de type ([b95ad9b](https://github.com/MTES-MCT/camino-ui/commit/b95ad9bbba1c373ca61608612b26b7e244136608))
* **étape:** corrige le sélection des types disponibles lors de la création d’une étape ([1ebfd6b](https://github.com/MTES-MCT/camino-ui/commit/1ebfd6bb8fd08785f0df2a58742afe6c91dd11cb))
* **map:** corrige les sélecteurs de fond de carte et de type de marker ([#296](https://github.com/MTES-MCT/camino-ui/issues/296)) ([99a6c30](https://github.com/MTES-MCT/camino-ui/commit/99a6c307e241771efd7fb169d74bff2dc14b3d16))
* corrige l'affichage des métas et le téléchargement ([#287](https://github.com/MTES-MCT/camino-ui/issues/287)) ([da3262f](https://github.com/MTES-MCT/camino-ui/commit/da3262fe110d7af8cffb82074070851332fd2891))
* corrige le zoom sur leaflet ([#290](https://github.com/MTES-MCT/camino-ui/issues/290)) ([bcddee7](https://github.com/MTES-MCT/camino-ui/commit/bcddee7df9a1d2073ddb3bf9b52e02edaa53b24f))
* corrige les liens depuis la page statistiques ([893fa7f](https://github.com/MTES-MCT/camino-ui/commit/893fa7f3ea479637fa8fd2f3b41715b143abf737))
* formate le contenu des champs lors de la validation au clavier ([#288](https://github.com/MTES-MCT/camino-ui/issues/288)) ([e8874a7](https://github.com/MTES-MCT/camino-ui/commit/e8874a7efa8de9acf99daa3380f11ef97eb7a3c7))
* **menu:** corrige temporairement le menu en attendant la nouvelle version du routeur ([3fc9e4c](https://github.com/MTES-MCT/camino-ui/commit/3fc9e4c035685a0430298eff15a2005b55d23ab8))

### [0.22.66](https://github.com/MTES-MCT/camino-ui/compare/v0.22.65...v0.22.66) (2021-03-30)


### Features

* **activités:** édite les métas ([#282](https://github.com/MTES-MCT/camino-ui/issues/282)) ([b9e72cd](https://github.com/MTES-MCT/camino-ui/commit/b9e72cd5f3e0af96bb7827154e1d92c36807b93e))
* **documents:** édite les types de documents pour chaque type d’étapes ([#276](https://github.com/MTES-MCT/camino-ui/issues/276)) ([1534318](https://github.com/MTES-MCT/camino-ui/commit/15343183f820122e85182794f13f13159bb13e13))


### Bug Fixes

* **entreprises:** corrige une erreur pourun utilisateur déconnecté ([#281](https://github.com/MTES-MCT/camino-ui/issues/281)) ([68d8dd8](https://github.com/MTES-MCT/camino-ui/commit/68d8dd80343024f8d7145e6ce4c12abd1d355182))
* **métas:** corrige les métas de Types de travaux - Types d’étapes ([1e0a8c7](https://github.com/MTES-MCT/camino-ui/commit/1e0a8c7047ad981fc2a5ac56b81f4e676f53f1a1))

### [0.22.65](https://github.com/MTES-MCT/camino-ui/compare/v0.22.64...v0.22.65) (2021-03-23)


### Features

* **carte:** ajoute une option pour masquer la trame ([#278](https://github.com/MTES-MCT/camino-ui/issues/278)) ([f127c94](https://github.com/MTES-MCT/camino-ui/commit/f127c94d243732d52b0f44a76b9965f4be0e9d91))
* **travaux:** masque le statut ([f52fbc4](https://github.com/MTES-MCT/camino-ui/commit/f52fbc4dfd074b69c1e7dc0d4d39df98656e83b7))
* met à jour les permissions ([#277](https://github.com/MTES-MCT/camino-ui/issues/277)) ([0819e12](https://github.com/MTES-MCT/camino-ui/commit/0819e12dbe8d344ad09f91583f8a5ca96dadb974))


### Bug Fixes

* **titres:** corrige l’affichage du bouton de création de titres ([#280](https://github.com/MTES-MCT/camino-ui/issues/280)) ([df91de9](https://github.com/MTES-MCT/camino-ui/commit/df91de9e5da30f4303016a36c5ec8f7ad3e80b72))
* **travaux:** corrige des problèmes de mise en page ([#279](https://github.com/MTES-MCT/camino-ui/issues/279)) ([bb93650](https://github.com/MTES-MCT/camino-ui/commit/bb936506f8e5c34b81f9962e86c00fa9d32c756f))
* **travaux:** corrige l'affichage du statut ([15bf4b3](https://github.com/MTES-MCT/camino-ui/commit/15bf4b34d1aa7e1c2c844a92b4de35b65c716c38))

### [0.22.64](https://github.com/MTES-MCT/camino-ui/compare/v0.22.63...v0.22.64) (2021-03-17)


### Features

* **administration:** édite les restrictions sur les types d'activités ([#272](https://github.com/MTES-MCT/camino-ui/issues/272)) ([d557260](https://github.com/MTES-MCT/camino-ui/commit/d55726089d09a60e83f77fd539746b6381c5c8b9))


### Bug Fixes

* **activités:** prévisualise les champs facultatifs ([#273](https://github.com/MTES-MCT/camino-ui/issues/273)) ([0939407](https://github.com/MTES-MCT/camino-ui/commit/0939407d181bc335844bff77a262a88adcd2cbea))
* **administrations:** corrige l’interface pour définir les permissions d’une adminstrations ([#275](https://github.com/MTES-MCT/camino-ui/issues/275)) ([8ecf193](https://github.com/MTES-MCT/camino-ui/commit/8ecf193384ccb6a8cbcaf2f2c3fc8cb153526e32))
* **édition d'étape:** corrige une erreur lors de l'initialisation de l'héritage ([#274](https://github.com/MTES-MCT/camino-ui/issues/274)) ([3354c5c](https://github.com/MTES-MCT/camino-ui/commit/3354c5cb197b264e8ab64400619e9c0c07d83c5d))

### [0.22.63](https://github.com/MTES-MCT/camino-ui/compare/v0.22.62...v0.22.63) (2021-03-08)


### Features

* édite la propriété "opérateur" sur les entreprises ([#267](https://github.com/MTES-MCT/camino-ui/issues/267)) ([b2913f3](https://github.com/MTES-MCT/camino-ui/commit/b2913f30f91354024a3364a90f5b566fdd71b7e2))
* hérite les contenus entres les étapes ([#261](https://github.com/MTES-MCT/camino-ui/issues/261)) ([318128a](https://github.com/MTES-MCT/camino-ui/commit/318128a52b327abab5d0592feeae07321fd7d92c))
* met à jour les profils de l'équipe ([#207](https://github.com/MTES-MCT/camino-ui/issues/207)) ([e6ac29d](https://github.com/MTES-MCT/camino-ui/commit/e6ac29dd9d494a895dfb95de9c7bf16c5f73d696))


### Bug Fixes

* corrige une erreur si aucune référence de point n'est opposable ([#271](https://github.com/MTES-MCT/camino-ui/issues/271)) ([4d23989](https://github.com/MTES-MCT/camino-ui/commit/4d2398926126af7bd8101b7a253707965fde9397))
* **etape:** affiche le type de titre dans la pop-up de suppression d'étape ([#270](https://github.com/MTES-MCT/camino-ui/issues/270)) ([2dc9527](https://github.com/MTES-MCT/camino-ui/commit/2dc9527f30308788247d77efe3db246a54bba605))
* corrige la marge sur le bouton supprimer des activités ([633fd68](https://github.com/MTES-MCT/camino-ui/commit/633fd68272369adfbd5e14ffdd212c65ad7c8bdb))
* **a-propos:** corrige le nom de l'intrapreneuse ([#268](https://github.com/MTES-MCT/camino-ui/issues/268)) ([354798d](https://github.com/MTES-MCT/camino-ui/commit/354798d6d928e82a5d6e07aa8ff5c4767c0cb9bc))
* **a-propos:** corrige les dates d'arrivée ([#269](https://github.com/MTES-MCT/camino-ui/issues/269)) ([6e77086](https://github.com/MTES-MCT/camino-ui/commit/6e7708658012db9b0bae5452e0d237d5fd92a61b))
* **coordonnees:** corrige l'erreur de saisie de coordonnées vides ([#264](https://github.com/MTES-MCT/camino-ui/issues/264)) ([a70188b](https://github.com/MTES-MCT/camino-ui/commit/a70188b8d832031a4d5625f4a297c8a47cfedee5))
* **étape:** supprime l’ancienne colonne « ordre » des métas des statuts d’étapes ([#266](https://github.com/MTES-MCT/camino-ui/issues/266)) ([0cbf37a](https://github.com/MTES-MCT/camino-ui/commit/0cbf37a4c0a023d2903a2192e5a06d2991667f5a))
* **rapport:** corrige l'onglet courant ('Droits miniers' par défaut) ([#265](https://github.com/MTES-MCT/camino-ui/issues/265)) ([0d3eefe](https://github.com/MTES-MCT/camino-ui/commit/0d3eefe691580f056c1880f58e93f8e2fbcb6956))
* corrige la validation au clavier de la date d'une étape ([f126d48](https://github.com/MTES-MCT/camino-ui/commit/f126d48f8c8d74bc9133df178fee0877dd699e78))

### [0.22.62](https://github.com/MTES-MCT/camino-ui/compare/v0.22.61...v0.22.62) (2021-03-02)


### Features

* **héritage:** ajoute l’héritage de l’incertitude entre 2 étapes fondamentales ([#260](https://github.com/MTES-MCT/camino-ui/issues/260)) ([320ca6c](https://github.com/MTES-MCT/camino-ui/commit/320ca6c548389a579e6ac7765521f4c8a11dcbc3))
* hérite les propriétés entre les étapes ([#258](https://github.com/MTES-MCT/camino-ui/issues/258)) ([1e741c6](https://github.com/MTES-MCT/camino-ui/commit/1e741c62ba67d3f64aa513838431e83bf902dbd3))


### Bug Fixes

* affiche l'incertitude sur la date ([c316fda](https://github.com/MTES-MCT/camino-ui/commit/c316fda41f6dd8dc67cc137f40e0aeaf5de9981b))
* **étape:** utilise la bonne date pour la récupération des métas lors de la modification d’une étape ([#263](https://github.com/MTES-MCT/camino-ui/issues/263)) ([0f18db0](https://github.com/MTES-MCT/camino-ui/commit/0f18db05290dfa5011de17ca05b196ccb6b46b06))
* initialise les incertitudes si la propriété est modifiée ([#262](https://github.com/MTES-MCT/camino-ui/issues/262)) ([0698efb](https://github.com/MTES-MCT/camino-ui/commit/0698efb4a077c01c50892de1f7936f6bb320d5b6))

### [0.22.61](https://github.com/MTES-MCT/camino-ui/compare/v0.22.60...v0.22.61) (2021-02-18)


### Features

* **démarches:** ajoute la colonne 'Références' dans la liste ([#256](https://github.com/MTES-MCT/camino-ui/issues/256)) ([4eb088c](https://github.com/MTES-MCT/camino-ui/commit/4eb088c234519bfe9ae7f28a28e90a21e21ae7f4))
* **liste:** ajoute la colonne 'périmètre' à la liste des titres ([#253](https://github.com/MTES-MCT/camino-ui/issues/253)) ([cbf714d](https://github.com/MTES-MCT/camino-ui/commit/cbf714d189d04547af391749d5c1df0823eddabe))


### Bug Fixes

* corrige la valeur par défaut des champs de saisie des coordonnées ([#254](https://github.com/MTES-MCT/camino-ui/issues/254)) ([d78b9f3](https://github.com/MTES-MCT/camino-ui/commit/d78b9f3c45b448db1f51db38accbbfb81113ef5f))
* masque l'icone si l'étape ne contient aucune propriété ([#255](https://github.com/MTES-MCT/camino-ui/issues/255)) ([62af1b6](https://github.com/MTES-MCT/camino-ui/commit/62af1b62eff81e245a40e1f04671e2e06fd8cd92))

### [0.22.60](https://github.com/MTES-MCT/camino-ui/compare/v0.22.59...v0.22.60) (2021-02-15)


### Features

* **liste:** ajoute les régions et les départements dans la liste des titres ([#250](https://github.com/MTES-MCT/camino-ui/issues/250)) ([a15f8cc](https://github.com/MTES-MCT/camino-ui/commit/a15f8cc3e6ce552c5a81ca4c3fdd362b3fb573e3))
* ajoute un bouton pour supprimer une activité ([c63c677](https://github.com/MTES-MCT/camino-ui/commit/c63c6772cc1900e0493932a56685163c295e6ee0))
* **étape:** initialise la date à aujourd’hui lors de l’ajout d’une étape ([#252](https://github.com/MTES-MCT/camino-ui/issues/252)) ([25d3478](https://github.com/MTES-MCT/camino-ui/commit/25d3478a8841d9d8236236ff32453615362b938e))
* **liste:** ajoute la colonne 'Références' dans la liste de titres ([#248](https://github.com/MTES-MCT/camino-ui/issues/248)) ([b6a2f09](https://github.com/MTES-MCT/camino-ui/commit/b6a2f0944707cf430e8f1008e34772ae5bdfe2c9))
* **statistiques:** ajoute le graph des stocks de concessions granulats marins ([#247](https://github.com/MTES-MCT/camino-ui/issues/247)) ([eb67819](https://github.com/MTES-MCT/camino-ui/commit/eb678193f2a9ea8ff247a2072a2ee4f57071713c))


### Bug Fixes

* **utilisateur:** permet d’affecter un utilisateur à son administration ([#251](https://github.com/MTES-MCT/camino-ui/issues/251)) ([d279ccd](https://github.com/MTES-MCT/camino-ui/commit/d279ccdf113ea9fb31063c8b6527ccdc719a26a6))
* limite la liste des entreprises lors de l'ajout d'une entreprise ([#249](https://github.com/MTES-MCT/camino-ui/issues/249)) ([0c64234](https://github.com/MTES-MCT/camino-ui/commit/0c64234418d19912d13cfcb86294641fe87b2d6d))

### [0.22.59](https://github.com/MTES-MCT/camino-ui/compare/v0.22.56...v0.22.59) (2021-02-08)


### Features

* met à jour le nom du ministère et les coordonnées ([#243](https://github.com/MTES-MCT/camino-ui/issues/243)) ([432bb3f](https://github.com/MTES-MCT/camino-ui/commit/432bb3f35d65cb50440ccb04d2370ffcf9183e94))
* **activités:** prend en compte les documents optionnels ([#241](https://github.com/MTES-MCT/camino-ui/issues/241)) ([bcfe8e6](https://github.com/MTES-MCT/camino-ui/commit/bcfe8e6cb14dfefe19f8a15959ed2db30711edc9))


### Bug Fixes

* **entreprise:** permet de désarchiver une entreprise ([0384393](https://github.com/MTES-MCT/camino-ui/commit/038439310452387cb7d2f2cb39d5595ec3d594f4))
* **metas:** ajoute la majuscule manquante sur Types des administrations ([5d38d58](https://github.com/MTES-MCT/camino-ui/commit/5d38d58b3776879e8cb0ec39fdeb11f2e0abb13c))
* ajoute une majuscule sur le titre des métas ([4af2c19](https://github.com/MTES-MCT/camino-ui/commit/4af2c19e57dd81d7f430397927f192ff60a39303))
* **activités:** affiche correctement les sections des activités dans le formulaire ([#245](https://github.com/MTES-MCT/camino-ui/issues/245)) ([3086de7](https://github.com/MTES-MCT/camino-ui/commit/3086de7c4663ecbf8f1942ff9d2dfe9b106a4c78))
* **statistiques:** corrige les libellés et ajoute les liens vers les titres ([#246](https://github.com/MTES-MCT/camino-ui/issues/246)) ([a7a63be](https://github.com/MTES-MCT/camino-ui/commit/a7a63becc7b4b10117bf8e40b07697b7a722d07f))
* édite les nouveaux champs d'unité ([0421c73](https://github.com/MTES-MCT/camino-ui/commit/0421c73913271142d769be826bd2f719270befb6))

### [0.22.58](https://github.com/MTES-MCT/camino-ui/compare/v0.22.57...v0.22.58) (2021-02-05)


### Features

* met à jour le nom du ministère et les coordonnées ([#243](https://github.com/MTES-MCT/camino-ui/issues/243)) ([432bb3f](https://github.com/MTES-MCT/camino-ui/commit/432bb3f35d65cb50440ccb04d2370ffcf9183e94))


### Bug Fixes

* ajoute une majuscule sur le titre des métas ([4af2c19](https://github.com/MTES-MCT/camino-ui/commit/4af2c19e57dd81d7f430397927f192ff60a39303))
* **activités:** affiche correctement les sections des activités dans le formulaire ([#245](https://github.com/MTES-MCT/camino-ui/issues/245)) ([3086de7](https://github.com/MTES-MCT/camino-ui/commit/3086de7c4663ecbf8f1942ff9d2dfe9b106a4c78))
* **statistiques:** corrige les libellés et ajoute les liens vers les titres ([#246](https://github.com/MTES-MCT/camino-ui/issues/246)) ([a7a63be](https://github.com/MTES-MCT/camino-ui/commit/a7a63becc7b4b10117bf8e40b07697b7a722d07f))
* édite les nouveaux champs d'unité ([0421c73](https://github.com/MTES-MCT/camino-ui/commit/0421c73913271142d769be826bd2f719270befb6))

### [0.22.57](https://github.com/MTES-MCT/camino-ui/compare/v0.22.56...v0.22.57) (2021-02-01)


### Features

* **activités:** prend en compte les documents optionnels ([#241](https://github.com/MTES-MCT/camino-ui/issues/241)) ([bcfe8e6](https://github.com/MTES-MCT/camino-ui/commit/bcfe8e6cb14dfefe19f8a15959ed2db30711edc9))

### [0.22.56](https://github.com/MTES-MCT/camino-ui/compare/v0.22.53...v0.22.56) (2021-01-25)


### Features

* **demarches:** conditionne l'affichage du bouton de création de démarches ([#229](https://github.com/MTES-MCT/camino-ui/issues/229)) ([014e02e](https://github.com/MTES-MCT/camino-ui/commit/014e02ebfdb77da34cbcdbcec2225ef845639d37))
* **édition d'étape:** sélectionne la date avant le type ([#237](https://github.com/MTES-MCT/camino-ui/issues/237)) ([5d274d5](https://github.com/MTES-MCT/camino-ui/commit/5d274d553d5443d46efd2f53816179a80552dd6f))
* **statistiques:** améliorer le rendu ([#233](https://github.com/MTES-MCT/camino-ui/issues/233)) ([320d720](https://github.com/MTES-MCT/camino-ui/commit/320d7209233cace81e89aea7ed1e4bee9f02d3c9))
* **statistiques:** corrige le commentaire introductif sur la page guyane ([#225](https://github.com/MTES-MCT/camino-ui/issues/225)) ([91183e5](https://github.com/MTES-MCT/camino-ui/commit/91183e5b47118cd167d70ae1ed9a86c52b79e6b4))
* **statistiques:** désactive l’affichage des statistiques des granulats marins ([ee84d7b](https://github.com/MTES-MCT/camino-ui/commit/ee84d7bb53d10ff2fbc508b42b53055ba01d37cf))
* édite les métas ([#224](https://github.com/MTES-MCT/camino-ui/issues/224)) ([75d1ff7](https://github.com/MTES-MCT/camino-ui/commit/75d1ff76f5e5f6f27fb6dd0be1d83f8b4408291b))


### Bug Fixes

* **document:** interverti les champs uri et url ([#236](https://github.com/MTES-MCT/camino-ui/issues/236)) ([4ad2035](https://github.com/MTES-MCT/camino-ui/commit/4ad20351956b0db69e3800e92655dd558f440a0e))
* **documents:** ajoute un bouton qui pointe vers les uri ([d55af9b](https://github.com/MTES-MCT/camino-ui/commit/d55af9bb6fc02ac9ef544f56cf44a74aea394ab2))
* **édition d'étape:** autorise l'édition de la date ([0aec1d6](https://github.com/MTES-MCT/camino-ui/commit/0aec1d678e610d216f1514b68f5e46c85b1bce3f))
* **entreprise:** empêche de choisir un amodiataire si il est titulaire ([#228](https://github.com/MTES-MCT/camino-ui/issues/228)) ([44b859b](https://github.com/MTES-MCT/camino-ui/commit/44b859b39767c8ff84f4ec7f4e6e26d9ce604f3f))
* **entreprises:** ne peut pas mettre 2 fois le même titulaires sur une étape ([#223](https://github.com/MTES-MCT/camino-ui/issues/223)) ([b2b2ad3](https://github.com/MTES-MCT/camino-ui/commit/b2b2ad30d2aa8d01e944437328651d1be5b1f84b))
* **étape:** initialise correctement le type d’étape lors de la modification d’une étape ([8102819](https://github.com/MTES-MCT/camino-ui/commit/8102819cee3c6f6aeb127b78530051ffbcd9a4c7))
* **statistiques:** corrige l'affichage des granulats marins ([#235](https://github.com/MTES-MCT/camino-ui/issues/235)) ([fcfa94e](https://github.com/MTES-MCT/camino-ui/commit/fcfa94e5aa0f5c295ed20761d41203b1963c0493))
* **statistiques:** corrige le libellé des surfaces sur les concessions ([#238](https://github.com/MTES-MCT/camino-ui/issues/238)) ([eae9e87](https://github.com/MTES-MCT/camino-ui/commit/eae9e87746fdf82faa3fbfd67471c083e2d3f918))
* **statistiques:** corrige le titre lde la page ([#239](https://github.com/MTES-MCT/camino-ui/issues/239)) ([05efe97](https://github.com/MTES-MCT/camino-ui/commit/05efe979955760348a7f6237daf3fec663a628c5))
* **statistiques:** corrige une faute d'orthographe ([#240](https://github.com/MTES-MCT/camino-ui/issues/240)) ([d66640f](https://github.com/MTES-MCT/camino-ui/commit/d66640f0063d0b47a4c3a358b7bd1ae43a6bbc4d))
* affiche l'arrière plan des périmètres de concessions f ([7390e65](https://github.com/MTES-MCT/camino-ui/commit/7390e651f65c1c4b9d3de7756f86e719b76e0e25))
* change l'icone d'un lien url ([dc9b185](https://github.com/MTES-MCT/camino-ui/commit/dc9b185d939d276533eedf5ae0321e91dbdd0e3a))
* corrige l'affichage des statistiques ([#234](https://github.com/MTES-MCT/camino-ui/issues/234)) ([c5a04b0](https://github.com/MTES-MCT/camino-ui/commit/c5a04b046e034d61e720e5900be180a015715b80))
* supprime l'édition de tables de jointure inutilisées ([9d1777f](https://github.com/MTES-MCT/camino-ui/commit/9d1777f687974385a5ac3652e95c6dff52989016))

### [0.22.55](https://github.com/MTES-MCT/camino-ui/compare/v0.22.54...v0.22.55) (2020-12-22)


### Features

* **demarches:** conditionne l'affichage du bouton de création de démarches ([#229](https://github.com/MTES-MCT/camino-ui/issues/229)) ([014e02e](https://github.com/MTES-MCT/camino-ui/commit/014e02ebfdb77da34cbcdbcec2225ef845639d37))
* **statistiques:** corrige le commentaire introductif sur la page guyane ([#225](https://github.com/MTES-MCT/camino-ui/issues/225)) ([91183e5](https://github.com/MTES-MCT/camino-ui/commit/91183e5b47118cd167d70ae1ed9a86c52b79e6b4))
* **statistiques:** désactive l’affichage des statistiques des granulats marins ([ee84d7b](https://github.com/MTES-MCT/camino-ui/commit/ee84d7bb53d10ff2fbc508b42b53055ba01d37cf))
* édite les métas ([#224](https://github.com/MTES-MCT/camino-ui/issues/224)) ([75d1ff7](https://github.com/MTES-MCT/camino-ui/commit/75d1ff76f5e5f6f27fb6dd0be1d83f8b4408291b))


### Bug Fixes

* **étape:** initialise correctement le type d’étape lors de la modification d’une étape ([8102819](https://github.com/MTES-MCT/camino-ui/commit/8102819cee3c6f6aeb127b78530051ffbcd9a4c7))
* supprime l'édition de tables de jointure inutilisées ([9d1777f](https://github.com/MTES-MCT/camino-ui/commit/9d1777f687974385a5ac3652e95c6dff52989016))
* **entreprise:** empêche de choisir un amodiataire si il est titulaire ([#228](https://github.com/MTES-MCT/camino-ui/issues/228)) ([44b859b](https://github.com/MTES-MCT/camino-ui/commit/44b859b39767c8ff84f4ec7f4e6e26d9ce604f3f))

### [0.22.54](https://github.com/MTES-MCT/camino-ui/compare/v0.22.53...v0.22.54) (2020-12-08)


### Bug Fixes

* affiche l'arrière plan des périmètres de concessions f ([7390e65](https://github.com/MTES-MCT/camino-ui/commit/7390e651f65c1c4b9d3de7756f86e719b76e0e25))
* **entreprises:** ne peut pas mettre 2 fois le même titulaires sur une étape ([#223](https://github.com/MTES-MCT/camino-ui/issues/223)) ([b2b2ad3](https://github.com/MTES-MCT/camino-ui/commit/b2b2ad30d2aa8d01e944437328651d1be5b1f84b))

### [0.22.53](https://github.com/MTES-MCT/camino-ui/compare/v0.22.52...v0.22.53) (2020-11-30)


### Bug Fixes

* corrige le motif du type inconnu ([2840a12](https://github.com/MTES-MCT/camino-ui/commit/2840a12e8d4479b1d98143ea28024afdf1d86fa8))

### [0.22.52](https://github.com/MTES-MCT/camino-ui/compare/v0.22.51...v0.22.52) (2020-11-30)


### Bug Fixes

* corrige le style des concessions f ([f2b3bde](https://github.com/MTES-MCT/camino-ui/commit/f2b3bdeed039304bdfcbae84f858cb545677493e))

### [0.22.51](https://github.com/MTES-MCT/camino-ui/compare/v0.22.50...v0.22.51) (2020-11-30)


### Features

* ajoute les styles des types et domaines inconnus ([#222](https://github.com/MTES-MCT/camino-ui/issues/222)) ([c7299e1](https://github.com/MTES-MCT/camino-ui/commit/c7299e1e088f8cd0935f0f00d4f57b408817cd8c))
* **carte:** utilise le centre du titre pour afficher les marqueurs ([#215](https://github.com/MTES-MCT/camino-ui/issues/215)) ([4a665fe](https://github.com/MTES-MCT/camino-ui/commit/4a665fe6832384a92a340b303d868490c53fac7f))
* affiche les marqueurs sur un canvas ([#220](https://github.com/MTES-MCT/camino-ui/issues/220)) ([471f140](https://github.com/MTES-MCT/camino-ui/commit/471f140975201e71f785c6f06cf2e4bafcd46e25))


### Bug Fixes

* corrige la modification d’une étape avec des entreprises archivées ([#221](https://github.com/MTES-MCT/camino-ui/issues/221)) ([f283ec5](https://github.com/MTES-MCT/camino-ui/commit/f283ec58cd84645e20c735507d4ab0fe32eb9ae2))

### [0.22.50](https://github.com/MTES-MCT/camino-ui/compare/v0.22.49...v0.22.50) (2020-11-19)


### Features

* **entreprise:** permet d’archiver une entreprise ([#213](https://github.com/MTES-MCT/camino-ui/issues/213)) ([ba95641](https://github.com/MTES-MCT/camino-ui/commit/ba95641e4e20f11f2c11c9c61cc776563a8480fb))
* **etapes:** pouvoir définir le type d’une propriété number ([#212](https://github.com/MTES-MCT/camino-ui/issues/212)) ([a61e6fd](https://github.com/MTES-MCT/camino-ui/commit/a61e6fde6ff08f6c92e700d95ea58871f1e3d651))
* ajoute des options 'integer' et 'negative' sur le champs nombre ([#211](https://github.com/MTES-MCT/camino-ui/issues/211)) ([80ed5d4](https://github.com/MTES-MCT/camino-ui/commit/80ed5d4b91c05970ca57f2c3849612e426f8e296))


### Bug Fixes

* **entreprises:** corrige le retour sur la liste des entreprises ([#219](https://github.com/MTES-MCT/camino-ui/issues/219)) ([5229572](https://github.com/MTES-MCT/camino-ui/commit/5229572ad5fe16b292148803de68d6c5c92f7ad9))
* corrige l'import d'un composant ([1335f8e](https://github.com/MTES-MCT/camino-ui/commit/1335f8e44ca68b65d7b6110cd313cb8c02c73f9d))

### [0.22.49](https://github.com/MTES-MCT/camino-ui/compare/v0.22.46...v0.22.49) (2020-11-04)


### Features

* **administration:** édite les permission ([#210](https://github.com/MTES-MCT/camino-ui/issues/210)) ([fc5645c](https://github.com/MTES-MCT/camino-ui/commit/fc5645c8dc8895563494fe5bed04aede080e9db4))
* ajoute les administrations ([#205](https://github.com/MTES-MCT/camino-ui/issues/205)) ([f3898ab](https://github.com/MTES-MCT/camino-ui/commit/f3898abc70b97bfd1f9b95479bcde26efbe9b916))
* édite une administration ([#208](https://github.com/MTES-MCT/camino-ui/issues/208)) ([1a9747d](https://github.com/MTES-MCT/camino-ui/commit/1a9747d191611c8cff05d390c455002ae8d54e80))
* **documents:** masque les boutons si l’utilisateur n’a pas les permissions ([#195](https://github.com/MTES-MCT/camino-ui/issues/195)) ([970816d](https://github.com/MTES-MCT/camino-ui/commit/970816d1852ce969bd7f6fb2ae357a965286145f))
* **sentry:** active Sentry et Matomo via des variables d’environnement ([#198](https://github.com/MTES-MCT/camino-ui/issues/198)) ([7ad575e](https://github.com/MTES-MCT/camino-ui/commit/7ad575eb93dd858f875929013aecc01109a01671))


### Bug Fixes

* affiche le nom complet des domaines dans le selecteur de permissions ([91da4d1](https://github.com/MTES-MCT/camino-ui/commit/91da4d1ea5bdea900dfd15a9a304af674a7bf80f))
* ajoute une icone pour le changement d'email ([9003235](https://github.com/MTES-MCT/camino-ui/commit/90032351cc3388306866bfa6c8c573d6a212dfc6))
* corrige l'enregistrement des activités ([#202](https://github.com/MTES-MCT/camino-ui/issues/202)) ([920d2ec](https://github.com/MTES-MCT/camino-ui/commit/920d2ec50035567e14add0179ef19f387fc5b0ae))
* corrige la CSP pour le chragement asynchrone ([3007449](https://github.com/MTES-MCT/camino-ui/commit/30074490197235f0b5aaf2c93e7d9e278bbfcd4c))
* corrige la csp pour les styles de chartjs ([c72f622](https://github.com/MTES-MCT/camino-ui/commit/c72f6229b24a7cae208c4257ae6bae022ac7a646))
* corrige la csp pour matomo ([2e2c71c](https://github.com/MTES-MCT/camino-ui/commit/2e2c71cce5ce3b5c8e4b41d325cedbc07ee632e5))
* corrige la liste d'administration lors de l'édition d'un utilisateur ([0f45ee6](https://github.com/MTES-MCT/camino-ui/commit/0f45ee667b012a27ba35d94bd337969efc4068a9))
* corrige la mise en page sur safari ([#200](https://github.com/MTES-MCT/camino-ui/issues/200)) ([f9e7d66](https://github.com/MTES-MCT/camino-ui/commit/f9e7d66e5ebc06f9a5d5ca0fe2c388e8f3ce37d1))
* corrige le selecteur de type d'administrations ([00a2670](https://github.com/MTES-MCT/camino-ui/commit/00a2670ee5311db31ac21a55383943ae88ee7cc5))
* corrige une faute de français ([29a221e](https://github.com/MTES-MCT/camino-ui/commit/29a221ee015c202d65442a195dc0d78be8ed0b6a))
* **api:** utilise le refreshToken sur les appels à l’API Rest qui échouent ([#203](https://github.com/MTES-MCT/camino-ui/issues/203)) ([4e54d81](https://github.com/MTES-MCT/camino-ui/commit/4e54d811f1c25fddfe07b62864ab2b38c34899c7))
* **nombre:** formate la saisie des nombres en français ([#192](https://github.com/MTES-MCT/camino-ui/issues/192)) ([981584f](https://github.com/MTES-MCT/camino-ui/commit/981584fc4dd50330436046b77145be1299458248))
* **nombres:** formater l'affichage des nombre au standard français ([#179](https://github.com/MTES-MCT/camino-ui/issues/179)) ([75473db](https://github.com/MTES-MCT/camino-ui/commit/75473db6117602fe012b16c90320d86819e291ce))
* **stats:** corrige une description ([#194](https://github.com/MTES-MCT/camino-ui/issues/194)) ([815bb08](https://github.com/MTES-MCT/camino-ui/commit/815bb08748794e7f008e5879e1ae8c91a3d20f7e))
* **utilisateur:** vérifie la nouvelle adresse email lors de sa modification ([#199](https://github.com/MTES-MCT/camino-ui/issues/199)) ([c0f37dd](https://github.com/MTES-MCT/camino-ui/commit/c0f37ddab0b39f6038fcea6fc00d0e83808dc36a))

### [0.22.48](https://github.com/MTES-MCT/camino-ui/compare/v0.22.47...v0.22.48) (2020-10-20)


### Features

* ajoute les administrations ([#205](https://github.com/MTES-MCT/camino-ui/issues/205)) ([f3898ab](https://github.com/MTES-MCT/camino-ui/commit/f3898abc70b97bfd1f9b95479bcde26efbe9b916))


### Bug Fixes

* corrige la liste d'administration lors de l'édition d'un utilisateur ([0f45ee6](https://github.com/MTES-MCT/camino-ui/commit/0f45ee667b012a27ba35d94bd337969efc4068a9))
* corrige une faute de français ([29a221e](https://github.com/MTES-MCT/camino-ui/commit/29a221ee015c202d65442a195dc0d78be8ed0b6a))
* **api:** utilise le refreshToken sur les appels à l’API Rest qui échouent ([#203](https://github.com/MTES-MCT/camino-ui/issues/203)) ([4e54d81](https://github.com/MTES-MCT/camino-ui/commit/4e54d811f1c25fddfe07b62864ab2b38c34899c7))
* corrige l'enregistrement des activités ([#202](https://github.com/MTES-MCT/camino-ui/issues/202)) ([920d2ec](https://github.com/MTES-MCT/camino-ui/commit/920d2ec50035567e14add0179ef19f387fc5b0ae))
* corrige la CSP pour le chragement asynchrone ([3007449](https://github.com/MTES-MCT/camino-ui/commit/30074490197235f0b5aaf2c93e7d9e278bbfcd4c))
* corrige la mise en page sur safari ([#200](https://github.com/MTES-MCT/camino-ui/issues/200)) ([f9e7d66](https://github.com/MTES-MCT/camino-ui/commit/f9e7d66e5ebc06f9a5d5ca0fe2c388e8f3ce37d1))

### [0.22.47](https://github.com/MTES-MCT/camino-ui/compare/v0.22.46...v0.22.47) (2020-10-07)


### Features

* **documents:** masque les boutons si l’utilisateur n’a pas les permissions ([#195](https://github.com/MTES-MCT/camino-ui/issues/195)) ([970816d](https://github.com/MTES-MCT/camino-ui/commit/970816d1852ce969bd7f6fb2ae357a965286145f))
* **sentry:** active Sentry et Matomo via des variables d’environnement ([#198](https://github.com/MTES-MCT/camino-ui/issues/198)) ([7ad575e](https://github.com/MTES-MCT/camino-ui/commit/7ad575eb93dd858f875929013aecc01109a01671))


### Bug Fixes

* ajoute une icone pour le changement d'email ([9003235](https://github.com/MTES-MCT/camino-ui/commit/90032351cc3388306866bfa6c8c573d6a212dfc6))
* corrige la csp pour les styles de chartjs ([c72f622](https://github.com/MTES-MCT/camino-ui/commit/c72f6229b24a7cae208c4257ae6bae022ac7a646))
* **nombre:** formate la saisie des nombres en français ([#192](https://github.com/MTES-MCT/camino-ui/issues/192)) ([981584f](https://github.com/MTES-MCT/camino-ui/commit/981584fc4dd50330436046b77145be1299458248))
* **stats:** corrige une description ([#194](https://github.com/MTES-MCT/camino-ui/issues/194)) ([815bb08](https://github.com/MTES-MCT/camino-ui/commit/815bb08748794e7f008e5879e1ae8c91a3d20f7e))
* **utilisateur:** vérifie la nouvelle adresse email lors de sa modification ([#199](https://github.com/MTES-MCT/camino-ui/issues/199)) ([c0f37dd](https://github.com/MTES-MCT/camino-ui/commit/c0f37ddab0b39f6038fcea6fc00d0e83808dc36a))
* corrige la csp pour matomo ([2e2c71c](https://github.com/MTES-MCT/camino-ui/commit/2e2c71cce5ce3b5c8e4b41d325cedbc07ee632e5))
* **nombres:** formater l'affichage des nombre au standard français ([#179](https://github.com/MTES-MCT/camino-ui/issues/179)) ([75473db](https://github.com/MTES-MCT/camino-ui/commit/75473db6117602fe012b16c90320d86819e291ce))

### [0.22.46](https://github.com/MTES-MCT/camino-ui/compare/v0.22.45...v0.22.46) (2020-09-29)


### Features

* met à jour le logo de l'état ([#188](https://github.com/MTES-MCT/camino-ui/issues/188)) ([5afa5e0](https://github.com/MTES-MCT/camino-ui/commit/5afa5e007d4fc12eaf94f20db1243a1482de4a29))
* ouvre une section lorsqu'elle est modifiée ([#187](https://github.com/MTES-MCT/camino-ui/issues/187)) ([cf63db3](https://github.com/MTES-MCT/camino-ui/commit/cf63db3670b36de0948561c69605706774899a62))
* **documents:** accepte des .pdf jusqu'à 30 mo ([#183](https://github.com/MTES-MCT/camino-ui/issues/183)) ([d14cdca](https://github.com/MTES-MCT/camino-ui/commit/d14cdca98ba5434ddbb3d48fbe84c3034209c907))
* **forêts:** affiche le nom des forêts sur chaque titre ([#184](https://github.com/MTES-MCT/camino-ui/issues/184)) ([fcbc017](https://github.com/MTES-MCT/camino-ui/commit/fcbc0179e443f9bd95b9a55f3eb0bf7b4faa8c65))
* **sécurité:** ajoute la gestion du refresh token ([#177](https://github.com/MTES-MCT/camino-ui/issues/177)) ([9398e1a](https://github.com/MTES-MCT/camino-ui/commit/9398e1a6e49a73b6585e91055adf95791b4f9944))
* **statistique:** change le libellé des champs surface ([#181](https://github.com/MTES-MCT/camino-ui/issues/181)) ([4cce082](https://github.com/MTES-MCT/camino-ui/commit/4cce0825e261df0ccde508e943785c9fdff9176c))


### Bug Fixes

* corrige l'affichage du selecteur et des onglets ([#182](https://github.com/MTES-MCT/camino-ui/issues/182)) ([a609109](https://github.com/MTES-MCT/camino-ui/commit/a60910929918f18f1e3c274aea5a7d391e18df16))
* corrige la saisie de d'étape de travaux ([5c2e5d4](https://github.com/MTES-MCT/camino-ui/commit/5c2e5d42619e0b8085aad188bcaa01d722d620be))
* corrige la saisie des nombres ([417bc7b](https://github.com/MTES-MCT/camino-ui/commit/417bc7b273b17706218ff6e522f8a634198b8556))
* corrige la saisie des nombres sur les vieux Firefox ([#186](https://github.com/MTES-MCT/camino-ui/issues/186)) ([3b997aa](https://github.com/MTES-MCT/camino-ui/commit/3b997aa83742e8f7476e20d6d4c15024bd2281ac))
* corrige la saisie des nombres sur les vieux Firefox ([#189](https://github.com/MTES-MCT/camino-ui/issues/189)) ([181862a](https://github.com/MTES-MCT/camino-ui/commit/181862a9260ddcd855441cce19d938953687ca14))
* corrige la visibilité d'un document d'entreprise ([5d1895d](https://github.com/MTES-MCT/camino-ui/commit/5d1895de41b9bcb2962bb05db9e7cf2eae89a5ba))
* corrige les accès direct sur la page des titres ([#180](https://github.com/MTES-MCT/camino-ui/issues/180)) ([6490ebb](https://github.com/MTES-MCT/camino-ui/commit/6490ebb03a5360151495fbb98a0fc1570ea484e5))
* corrige une erreur lors de la selection d'étapes incluses ([afa1a7d](https://github.com/MTES-MCT/camino-ui/commit/afa1a7d044f73f4c68508c5f610880b30fc6f1e9))
* désactive l'élément "statistique" du menu ([#178](https://github.com/MTES-MCT/camino-ui/issues/178)) ([97f731a](https://github.com/MTES-MCT/camino-ui/commit/97f731aa069a543d4a2dd48b478e15c04c2569ea))
* vérifie les types des paramètres d'url ([711f269](https://github.com/MTES-MCT/camino-ui/commit/711f269d57c60b3bba3cf1cdf986ea41c5372a76))
* **authentification:** corrige la création de son compte ([#185](https://github.com/MTES-MCT/camino-ui/issues/185)) ([1a5aa94](https://github.com/MTES-MCT/camino-ui/commit/1a5aa94a9c9f7a40298ad3f2661a77f00e04901e))

### [0.22.45](https://github.com/MTES-MCT/camino-ui/compare/v0.22.43...v0.22.45) (2020-09-18)


### Features

* affiches une page statistiques Guyane ([#170](https://github.com/MTES-MCT/camino-ui/issues/170)) ([53d7932](https://github.com/MTES-MCT/camino-ui/commit/53d793246ff08e2b59b803736f66e333674cfb02))
* **carte:** ajoute un bouton pour cadrer tous les marqueurs ([#169](https://github.com/MTES-MCT/camino-ui/issues/169)) ([e9f6922](https://github.com/MTES-MCT/camino-ui/commit/e9f69225b6b0b05981b133666b474492c2fa3952))
* affiche les filtres actifs ([#168](https://github.com/MTES-MCT/camino-ui/issues/168)) ([caa69e1](https://github.com/MTES-MCT/camino-ui/commit/caa69e1ab668f00685a764fcd90f31a65c2fcc3a))
* **filtres:** ajoute un bouton qui permet de réinitialiser les filtres ([#163](https://github.com/MTES-MCT/camino-ui/issues/163)) ([7d555bc](https://github.com/MTES-MCT/camino-ui/commit/7d555bc35663258f45efa579ef42a9451b45d917))
* **geo:** gère les virgules et les espaces quand l'utilisateur saisit des coordonnées décimales ([#166](https://github.com/MTES-MCT/camino-ui/issues/166)) ([ef43949](https://github.com/MTES-MCT/camino-ui/commit/ef43949496ec2f1a53e7af893905a2229f926b08))
* **stats:** améliore la page statistiques ([#159](https://github.com/MTES-MCT/camino-ui/issues/159)) ([5060cad](https://github.com/MTES-MCT/camino-ui/commit/5060cada6b1e2f0d4dc7d347ab617f2bf7a49949))
* ajoute Nicolas Petitot dans l'équipe ([#161](https://github.com/MTES-MCT/camino-ui/issues/161)) ([538d51b](https://github.com/MTES-MCT/camino-ui/commit/538d51baf018d9cc8c7e9ef2066d4c64f76d5bbd))


### Bug Fixes

* **statistiques:** corrige l’unité de la statistique Protection de l’environnement ([25c6ef4](https://github.com/MTES-MCT/camino-ui/commit/25c6ef4860eb21dd0f02670c66ef42f1b7b48960))
* affiche l'étiquette des étapes incluses et exclues ([#172](https://github.com/MTES-MCT/camino-ui/issues/172)) ([fa2d3ad](https://github.com/MTES-MCT/camino-ui/commit/fa2d3adcb7d4e19167ef983d52b4b59a946b760f))
* corrige des fautes remarques ([e828c5d](https://github.com/MTES-MCT/camino-ui/commit/e828c5d4a3e2c6b7653bbdfc3d7a87a98924d1f5))
* corrige l'affichage des statistiques ([#176](https://github.com/MTES-MCT/camino-ui/issues/176)) ([24d47c4](https://github.com/MTES-MCT/camino-ui/commit/24d47c4fa668c23e1875d07744a20bd471b2abff))
* corrige la mise en page des statistiques ([#175](https://github.com/MTES-MCT/camino-ui/issues/175)) ([d7e35d4](https://github.com/MTES-MCT/camino-ui/commit/d7e35d4fc8ab8306916509b888f34e12020aba83))
* **activité:** corrige le dépot des rapports d’activités qui n’ont pas de document ([#160](https://github.com/MTES-MCT/camino-ui/issues/160)) ([71b7854](https://github.com/MTES-MCT/camino-ui/commit/71b78541ba466908a5c5f9076068b92fd3e8fc37))
* **coordonnées:** enlève la valeur par défaut ([#171](https://github.com/MTES-MCT/camino-ui/issues/171)) ([286a1ea](https://github.com/MTES-MCT/camino-ui/commit/286a1ea4f620a94dc4874f925578f8cb4393f682))
* **démarches:** améliore l’affichage des filtres d’étapes ([#174](https://github.com/MTES-MCT/camino-ui/issues/174)) ([9f9f15a](https://github.com/MTES-MCT/camino-ui/commit/9f9f15af22fae4e17ab17f07ff1b2b1a489fdb2f))
* corrige l'affichage des pages stats ([45a73fc](https://github.com/MTES-MCT/camino-ui/commit/45a73fcc8691911dd9ab6fa194bf3e27ad131eb2))
* **activité:** permet de valider les rapports d’activités où tous les champs sont optionnels ([#162](https://github.com/MTES-MCT/camino-ui/issues/162)) ([e5d167a](https://github.com/MTES-MCT/camino-ui/commit/e5d167aba3ed6d266f52102b6bc1a6b23b86355d))
* **stats:** améliore la page statistiques ([#164](https://github.com/MTES-MCT/camino-ui/issues/164)) ([2721bd2](https://github.com/MTES-MCT/camino-ui/commit/2721bd25ba4c81cbf39ea22ebb6fbe502b58068a))

### [0.22.44](https://github.com/MTES-MCT/camino-ui/compare/v0.22.43...v0.22.44) (2020-08-27)


### Features

* ajoute Nicolas Petitot dans l'équipe ([#161](https://github.com/MTES-MCT/camino-ui/issues/161)) ([538d51b](https://github.com/MTES-MCT/camino-ui/commit/538d51baf018d9cc8c7e9ef2066d4c64f76d5bbd))


### Bug Fixes

* **activité:** corrige le dépot des rapports d’activités qui n’ont pas de document ([#160](https://github.com/MTES-MCT/camino-ui/issues/160)) ([71b7854](https://github.com/MTES-MCT/camino-ui/commit/71b78541ba466908a5c5f9076068b92fd3e8fc37))
* **activité:** permet de valider les rapports d’activités où tous les champs sont optionnels ([#162](https://github.com/MTES-MCT/camino-ui/issues/162)) ([e5d167a](https://github.com/MTES-MCT/camino-ui/commit/e5d167aba3ed6d266f52102b6bc1a6b23b86355d))

### [0.22.43](https://github.com/MTES-MCT/camino-ui/compare/v0.22.42...v0.22.43) (2020-08-04)


### Features

* ajoute les travaux ([#156](https://github.com/MTES-MCT/camino-ui/issues/156)) ([799ad37](https://github.com/MTES-MCT/camino-ui/commit/799ad374eb7b7db7f3cb28bd5fa88a84a2c8a378))
* **activités:** ajoute des documents lors de l'enregistrement ([a43852c](https://github.com/MTES-MCT/camino-ui/commit/a43852c9f84ba9b786c2bcfd73d406fe6629a7f3))


### Bug Fixes

* **activité:** masque le bouton d'ajout de document ([506a472](https://github.com/MTES-MCT/camino-ui/commit/506a4726f7435b3dd775acf1b00001ce98571480))
* **date:** change la date maximum du selecteur ([f99091a](https://github.com/MTES-MCT/camino-ui/commit/f99091a0a5cd61866184ed7924181e1a3aa1cbef))
* corrige l'upload ([6d048d4](https://github.com/MTES-MCT/camino-ui/commit/6d048d4fb86c3a4a0aea20e093c53db32ea18a2e))
* corrige les pages 404 ([8203e97](https://github.com/MTES-MCT/camino-ui/commit/8203e97305b8f2e7af332e7a8818e7d58dde8ab4))

### [0.22.42](https://github.com/MTES-MCT/camino-ui/compare/v0.22.40...v0.22.42) (2020-07-23)


### Features

* enregistre l'ordre des substances ([316b172](https://github.com/MTES-MCT/camino-ui/commit/316b17227cd5f48bbda745f0174e3d320168c258))


### Bug Fixes

* corrige le téléchargement des documents ([b8dca70](https://github.com/MTES-MCT/camino-ui/commit/b8dca701052c220787fee266a0168c723797d071))

### [0.22.41](https://github.com/MTES-MCT/camino-ui/compare/v0.22.40...v0.22.41) (2020-07-22)

### [0.22.40](https://github.com/MTES-MCT/camino-ui/compare/v0.22.39...v0.22.40) (2020-07-22)

### [0.22.39](https://github.com/MTES-MCT/camino-ui/compare/v0.22.37...v0.22.39) (2020-07-22)


### Features

* **activités:** ajoute des filtres ([#144](https://github.com/MTES-MCT/camino-ui/issues/144)) ([2541dd7](https://github.com/MTES-MCT/camino-ui/commit/2541dd7025e80aba85e3e5de34b97bbd07cbb7ce))


### Bug Fixes

* affiche un message d'erreur explicite si l'api ne répond pas ([18117fb](https://github.com/MTES-MCT/camino-ui/commit/18117fbfb48b67c6c2c75b17d873f14edd1777dd))
* **filtres:**  corrige une erreur "navigation redondante" ([#146](https://github.com/MTES-MCT/camino-ui/issues/146)) ([a751573](https://github.com/MTES-MCT/camino-ui/commit/a7515734f43f5f26faa5800956acae42f750703b))
* **footer:** renomme le lien vers la documentation ([#147](https://github.com/MTES-MCT/camino-ui/issues/147)) ([ec945e8](https://github.com/MTES-MCT/camino-ui/commit/ec945e842ad0318cdebf51adae895d4b82bb6d35))
* **glossaire:** corrige la couleur des statuts de titre ([#148](https://github.com/MTES-MCT/camino-ui/issues/148)) ([1a40c00](https://github.com/MTES-MCT/camino-ui/commit/1a40c00dbc35d86de5b4e62995e9d335d4abb7f8))

### [0.22.38](https://github.com/MTES-MCT/camino-ui/compare/v0.22.37...v0.22.38) (2020-07-15)


### Features

* **activités:** ajoute des filtres ([#144](https://github.com/MTES-MCT/camino-ui/issues/144)) ([2541dd7](https://github.com/MTES-MCT/camino-ui/commit/2541dd7025e80aba85e3e5de34b97bbd07cbb7ce))


### Bug Fixes

* **filtres:**  corrige une erreur "navigation redondante" ([#146](https://github.com/MTES-MCT/camino-ui/issues/146)) ([a751573](https://github.com/MTES-MCT/camino-ui/commit/a7515734f43f5f26faa5800956acae42f750703b))
* **footer:** renomme le lien vers la documentation ([#147](https://github.com/MTES-MCT/camino-ui/issues/147)) ([ec945e8](https://github.com/MTES-MCT/camino-ui/commit/ec945e842ad0318cdebf51adae895d4b82bb6d35))
* **glossaire:** corrige la couleur des statuts de titre ([#148](https://github.com/MTES-MCT/camino-ui/issues/148)) ([1a40c00](https://github.com/MTES-MCT/camino-ui/commit/1a40c00dbc35d86de5b4e62995e9d335d4abb7f8))

### [0.22.37](https://github.com/MTES-MCT/camino-ui/compare/v0.22.36...v0.22.37) (2020-07-01)


### Features

* récupère la couleur des statuts des démarches ([#145](https://github.com/MTES-MCT/camino-ui/issues/145)) ([29ab1e6](https://github.com/MTES-MCT/camino-ui/commit/29ab1e6bb5d6d3ca8c0518916785046d9e776242))
* **documentation:** ajoute un lien dans le footer ([#143](https://github.com/MTES-MCT/camino-ui/issues/143)) ([a244efa](https://github.com/MTES-MCT/camino-ui/commit/a244efa47eb2a3b48ed3dca5cbf70a5a2cc3e4d5))
* **glossaire:** ajoute un sommaire et met en page ([#138](https://github.com/MTES-MCT/camino-ui/issues/138)) ([ec05ec5](https://github.com/MTES-MCT/camino-ui/commit/ec05ec5395b75fd41dc126b7e610ac5523a6bcbb))
* **titres:** ajoute la pagination côté serveur sur la liste de titres ([#131](https://github.com/MTES-MCT/camino-ui/issues/131)) ([1d0f1be](https://github.com/MTES-MCT/camino-ui/commit/1d0f1bec5817011cbf61c944f8708294c18b417d))
* **titres:** requête les titres dans un périmètre ([#136](https://github.com/MTES-MCT/camino-ui/issues/136)) ([40b9076](https://github.com/MTES-MCT/camino-ui/commit/40b9076595bdeeea8f0017ff1046c19718c59d0c))


### Bug Fixes

* met en forme les listes ([77100f2](https://github.com/MTES-MCT/camino-ui/commit/77100f2063837cbbc014a408b23342e7289510d8))
* **carte:** corrige une erreur sur les motifs ([f71aa23](https://github.com/MTES-MCT/camino-ui/commit/f71aa23f2e0279537c6293c14a3a7f62f12d8174))
* **documents:** corrige l'affichage de l'étiquette ([680a07b](https://github.com/MTES-MCT/camino-ui/commit/680a07b24b59898f358ef29ca94993be8ef9eb59))
* **documents:** n'affiche l'étiquette que si le parent est modifiable ([#135](https://github.com/MTES-MCT/camino-ui/issues/135)) ([bf97b64](https://github.com/MTES-MCT/camino-ui/commit/bf97b6417fc82722922b434b5c3db7dfa9d36b3a))
* **entreprise:** corrige une erreur sur la liste de titre ([340bf66](https://github.com/MTES-MCT/camino-ui/commit/340bf6625f7dc5903f1c12c5ab8e700a97f40282))
* **titres:** empêche de changer de vue pendant le chargement ([#141](https://github.com/MTES-MCT/camino-ui/issues/141)) ([201ba07](https://github.com/MTES-MCT/camino-ui/commit/201ba070c3ba5717c18035a7d1eaed712b0c2d13))
* **ui:** corrige une erreur bloquante sur IE11 ([#142](https://github.com/MTES-MCT/camino-ui/issues/142)) ([17d0854](https://github.com/MTES-MCT/camino-ui/commit/17d08549044443d4a60c79d5bcb87e664e2e9eb5))
* corrige le chargement des pages ([#140](https://github.com/MTES-MCT/camino-ui/issues/140)) ([7a3737d](https://github.com/MTES-MCT/camino-ui/commit/7a3737d20c8a3436d9284e6a4febded0db7b0358))
* modifie le lien vers la documentation des flux ([#134](https://github.com/MTES-MCT/camino-ui/issues/134)) ([f2906e5](https://github.com/MTES-MCT/camino-ui/commit/f2906e5510a0716b25bb36737b4fa2c2da584034))
* recharge les titres lorsque la position sur la carte change ([#137](https://github.com/MTES-MCT/camino-ui/issues/137)) ([19bba1b](https://github.com/MTES-MCT/camino-ui/commit/19bba1b157f6043841458fb84f7e14b5dbaeb72d))
* **titres:** corrige l'affichage de la table ([5be4604](https://github.com/MTES-MCT/camino-ui/commit/5be4604abcf5a66eea4b60c92f17a931820ab76d))

### [0.22.36](https://github.com/MTES-MCT/camino-ui/compare/v0.22.35...v0.22.36) (2020-06-17)


### Features

* **carte:** affiche le nom du titulaire sur un titre ([3de3459](https://github.com/MTES-MCT/camino-ui/commit/3de3459b217d8e81d98efe04e7dac8a5e4057a3e))
* **carte:** propose une option pour désactiver les marqueurs ([87a8468](https://github.com/MTES-MCT/camino-ui/commit/87a84682ed82469d0ff9e982b4c34531c4eee26a))
* crée un nouveau sélecteur de date ([#130](https://github.com/MTES-MCT/camino-ui/issues/130)) ([9911e66](https://github.com/MTES-MCT/camino-ui/commit/9911e662d31043bc72d0b3f55207f6e8f662043c))
* **utilisateurs:** rassemble les champs 'noms' et 'prénoms' du filtre en un seul champ ([#129](https://github.com/MTES-MCT/camino-ui/issues/129)) ([f8f2a1b](https://github.com/MTES-MCT/camino-ui/commit/f8f2a1bf9f97152b3fda07e7742c67cc387f6bfa))


### Bug Fixes

* **activités:** corrige une erreur lorsqu'un champs numérique est vide ([#132](https://github.com/MTES-MCT/camino-ui/issues/132)) ([28ee7f4](https://github.com/MTES-MCT/camino-ui/commit/28ee7f4c63afef097082b6c448fa344b14608996))
* **document:** corrige une erreur lors du choix de la visibilité ([371b6ab](https://github.com/MTES-MCT/camino-ui/commit/371b6ab0839250f5e8767ea96538e21058eb24e2))
* corrige une erreur lors du rechargement d'une page titre ([bf6803f](https://github.com/MTES-MCT/camino-ui/commit/bf6803fa1918c22f5f84489ee493d46491361ec7))

### [0.22.35](https://github.com/MTES-MCT/camino-ui/compare/v0.22.34...v0.22.35) (2020-06-10)


### Features

* ajoute une page glossaire ([#124](https://github.com/MTES-MCT/camino-ui/issues/124)) ([3c01fe2](https://github.com/MTES-MCT/camino-ui/commit/3c01fe21c9cfa7033a24284889098f37c6cb3991))
* **activités:** ajoute le filtre par statut de rapport d'activité ([#120](https://github.com/MTES-MCT/camino-ui/issues/120)) ([b99fd6b](https://github.com/MTES-MCT/camino-ui/commit/b99fd6bd2555027a7a9939af8d3753c3e5cf51cc))
* ajoute des documents sur les entreprises et activités ([#121](https://github.com/MTES-MCT/camino-ui/issues/121)) ([f6b7992](https://github.com/MTES-MCT/camino-ui/commit/f6b7992cf16e538dd2c75bbd37308e1a86e4adef))


### Bug Fixes

* corirge l'orthographe de `inclus` ([#126](https://github.com/MTES-MCT/camino-ui/issues/126)) ([5d52a5f](https://github.com/MTES-MCT/camino-ui/commit/5d52a5f89fcd2d9c741fd25c19b3937db043ac46))
* corrige l'édition des documents pour les entreprises ([9fbcd74](https://github.com/MTES-MCT/camino-ui/commit/9fbcd740980d1c5d6b98a4761bd8ce973a1df06e))
* corrige une erreur de permissions lors de l'ajout d'un document ([04b089f](https://github.com/MTES-MCT/camino-ui/commit/04b089f8c26c1a8248e3592e6def588c130156c5))
* **démarches:** affiche le bouton "téléchargements" ([#127](https://github.com/MTES-MCT/camino-ui/issues/127)) ([9278101](https://github.com/MTES-MCT/camino-ui/commit/9278101f717d0893fd2478b8789fe7c86c216d6e))
* **filtres:** corrige une erreur sur les cases à cocher ([#123](https://github.com/MTES-MCT/camino-ui/issues/123)) ([66f7d0b](https://github.com/MTES-MCT/camino-ui/commit/66f7d0b8e50268ed99b8216b7248c6b8786970e1))
* **stats:** corrige le format de rendu des mots-clés de recherche ([#122](https://github.com/MTES-MCT/camino-ui/issues/122)) ([569c117](https://github.com/MTES-MCT/camino-ui/commit/569c117da9ed98aa85cf3ffb1ac4c669cf06a48e))

### [0.22.34](https://github.com/MTES-MCT/camino-ui/compare/v0.22.33...v0.22.34) (2020-06-02)


### Bug Fixes

* **matomo:** corrige le tracking des recherches ([#116](https://github.com/MTES-MCT/camino-ui/issues/116)) ([40d020b](https://github.com/MTES-MCT/camino-ui/commit/40d020b8dd8645f8088fc59a6c42006d5084a674))
* affiche une erreur si un utilisateur déconnecté visite les pages `activités` et `utilisateurs` ([168333b](https://github.com/MTES-MCT/camino-ui/commit/168333b4472dd4a074b47acc816a0f4484157156))

### [0.22.33](https://github.com/MTES-MCT/camino-ui/compare/v0.22.32...v0.22.33) (2020-05-20)


### Features

* **activités:** ajoute des filtres par noms, entreprises, etc. ([#111](https://github.com/MTES-MCT/camino-ui/issues/111)) ([97a1af9](https://github.com/MTES-MCT/camino-ui/commit/97a1af9993439ad4cc7131d8170c02e204a639af))
* **entreprises:** gère les paramètres d'url ([#104](https://github.com/MTES-MCT/camino-ui/issues/104)) ([a845087](https://github.com/MTES-MCT/camino-ui/commit/a84508715908d3f3a11403d5094777b496fe14fa))
* **footer:** ajoute un lien vers les tuto vidéos ([#110](https://github.com/MTES-MCT/camino-ui/issues/110)) ([e5dd61a](https://github.com/MTES-MCT/camino-ui/commit/e5dd61afc1dc8e6d6a32a746cc08e5d3a3da8c10))
* **matomo:** améliore le paramétrage de Matomo ([#107](https://github.com/MTES-MCT/camino-ui/issues/107)) ([540241c](https://github.com/MTES-MCT/camino-ui/commit/540241c1116da2ff747ea1379c0bff80af7cac1c))
* renomme les listes d'entreprises et d'activités en 'elements' ([#113](https://github.com/MTES-MCT/camino-ui/issues/113)) ([74c4b38](https://github.com/MTES-MCT/camino-ui/commit/74c4b38ee129dfc52e091b00556d8187baf67b24))


### Bug Fixes

* ajoute un fond sur les champs du formulaire de création de compte ([6173769](https://github.com/MTES-MCT/camino-ui/commit/617376913ab8035918afb867f32576112a41e10a))
* corrige des problèmes d'affichage ([627756c](https://github.com/MTES-MCT/camino-ui/commit/627756c9e30bb9503eeca91f93ab3134b0f13656))
* corrige l'édition d'utilisateur et d'étape ([7824d05](https://github.com/MTES-MCT/camino-ui/commit/7824d0507521127b2eca52210f07114427dfcc3b))
* **activité:** recharge la page après la mise à jour ([#115](https://github.com/MTES-MCT/camino-ui/issues/115)) ([d81eb5f](https://github.com/MTES-MCT/camino-ui/commit/d81eb5f8065cc536659430fbf3d5b47e7f79cb69))
* **carto:** rend visible le motif des autorisations de recherche ([cc44335](https://github.com/MTES-MCT/camino-ui/commit/cc44335fa0d03b33c8bc99ef6a3b4d7946fb8a88))
* **documents:** empêche d'enregistrer si aucun type n'est sélectionné ([#112](https://github.com/MTES-MCT/camino-ui/issues/112)) ([46fcf95](https://github.com/MTES-MCT/camino-ui/commit/46fcf9597328f522079d3198e0140098490f9c73))
* **menu:** désactive le lien lorsqu'on est sur la page correspondante ([4fc6651](https://github.com/MTES-MCT/camino-ui/commit/4fc6651109c4c158c4a343b4c1a342b3d10c38f5))

### [0.22.32](https://github.com/MTES-MCT/camino-ui/compare/v0.22.29...v0.22.32) (2020-05-18)


### Features

* **utilisateurs:** gère les paramètres d'url ([#105](https://github.com/MTES-MCT/camino-ui/issues/105)) ([566d805](https://github.com/MTES-MCT/camino-ui/commit/566d805105aa517ebf63b819d22703ceaca22050))
* télécharge les exports de données côté serveur ([#103](https://github.com/MTES-MCT/camino-ui/issues/103)) ([e7a87a4](https://github.com/MTES-MCT/camino-ui/commit/e7a87a4ba8a632a46da37cdf48dfacbec7495c84))
* **démarches:** filtre par nom de titres, titulaires, substances, etc. ([#102](https://github.com/MTES-MCT/camino-ui/issues/102)) ([c4f84df](https://github.com/MTES-MCT/camino-ui/commit/c4f84df3487a181a8687c32f6bd647347c2cacfc))
* **design:** améliore le style des statuts ([33892ab](https://github.com/MTES-MCT/camino-ui/commit/33892ab024880d5c1c471bbeeac4ed15af6bf15b))
* ajoute le statut dans l'étiquette du titre ([24b69d3](https://github.com/MTES-MCT/camino-ui/commit/24b69d310e70a1304aaea4676bca4024c4f0839d))
* optimise la hiérarchie des informations ([#100](https://github.com/MTES-MCT/camino-ui/issues/100)) ([eda6b69](https://github.com/MTES-MCT/camino-ui/commit/eda6b6935ed948b1ecbd8067adb3ad5fe8d9d961))
* **activités:** gère les paramètres d'url ([#97](https://github.com/MTES-MCT/camino-ui/issues/97)) ([210488b](https://github.com/MTES-MCT/camino-ui/commit/210488bc8566585d1b38ddc76d2b0e9163386ccc))


### Bug Fixes

* **utilisateurs:** corrige le paramètre des permissions ([#108](https://github.com/MTES-MCT/camino-ui/issues/108)) ([44f192a](https://github.com/MTES-MCT/camino-ui/commit/44f192a26a087cc46eb5f5381823dd3285877d6b))
* corrige le tri des démarches ([#106](https://github.com/MTES-MCT/camino-ui/issues/106)) ([54a3f23](https://github.com/MTES-MCT/camino-ui/commit/54a3f23fccc7d3b7f56895a1309fbc7294f4bb7a))
* **design:** affiche la date en dehors du statut sur les étapes ([9844b80](https://github.com/MTES-MCT/camino-ui/commit/9844b80fbbc8078fe832580dd874fdbdb88c14a8))
* **design:** corrige des problèmes de lisibilité ([ad3eeb9](https://github.com/MTES-MCT/camino-ui/commit/ad3eeb9bfeea3bc3c3bea07aae8dbaeddc359edf))
* **utilisateur:** recharge la page si l'id change ([ad7d432](https://github.com/MTES-MCT/camino-ui/commit/ad7d43235760a9ab31710a36442c0c49fd16a374))
* corrige des problèmes d'affichage ([226e602](https://github.com/MTES-MCT/camino-ui/commit/226e6021871388f368c6b0cb13e6a50b2584745c))
* uniformise les marges ([c093486](https://github.com/MTES-MCT/camino-ui/commit/c093486dbf8921482c91a94450f509dc489af886))

### [0.22.31](https://github.com/MTES-MCT/camino-ui/compare/v0.22.30...v0.22.31) (2020-05-12)


### Features

* télécharge les exports de données côté serveur ([#103](https://github.com/MTES-MCT/camino-ui/issues/103)) ([e7a87a4](https://github.com/MTES-MCT/camino-ui/commit/e7a87a4ba8a632a46da37cdf48dfacbec7495c84))
* **démarches:** filtre par nom de titres, titulaires, substances, etc. ([#102](https://github.com/MTES-MCT/camino-ui/issues/102)) ([c4f84df](https://github.com/MTES-MCT/camino-ui/commit/c4f84df3487a181a8687c32f6bd647347c2cacfc))


### Bug Fixes

* corrige le tri des démarches ([#106](https://github.com/MTES-MCT/camino-ui/issues/106)) ([54a3f23](https://github.com/MTES-MCT/camino-ui/commit/54a3f23fccc7d3b7f56895a1309fbc7294f4bb7a))

### [0.22.30](https://github.com/MTES-MCT/camino-ui/compare/v0.22.29...v0.22.30) (2020-05-05)


### Features

* **design:** améliore le style des statuts ([33892ab](https://github.com/MTES-MCT/camino-ui/commit/33892ab024880d5c1c471bbeeac4ed15af6bf15b))
* ajoute le statut dans l'étiquette du titre ([24b69d3](https://github.com/MTES-MCT/camino-ui/commit/24b69d310e70a1304aaea4676bca4024c4f0839d))
* optimise la hiérarchie des informations ([#100](https://github.com/MTES-MCT/camino-ui/issues/100)) ([eda6b69](https://github.com/MTES-MCT/camino-ui/commit/eda6b6935ed948b1ecbd8067adb3ad5fe8d9d961))
* **activités:** gère les paramètres d'url ([#97](https://github.com/MTES-MCT/camino-ui/issues/97)) ([210488b](https://github.com/MTES-MCT/camino-ui/commit/210488bc8566585d1b38ddc76d2b0e9163386ccc))


### Bug Fixes

* **design:** affiche la date en dehors du statut sur les étapes ([9844b80](https://github.com/MTES-MCT/camino-ui/commit/9844b80fbbc8078fe832580dd874fdbdb88c14a8))
* **design:** corrige des problèmes de lisibilité ([ad3eeb9](https://github.com/MTES-MCT/camino-ui/commit/ad3eeb9bfeea3bc3c3bea07aae8dbaeddc359edf))
* **utilisateur:** recharge la page si l'id change ([ad7d432](https://github.com/MTES-MCT/camino-ui/commit/ad7d43235760a9ab31710a36442c0c49fd16a374))
* corrige des problèmes d'affichage ([226e602](https://github.com/MTES-MCT/camino-ui/commit/226e6021871388f368c6b0cb13e6a50b2584745c))
* uniformise les marges ([c093486](https://github.com/MTES-MCT/camino-ui/commit/c093486dbf8921482c91a94450f509dc489af886))

### [0.22.29](https://github.com/MTES-MCT/camino-ui/compare/v0.22.28...v0.22.29) (2020-04-27)


### Bug Fixes

* corrige une erreur dans la config de l'url des titres ([88b03bc](https://github.com/MTES-MCT/camino-ui/commit/88b03bc99e42bd2a8b76d42ff3d3f138249e6f00))

### [0.22.28](https://github.com/MTES-MCT/camino-ui/compare/v0.22.27...v0.22.28) (2020-04-27)


### Features

* gère les paramètres d'url pour les filtres etapesIncluses/etapesExclues ([#99](https://github.com/MTES-MCT/camino-ui/issues/99)) ([defadd9](https://github.com/MTES-MCT/camino-ui/commit/defadd9f03566cd29bbce46177a0fdfe43685ef2))
* **demarches:** filtre par étapes incluses ou exclues ([#98](https://github.com/MTES-MCT/camino-ui/issues/98)) ([2ca1d88](https://github.com/MTES-MCT/camino-ui/commit/2ca1d88a3b6fcfde83916876a3c03a56e1c5c993))
* ajoute un lien depuis l'utilisateur vers l'entreprise ([126e86f](https://github.com/MTES-MCT/camino-ui/commit/126e86f5461ba5c6c93cd28511ef225ba1c53293))
* **carte:** précisie le message  sur carte BRGM ([#95](https://github.com/MTES-MCT/camino-ui/issues/95)) ([96be248](https://github.com/MTES-MCT/camino-ui/commit/96be2489bfdbb97933a87e1e74eef9a87e591583))


### Bug Fixes

* corrige la pagination des tables ([#96](https://github.com/MTES-MCT/camino-ui/issues/96)) ([083ebaf](https://github.com/MTES-MCT/camino-ui/commit/083ebaf4a2dddfa6c611662b0bea0274c69a7906))
* **stats:** corrige le suivi des téléchargements ([#94](https://github.com/MTES-MCT/camino-ui/issues/94)) ([87ba25f](https://github.com/MTES-MCT/camino-ui/commit/87ba25ffe0b944b190b6233c98b2e65e167edbc6))

### [0.22.27](https://github.com/MTES-MCT/camino-ui/compare/v0.22.26...v0.22.27) (2020-04-20)


### Features

* **stats:** enregistre les actions utilisateurs ([#89](https://github.com/MTES-MCT/camino-ui/issues/89)) ([ade3835](https://github.com/MTES-MCT/camino-ui/commit/ade383521adaa5ba2ee3e85ecff7f605edc25d3b))


### Bug Fixes

* **stats:** corrige l'implémentation des trackers ([6735912](https://github.com/MTES-MCT/camino-ui/commit/6735912f6b77b9bc6d1b3210705c40895a36c968))
* **stats:** corrige le paramètre site search ([a683bf7](https://github.com/MTES-MCT/camino-ui/commit/a683bf7ee5a7c376515bd9af932d40c7e884ceed))
* **stats:** corrige les trackers ([45233fa](https://github.com/MTES-MCT/camino-ui/commit/45233fa9b5628563edfb7b5ca1a328c966e18332))
* corrige une erreur s'il aucun type d'activité n'est retourné par l'API ([09ec1cb](https://github.com/MTES-MCT/camino-ui/commit/09ec1cb47ac8f5c3ada579586cfa3b34edd67014))
* **utilisateur:** restreint la visibilité de l'édition du mot de passe ([#93](https://github.com/MTES-MCT/camino-ui/issues/93)) ([e96c8ce](https://github.com/MTES-MCT/camino-ui/commit/e96c8cee1579e6cd1457821dd59c23f40a8ea9a9))
* ajoute une csp 'unsafe eval' qui génère une erreur dans firefox ([56048ac](https://github.com/MTES-MCT/camino-ui/commit/56048ac6564dd7dfe0f5956de6faab81ab8fe277))
* corrige une requête en doublon lors du chargement de l'app ([f759dcb](https://github.com/MTES-MCT/camino-ui/commit/f759dcb3e3736da7fd4f481489c63f0175dfc037))
* enlève la position fixe du footer de la popup sur mobile ([36c0e09](https://github.com/MTES-MCT/camino-ui/commit/36c0e09f3e8dca93d5f2a1fea415c656560151f7))
* vérifie les paramètres d'url ([#92](https://github.com/MTES-MCT/camino-ui/issues/92)) ([769378a](https://github.com/MTES-MCT/camino-ui/commit/769378a46779f2e06247e6c7cf3b512303b3018b))

### [0.22.26](https://github.com/MTES-MCT/camino-ui/compare/v0.22.25...v0.22.26) (2020-04-09)


### Bug Fixes

* ajoute des paramètres d'url numériques ([8e8bfe6](https://github.com/MTES-MCT/camino-ui/commit/8e8bfe6e20dc890c2b6b8e2bbc72222d74f34b15))
* corrige l'affichage des selects ([ce3cac7](https://github.com/MTES-MCT/camino-ui/commit/ce3cac79423abb9d13283d14199bef61174c455e))
* corrige une erreur lorsqu'il y a un nombre dans un paramètre d'url ([adb7ae2](https://github.com/MTES-MCT/camino-ui/commit/adb7ae2644abfc95f3e1b258b03cc47a334192b7))
* n'autorise qu'une administration par utilisateur ([3200a95](https://github.com/MTES-MCT/camino-ui/commit/3200a95b0c19bf34d999275d76a20554aff0d229))

### [0.22.25](https://github.com/MTES-MCT/camino-ui/compare/v0.22.24...v0.22.25) (2020-03-30)


### Features

* **export:** exporte la nature des titres (exploration ou exploitation) ([#85](https://github.com/MTES-MCT/camino-ui/issues/85)) ([1c43cc9](https://github.com/MTES-MCT/camino-ui/commit/1c43cc90d0d0c2aa2480058b92c6eae408760a9e))
* ajoute des textures sur les périmètres des titres ([#86](https://github.com/MTES-MCT/camino-ui/issues/86)) ([7f55870](https://github.com/MTES-MCT/camino-ui/commit/7f558706932ca2ab251410553dfe79f8b60bc793))


### Bug Fixes

* corrige une erreur dans le nom d'une action ([f59a099](https://github.com/MTES-MCT/camino-ui/commit/f59a099c4298d493943554bfbbd2cad5c561ba76))

### [0.22.24](https://github.com/MTES-MCT/camino-ui/compare/v0.22.23...v0.22.24) (2020-03-23)


### Features

* ajoute l'authentification avec Cerbère ([#84](https://github.com/MTES-MCT/camino-ui/issues/84)) ([7fcf5cc](https://github.com/MTES-MCT/camino-ui/commit/7fcf5cc0ccede83d36be08520d1dbcd4bfdb32fd))
* utilise l'api pour obtenir l'url de Cerbère ([8cd88d5](https://github.com/MTES-MCT/camino-ui/commit/8cd88d56f34b3a2c10854abd6bae8b1b3d9ee139))

### [0.22.23](https://github.com/MTES-MCT/camino-ui/compare/v0.22.22...v0.22.23) (2020-03-12)


### Features

* **api:** affiche les données spécifiques remontées à la racine titre ([#80](https://github.com/MTES-MCT/camino-ui/issues/80)) ([b03c903](https://github.com/MTES-MCT/camino-ui/commit/b03c903254a3b124ac8d112b11d13b8a2daa92d2))
* **étape:** affiche les sections dont le contenu est vide ([44c32dd](https://github.com/MTES-MCT/camino-ui/commit/44c32dd645e40b7adacf5caad32a6bf84fe91e4d))


### Bug Fixes

* **démarches:** évite une double requête lors du changement de filtres ([a359c62](https://github.com/MTES-MCT/camino-ui/commit/a359c62f982c0544984ec8f92606de9605a64989))
* affiche les contenus non remplis ([#82](https://github.com/MTES-MCT/camino-ui/issues/82)) ([8385fb0](https://github.com/MTES-MCT/camino-ui/commit/8385fb08408e49324dc65b732cf1cdb6f943120d))
* corrige l'affichage des sections d'activités ([4bbb454](https://github.com/MTES-MCT/camino-ui/commit/4bbb454e1306157849183a47ab8c87f7708af142))
* corrige l'affichage du contenu d'étapes avec sections spécifiques ([#79](https://github.com/MTES-MCT/camino-ui/issues/79)) ([bac1303](https://github.com/MTES-MCT/camino-ui/commit/bac13035fc260c72e98890f1abee7b2b39c7c448))
* corrige l'édition d'un document ([d28aa57](https://github.com/MTES-MCT/camino-ui/commit/d28aa57ec404f04cd1d9aa267d7da0e2f5027341))

### [0.22.22](https://github.com/MTES-MCT/camino-ui/compare/v0.22.21...v0.22.22) (2020-02-27)


### Features

* affiche le bouton d'ajout d'étapes en fonction des droits ([2bb9b85](https://github.com/MTES-MCT/camino-ui/commit/2bb9b856ff0fe2c6cb48e64bc6f164935695be1f))
* affiche une liste de démarches ([b8bb3da](https://github.com/MTES-MCT/camino-ui/commit/b8bb3dab3f98073d78dd3b3714e80df45e0f8360))


### Bug Fixes

* corrige le style des boutons ([a9105c6](https://github.com/MTES-MCT/camino-ui/commit/a9105c67bc0e2442d5916ca50cdc19a202959497))

### [0.22.21](https://github.com/MTES-MCT/camino-ui/compare/v0.22.20...v0.22.21) (2020-02-20)


### Features

* ajoute la surface dans la liste des propriétés d'une étape ([#73](https://github.com/MTES-MCT/camino-ui/issues/73)) ([9500538](https://github.com/MTES-MCT/camino-ui/commit/9500538d329ad1e38d2d0f93ddc220ea568e40cd))
* interdit d'éditer les administrations dont l'utilisateur ne fait pas partie ([6c25a2c](https://github.com/MTES-MCT/camino-ui/commit/6c25a2cc909d9f1d3c3bf0db499b43c6a7a8dbed))


### Bug Fixes

* corrige des erreurs du au mauvais usage de la prop "native" ([39e9d8c](https://github.com/MTES-MCT/camino-ui/commit/39e9d8cf7ece7b1a845333e48f0465276ae6e36c))
* corrige l'affichage des administrations pour les super users ([b0c36de](https://github.com/MTES-MCT/camino-ui/commit/b0c36de536fc167ce44cacb3ad499e6c40da89ea))
* corrige la création d'étape ([8f7d6fd](https://github.com/MTES-MCT/camino-ui/commit/8f7d6fd43924e61da53ae8259754d86c1d3ced5f))
* n'ajoute que les administrations sélectionnables dans la liste ([1732722](https://github.com/MTES-MCT/camino-ui/commit/1732722441cd35c302708db5db5da8552bca3dfa))
* n'utilise pas le cache lors du chargement des métas ([a801882](https://github.com/MTES-MCT/camino-ui/commit/a8018826e7b2fd4c030475bf6a7e6732a6865e16))
* **ui:** affiche le type de titre vue liste et fiche titre ([#75](https://github.com/MTES-MCT/camino-ui/issues/75)) ([5c21318](https://github.com/MTES-MCT/camino-ui/commit/5c21318ec0199f0e6a15d24f70123cedb577f1e3))

### [0.22.20](https://github.com/MTES-MCT/camino-ui/compare/v0.22.19...v0.22.20) (2020-02-11)


### Features

* **mentions-legales:** ajouter le directeur de publication ONF ([#69](https://github.com/MTES-MCT/camino-ui/issues/69)) ([02ad85e](https://github.com/MTES-MCT/camino-ui/commit/02ad85ea6f2163bff890a9b959ab3ae4b6fa109c))
* ajoute des types aux types de titres ([#70](https://github.com/MTES-MCT/camino-ui/issues/70)) ([7578314](https://github.com/MTES-MCT/camino-ui/commit/757831489b9e4324e2ff6aba4ca781fb349d6326))


### Bug Fixes

* corrige l'affichage du type dans les téléchargements ([0a39115](https://github.com/MTES-MCT/camino-ui/commit/0a3911536e870b0979ddfffb8056e62ad351ba57))
* corrige la création d'un utilisateur ([#72](https://github.com/MTES-MCT/camino-ui/issues/72)) ([a81998f](https://github.com/MTES-MCT/camino-ui/commit/a81998fb42c4316c84ecfb26d00129c33c76b199))
* test si les élémnts sont présents dans la page ([9cee314](https://github.com/MTES-MCT/camino-ui/commit/9cee314e070ccbf19ac87e18ea01e29f9ad8ecd7))

### [0.22.19](https://github.com/MTES-MCT/camino-ui/compare/v0.22.18...v0.22.19) (2020-01-31)


### Features

* **activité:** met en page le contenu d'une activité ([010f2bc](https://github.com/MTES-MCT/camino-ui/commit/010f2bcfb35ac8d31cec7ae3a17baf72a213bb59))
* **étape:** affiche le contenu des sections ([9a8ca52](https://github.com/MTES-MCT/camino-ui/commit/9a8ca527ad3ada7392078cba0d7c2b4cd00971e4))
* **mentions légales:** modifie les directeurs de publication ([#64](https://github.com/MTES-MCT/camino-ui/issues/64)) ([c55aaf7](https://github.com/MTES-MCT/camino-ui/commit/c55aaf7b62fce61fb6a2b4d1e3c240e9b3da94ae))
* affiche un bloc pour signaler un titre en doublon ([394af90](https://github.com/MTES-MCT/camino-ui/commit/394af90bf105737ddb06d422676ab672214c9542))


### Bug Fixes

* affiche le bouton de suppression d'un fichier ([2efd5ba](https://github.com/MTES-MCT/camino-ui/commit/2efd5badc7a9a9307ee9fa35156174d3ef2aa9dd))
* change le message en cas de titre en doublon ([7c00b1f](https://github.com/MTES-MCT/camino-ui/commit/7c00b1f2fe378f3d883fdeb57bb3841ff8c00565))
* corrige l'affichage d'une activité ([0f8fad7](https://github.com/MTES-MCT/camino-ui/commit/0f8fad7dd80509dadf2e8070202e92ab29a22ed4))
* corrige l'affichage d'une liste de titres avec des params d'url ([6863489](https://github.com/MTES-MCT/camino-ui/commit/6863489411b84cf539dbbc8f243b5192d0fb01d3))
* corrige l'affichage du contenu d'étape ([2375550](https://github.com/MTES-MCT/camino-ui/commit/2375550075f987fdc4666f2f2b72a7a327dbbbbf))
* **utilisateur:** affiche les permissions dans la popup d'édition ([6a91f04](https://github.com/MTES-MCT/camino-ui/commit/6a91f040b9a4d441cbdbea644c7b5f58eba1e5ee))
* corrige l'enregistrement ([5fde1ba](https://github.com/MTES-MCT/camino-ui/commit/5fde1badc011ffc45f39b3c9a5f7348ef8c93c63))
* **api:** affiche l'édition des documents en fonction des droits ([#65](https://github.com/MTES-MCT/camino-ui/issues/65)) ([1690d19](https://github.com/MTES-MCT/camino-ui/commit/1690d19819385827044b3074291f6910f5802f06))
* **étape:** affiche le contenu de l'étape dans l'accordéon ([7beefbf](https://github.com/MTES-MCT/camino-ui/commit/7beefbf3f8e9ab3db47f595308ede34ed1283e61))

### [0.22.18](https://github.com/MTES-MCT/camino-ui/compare/v0.22.17...v0.22.18) (2020-01-20)


### Bug Fixes

* supprime un bloc dans l'en†ête de page ([366450e](https://github.com/MTES-MCT/camino-ui/commit/366450e53eaa0284dd2a93e02b65325bdddcf158))

### [0.22.17](https://github.com/MTES-MCT/camino-ui/compare/v0.22.16...v0.22.17) (2020-01-20)


### Features

* supprime le badeau de grève ([538f394](https://github.com/MTES-MCT/camino-ui/commit/538f394f99704f68f811cbcae844d592eddc7dc5))

### [0.22.16](https://github.com/MTES-MCT/camino-ui/compare/v0.22.15...v0.22.16) (2020-01-20)


### Features

* affiche les amodiataires sur la page entreprise ([a943dc1](https://github.com/MTES-MCT/camino-ui/commit/a943dc142c99492b6ccba2e9b258122da9f0236f))
* change l'ordre des éléments dans le menu ([f351148](https://github.com/MTES-MCT/camino-ui/commit/f351148025b18b32ca5f1cc79989da4921a46322))
* **activités:** ajoute un lien dans le menu vers la page des activités ([#63](https://github.com/MTES-MCT/camino-ui/issues/63)) ([ebd2927](https://github.com/MTES-MCT/camino-ui/commit/ebd29274638112849ac97b9bcbcd4a8b59db248d))
* affiche un bandeau de soutient à la grève ([e7e6f34](https://github.com/MTES-MCT/camino-ui/commit/e7e6f348adea58bd52419258585d54199a8689cc))
* ajoute le fond de carte ign cadastre ([6c46595](https://github.com/MTES-MCT/camino-ui/commit/6c46595f111b701c4e3b73b9e3a7b680abe811b8))


### Bug Fixes

* **documents:** affiche l'option "public" ([d778777](https://github.com/MTES-MCT/camino-ui/commit/d778777066844504b4d378bf7f8f4424a4166e2b))
* construit les fichiers à télécharger au moment du clic ([#62](https://github.com/MTES-MCT/camino-ui/issues/62)) ([ed64e51](https://github.com/MTES-MCT/camino-ui/commit/ed64e51e949778eb7da0a46ab55314844af16c2a))
* corrige l'affichage du fond de carte parcelles cadastrales ([2a2fd5b](https://github.com/MTES-MCT/camino-ui/commit/2a2fd5b964f61eaba1e1dd73a8917551ce073811))
* corrige le schéma graphql ([1c277f0](https://github.com/MTES-MCT/camino-ui/commit/1c277f019959cc8c4cbca30c2d80b4b0ea91dfbe))
* corrige les téléchargements volumineux ([4ce7b03](https://github.com/MTES-MCT/camino-ui/commit/4ce7b03b31b92bf7d4d80f6955fe3205845429f7))
* reformule le contenu du bandeau ([4f5dc45](https://github.com/MTES-MCT/camino-ui/commit/4f5dc454edb5f859a630609398b779546316a2cb))
* simplifie le message du bandeau ([7f1da51](https://github.com/MTES-MCT/camino-ui/commit/7f1da512f826932ff96621d170a452a5b5ea69b1))
* **édition d'étape:** corrige l'effacement de contenu lorsqu'on modifie la date ([#60](https://github.com/MTES-MCT/camino-ui/issues/60)) ([4ecb33e](https://github.com/MTES-MCT/camino-ui/commit/4ecb33e6bdf1d9c327580722422d07d3864e5d4a))
* **recherche:** prend en compte les tirets dans les champs texte ([#61](https://github.com/MTES-MCT/camino-ui/issues/61)) ([5f79885](https://github.com/MTES-MCT/camino-ui/commit/5f7988562a2c025895dae3c5e05a5bc632494f72))

### [0.22.15](https://github.com/MTES-MCT/camino-ui/compare/v0.22.14...v0.22.15) (2019-12-20)


### Bug Fixes

* tests ([7e668f7](https://github.com/MTES-MCT/camino-ui/commit/7e668f7b2f6a2f41efd58af80d918f58aa150b6e))

### [0.22.14](https://github.com/MTES-MCT/camino-ui/compare/v0.22.13...v0.22.14) (2019-12-20)


### Bug Fixes

* **activités:** corrige l'affichage des rapports annuels ([914b31c](https://github.com/MTES-MCT/camino-ui/commit/914b31cbacebb0b842a45a2e19751b288acccabd))
* corrige l'ordre des métas ([#59](https://github.com/MTES-MCT/camino-ui/issues/59)) ([00a2c97](https://github.com/MTES-MCT/camino-ui/commit/00a2c970735b11b842e620772017ae22adfded76))

### [0.22.13](https://github.com/MTES-MCT/camino-ui/compare/v0.22.12...v0.22.13) (2019-12-19)


### Features

* **édition:** ajoute un champs date ([9705892](https://github.com/MTES-MCT/camino-ui/commit/970589248527e4a088bbe9e31373b1d4485dbcd7))

### [0.22.12](https://github.com/MTES-MCT/camino-ui/compare/v0.22.11...v0.22.12) (2019-12-10)


### Features

* ajoute la surface couverte par le titre dans l'export CSV ([98929e9](https://github.com/MTES-MCT/camino-ui/commit/98929e9b755e92413bf88f16a634ee3699ee3892))
* ajoute une interface pour les activités ([#56](https://github.com/MTES-MCT/camino-ui/issues/56)) ([d65b2d8](https://github.com/MTES-MCT/camino-ui/commit/d65b2d8390f9dd045caddabdd1d9dfc2222de0a9))
* **export csv:** ajoute l'adresse des entreprises et amodiataires ([#54](https://github.com/MTES-MCT/camino-ui/issues/54)) ([1fbe623](https://github.com/MTES-MCT/camino-ui/commit/1fbe62344891169848719105a8952ee388df0954))


### Bug Fixes

* affiche les entreprise dans l'édition d'étape ([a357a6e](https://github.com/MTES-MCT/camino-ui/commit/a357a6e6724bbe439a48e80b0d7240ef9070bf21))
* corrige une erreur lors du retour sur la page activités ([e26f81b](https://github.com/MTES-MCT/camino-ui/commit/e26f81bd8d0d21d032c905c8b7eda4ea6fe9f83c))

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
