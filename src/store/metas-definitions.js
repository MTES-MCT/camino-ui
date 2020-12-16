import {
  definitions,
  domaines,
  titresTypesTypes,
  titresStatuts,
  demarchesTypes,
  travauxTypes,
  demarchesStatuts,
  etapesTypes,
  etapesStatuts,
  phasesStatuts,
  domaineModifier,
  definitionModifier,
  titreTypeTypeModifier,
  titreStatutModifier,
  demarcheTypeModifier,
  travauxTypeModifier,
  demarcheStatutModifier,
  phaseStatutModifier,
  etapeTypeModifier,
  etapeStatutModifier,
  devises,
  deviseModifier,
  unites,
  uniteModifier,
  administrationsTypes,
  administrationTypeModifier,
  permissions,
  permissionModifier,
  documentsTypes,
  documentTypeModifier,
  referencesTypes,
  referenceTypeModifier,
  geoSystemes,
  geoSystemeModifier,
  titresTypes,
  titreTypeModifier,
  titreTypeCreer,
  titreTypeSupprimer,
  titresTypesTitresStatuts,
  titreTypeTitreStatutCreer,
  titreTypeTitreStatutSupprimer,
  titreTypeTitreStatutModifier,
  titresTypesDemarchesTypes,
  titreTypeDemarcheTypeModifier,
  titreTypeDemarcheTypeCreer,
  titreTypeDemarcheTypeSupprimer,
  demarchesTypesDemarchesStatuts,
  demarcheTypeDemarcheStatutModifier,
  demarcheTypeDemarcheStatutCreer,
  demarcheTypeDemarcheStatutSupprimer,
  titresTypesDemarchesTypesEtapesTypes,
  titreTypeDemarcheTypeEtapeTypeModifier,
  titreTypeDemarcheTypeEtapeTypeCreer,
  titreTypeDemarcheTypeEtapeTypeSupprimer,
  etapesTypesEtapesStatuts,
  etapeTypeEtapeStatutModifier,
  etapeTypeEtapeStatutCreer,
  etapeTypeEtapeStatutSupprimer,
  travauxTypesDemarchesStatuts,
  travauxTypeDemarcheStatutModifier,
  travauxTypeDemarcheStatutCreer,
  travauxTypeDemarcheStatutSupprimer,
  travauxTypesEtapesTypes,
  travauxTypeEtapeTypeModifier,
  travauxTypeEtapeTypeCreer,
  travauxTypeEtapeTypeSupprimer
} from '../api/metas'

const metasIndex = {
  definitions: {
    get: definitions,
    update: definitionModifier,
    nom: 'Définitions',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'nom', type: String },
      { id: 'slug', nom: 'slug', type: String },
      { id: 'description', nom: 'Description', type: String, optional: true },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ]
  },
  domaines: {
    get: domaines,
    update: domaineModifier,
    nom: 'Domaines',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      { id: 'table', nom: 'table', type: String },
      { id: 'description', nom: 'Description', type: String },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ]
  },
  'titres-types-types': {
    get: titresTypesTypes,
    update: titreTypeTypeModifier,
    nom: 'Types des titres',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      { id: 'description', nom: 'Description', type: String, optional: true },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ]
  },
  'titres-types': {
    get: titresTypes,
    update: titreTypeModifier,
    create: titreTypeCreer,
    delete: titreTypeSupprimer,
    nom: 'Domaines | Types des titres',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'domaineId', nom: 'Id du domaine' },
      { id: 'typeId', nom: 'Id du type' },
      {
        id: 'propsEtapesTypes',
        nom: "Type d'étape des propriétés",
        type: 'json',
        optional: true
      }
    ]
  },
  'titres-statuts': {
    get: titresStatuts,
    update: titreStatutModifier,
    nom: 'Statuts des titres',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      { id: 'description', nom: 'Description', type: String, optional: true },
      {
        id: 'couleur',
        nom: 'Couleur',
        type: Array,
        elements: ['warning', 'neutral', 'success']
      },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ]
  },
  'titre-types--titres-statuts': {
    get: titresTypesTitresStatuts,
    update: titreTypeTitreStatutModifier,
    create: titreTypeTitreStatutCreer,
    delete: titreTypeTitreStatutSupprimer,
    nom: 'Types des titres | Statuts des titres',
    colonnes: [
      { id: 'titreTypeId', nom: 'Id du type de titre' },
      { id: 'titreStatutId', nom: 'Id du statut de titre' },
      { id: 'publicLecture', nom: 'Public', type: Boolean, optional: true }
    ],
    ids: ['titreTypeId', 'titreStatutId']
  },
  'demarches-types': {
    get: demarchesTypes,
    update: demarcheTypeModifier,
    nom: 'Types des démarches',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      { id: 'ordre', nom: 'Ordre', type: Number },
      { id: 'description', nom: 'Description', type: String, optional: true },
      { id: 'duree', nom: 'Durée', type: Boolean, optional: true },
      { id: 'points', nom: 'Points', type: Boolean, optional: true },
      { id: 'substances', nom: 'Substances', type: Boolean, optional: true },
      { id: 'titulaires', nom: 'Titulaires', type: Boolean, optional: true },
      { id: 'exception', nom: 'Exception', type: Boolean, optional: true },
      { id: 'renouvelable', nom: 'Renouvelable', type: Boolean, optional: true }
    ]
  },
  'titres-types--demarches-types': {
    get: titresTypesDemarchesTypes,
    update: titreTypeDemarcheTypeModifier,
    create: titreTypeDemarcheTypeCreer,
    delete: titreTypeDemarcheTypeSupprimer,
    nom: 'Types des titres | Types des démarches',
    colonnes: [
      { id: 'titreTypeId', nom: 'Id du type de titre' },
      { id: 'demarcheTypeId', nom: 'Id du type de démarche' },
      { id: 'dureeMax', nom: 'Durée maximale', type: Number, optional: true },
      {
        id: 'delaiImplicite',
        nom: 'Délai implicite',
        type: Number,
        optional: true
      },
      {
        id: 'delaiRecours',
        nom: 'Délai de recours',
        type: Number,
        optional: true
      },
      { id: 'legalRef', nom: 'Référence légale', type: String, optional: true },
      {
        id: 'legalLien',
        nom: 'Lien de la référence légale',
        type: String,
        optional: true
      },
      { id: 'dateDebut', nom: 'Date de début', type: String, optional: true },
      { id: 'dateFin', nom: 'Date de fin', type: String, optional: true }
    ],
    ids: ['titreTypeId', 'demarcheTypeId']
  },
  'demarches-statuts': {
    get: demarchesStatuts,
    update: demarcheStatutModifier,
    nom: 'Statuts des démarches',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      { id: 'description', nom: 'Description', type: String, optional: true },
      {
        id: 'couleur',
        nom: 'Couleur',
        type: Array,
        elements: ['warning', 'neutral', 'success', 'error']
      },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ]
  },
  'titres-types--demarches-statuts': {
    get: demarchesTypesDemarchesStatuts,
    update: demarcheTypeDemarcheStatutModifier,
    create: demarcheTypeDemarcheStatutCreer,
    delete: demarcheTypeDemarcheStatutSupprimer,
    nom: 'Types des démarches | Statuts des démarches',
    colonnes: [
      { id: 'titreTypeId', nom: 'Id du type de titre' },
      { id: 'demarcheStatutId', nom: 'Id du statut de démarche' },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ],
    ids: ['titreTypeId', 'demarcheStatutId']
  },
  'phases-statuts': {
    get: phasesStatuts,
    update: phaseStatutModifier,
    nom: 'Statuts des phases',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      {
        id: 'couleur',
        nom: 'Couleur',
        type: Array,
        elements: ['warning', 'neutral', 'success', 'error']
      }
    ]
  },
  'etapes-types': {
    get: etapesTypes,
    update: etapeTypeModifier,
    nom: 'Types des étapes',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      { id: 'description', nom: 'Description', type: String, optional: true },
      { id: 'ordre', nom: 'Ordre', type: Number },
      { id: 'sections', nom: 'Sections', type: 'json', optional: true },
      { id: 'legalLien', nom: 'Lien légal', type: String, optional: true },
      {
        id: 'dateDebut',
        nom: 'Date de début',
        type: Date,
        class: ['min-width-12'],
        optional: true
      },
      {
        id: 'dateFin',
        nom: 'Date de fin',
        type: Date,
        class: ['min-width-12'],
        optional: true
      },
      {
        id: 'fondamentale',
        nom: 'Fondamentale',
        type: Boolean,
        optional: true
      },
      { id: 'unique', nom: 'Unique', type: Boolean, optional: true },
      {
        id: 'acceptationAuto',
        nom: 'Acceptation auto',
        type: Boolean,
        optional: true
      },
      {
        id: 'publicLecture',
        nom: 'Lecture public',
        type: Boolean,
        optional: true
      },
      {
        id: 'entrepriseLecture',
        nom: 'Lecture entreprises',
        type: Boolean,
        optional: true
      }
    ]
  },
  'titres-types--demarches-types--etapes-types': {
    get: titresTypesDemarchesTypesEtapesTypes,
    update: titreTypeDemarcheTypeEtapeTypeModifier,
    create: titreTypeDemarcheTypeEtapeTypeCreer,
    delete: titreTypeDemarcheTypeEtapeTypeSupprimer,
    nom: 'Types des titres | Types des démarches | types des étapes',
    colonnes: [
      { id: 'titreTypeId', nom: 'Id du type de titre' },
      { id: 'demarcheTypeId', nom: 'Id du type de démarche' },
      { id: 'etapeTypeId', nom: "Id du type d'étape" },
      { id: 'sections', nom: 'Sections', type: 'json', optional: true },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ],
    ids: ['titreTypeId', 'demarcheTypeId', 'etapeTypeId']
  },
  'etapes-statuts': {
    get: etapesStatuts,
    update: etapeStatutModifier,
    nom: 'Statuts des étapes',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      { id: 'description', nom: 'Description', type: String, optional: true },
      {
        id: 'couleur',
        nom: 'Couleur',
        type: Array,
        elements: ['warning', 'neutral', 'success', 'error']
      },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ]
  },
  'etapes-types--etapes-statuts': {
    get: etapesTypesEtapesStatuts,
    update: etapeTypeEtapeStatutModifier,
    create: etapeTypeEtapeStatutCreer,
    delete: etapeTypeEtapeStatutSupprimer,
    nom: 'Types des étapes | Statuts des étapes',
    colonnes: [
      { id: 'etapeTypeId', nom: "Id du type d'étape" },
      { id: 'etapeStatutId', nom: "Id du statut d'étape" },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ],
    ids: ['etapeTypeId', 'etapeStatutId']
  },
  'travaux-types': {
    get: travauxTypes,
    update: travauxTypeModifier,
    nom: 'Types des travaux',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      { id: 'description', nom: 'Description', type: String, optional: true },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ]
  },
  'travaux-types--demarches-statuts': {
    get: travauxTypesDemarchesStatuts,
    update: travauxTypeDemarcheStatutModifier,
    create: travauxTypeDemarcheStatutCreer,
    delete: travauxTypeDemarcheStatutSupprimer,
    nom: 'Types des travaux | Statuts des travaux (démarches)',
    colonnes: [
      { id: 'travauxTypeId', nom: 'Id du type de travaux' },
      { id: 'demarcheStatutId', nom: 'Id du statut de démarche' },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ],
    ids: ['travauxTypeId', 'demarcheStatutId']
  },
  'travaux-types--etapes-types': {
    get: travauxTypesEtapesTypes,
    update: travauxTypeEtapeTypeModifier,
    create: travauxTypeEtapeTypeCreer,
    delete: travauxTypeEtapeTypeSupprimer,
    nom: 'Types des travaux | Types des étapes',
    colonnes: [
      { id: 'titreTypeId', nom: 'Id du type de titre' },
      { id: 'etapeTypeId', nom: "Id du type d'étape" },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ],
    ids: ['titreTypeId', 'etapeTypeId']
  },
  devises: {
    get: devises,
    update: deviseModifier,
    nom: 'Devises',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String }
    ]
  },
  unites: {
    get: unites,
    update: uniteModifier,
    nom: 'Unités',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'symbole', nom: 'Symbole', type: String },
      { id: 'nom', nom: 'Nom', type: String }
    ]
  },
  'administrations-types': {
    get: administrationsTypes,
    update: administrationTypeModifier,
    nom: 'types des administrations',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ]
  },
  permissions: {
    get: permissions,
    update: permissionModifier,
    nom: 'Permissions',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ]
  },
  'documents-types': {
    get: documentsTypes,
    update: documentTypeModifier,
    nom: 'Types des documents',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      {
        id: 'repertoire',
        nom: 'Répertoire',
        type: Array,
        elements: ['demarches', 'travaux', 'activites']
      }
    ]
  },
  'references-types': {
    get: referencesTypes,
    update: referenceTypeModifier,
    nom: 'Types des références',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String }
    ]
  },
  'geo-systemes': {
    get: geoSystemes,
    update: geoSystemeModifier,
    nom: 'Systèmes géographiques',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      { id: 'ordre', nom: 'Ordre', type: Number },
      {
        id: 'uniteId',
        nom: "Id de l'unité",
        type: Array,
        elements: ['met', 'deg', 'gon']
      },
      { id: 'definitionProj4', nom: 'Définition proj 4', type: String }
    ]
  }
}

export default metasIndex
