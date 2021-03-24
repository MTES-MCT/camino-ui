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
  titresTypesDemarchesTypesEtapesTypes,
  titreTypeDemarcheTypeEtapeTypeModifier,
  titreTypeDemarcheTypeEtapeTypeCreer,
  titreTypeDemarcheTypeEtapeTypeSupprimer,
  etapesTypesEtapesStatuts,
  etapeTypeEtapeStatutModifier,
  etapeTypeEtapeStatutCreer,
  etapeTypeEtapeStatutSupprimer,
  etapesTypesDocumentsTypes,
  etapeTypeDocumentTypeModifier,
  etapeTypeDocumentTypeCreer,
  etapeTypeDocumentTypeSupprimer,
  travauxTypesEtapesTypes,
  travauxTypeEtapeTypeModifier,
  travauxTypeEtapeTypeCreer,
  travauxTypeEtapeTypeSupprimer
} from '../api/metas'

import {
  activitesTypes,
  activiteTypeModifier,
  activitesStatuts,
  activiteStatutModifier,
  activitesTypesTitresTypes,
  activiteTypeTitreTypeModifier,
  activiteTypeTitreTypeCreer,
  activiteTypeTitreTypeSupprimer,
  activitesTypesDocumentsTypes,
  activiteTypeDocumentTypeModifier,
  activiteTypeDocumentTypeCreer,
  activiteTypeDocumentTypeSupprimer,
  activitesTypesPays,
  activiteTypePaysModifier,
  activiteTypePaysCreer,
  activiteTypePaysSupprimer
} from '../api/metas-activites'

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
        id: 'contenuIds',
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
      {
        id: 'parentId',
        nom: 'Id du type de l’étape parent',
        type: String,
        optional: true
      },
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
      }
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
  'etapes-types--documents-types': {
    get: etapesTypesDocumentsTypes,
    update: etapeTypeDocumentTypeModifier,
    create: etapeTypeDocumentTypeCreer,
    delete: etapeTypeDocumentTypeSupprimer,
    nom: 'Types des étapes | Types des documents',
    colonnes: [
      { id: 'etapeTypeId', nom: "Id du type d'étape" },
      { id: 'documentTypeId', nom: 'Id du type de documents' },
      { id: 'optionnel', nom: 'Optionnel', type: Boolean, optional: true }
    ],
    ids: ['etapeTypeId', 'documentTypeId']
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
      { id: 'nom', nom: 'Nom', type: String },
      {
        id: 'referenceUniteId',
        nom: "Id de l'unité de référence",
        type: String
      },
      {
        id: 'referenceUniteRatio',
        nom: "Ratio de l'unité de référence",
        type: Number
      }
    ]
  },
  'administrations-types': {
    get: administrationsTypes,
    update: administrationTypeModifier,
    nom: 'Types des administrations',
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
  },
  'activites-types': {
    get: activitesTypes,
    update: activiteTypeModifier,
    nom: 'Types des activités',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      {
        id: 'frequenceId',
        nom: 'Id la fréquence',
        type: Array,
        elements: ['tri', 'ann', 'men']
      },
      { id: 'ordre', nom: 'Ordre', type: Number },
      { id: 'sections', nom: 'Sections', type: 'json', optional: true },
      {
        id: 'dateDebut',
        nom: 'Date de début',
        type: Date,
        class: ['min-width-12']
      },
      { id: 'delaiMois', nom: 'Délai', type: Number },
      {
        id: 'satisfactionUrl',
        nom: 'Url voxusagers',
        type: String,
        optional: true
      },
      { id: 'email', nom: 'Email', type: String, optional: true }
    ]
  },
  'activites-statuts': {
    get: activitesStatuts,
    update: activiteStatutModifier,
    nom: 'Statuts des activités',
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

  'activites-types--titres-types': {
    get: activitesTypesTitresTypes,
    update: activiteTypeTitreTypeModifier,
    create: activiteTypeTitreTypeCreer,
    delete: activiteTypeTitreTypeSupprimer,
    nom: 'Types des activités | Types des titres',
    colonnes: [
      { id: 'activiteTypeId', nom: "Id du type d'activité" },
      { id: 'titreTypeId', nom: 'Id du type de titre' }
    ],
    ids: ['activiteTypeId', 'titreTypeId']
  },

  'activites-types--documents-types': {
    get: activitesTypesDocumentsTypes,
    update: activiteTypeDocumentTypeModifier,
    create: activiteTypeDocumentTypeCreer,
    delete: activiteTypeDocumentTypeSupprimer,
    nom: 'Types des activités | Types des documents',
    colonnes: [
      { id: 'activiteTypeId', nom: "Id du type d'activité" },
      { id: 'documentTypeId', nom: 'Id du type de document' },
      { id: 'optionnel', nom: 'Optionnel', type: Boolean, optional: true }
    ],
    ids: ['activiteTypeId', 'documentTypeId']
  },

  'activites-types--pays': {
    get: activitesTypesPays,
    update: activiteTypePaysModifier,
    create: activiteTypePaysCreer,
    delete: activiteTypePaysSupprimer,
    nom: 'Types des activités | Pays',
    colonnes: [
      { id: 'activiteTypeId', nom: "Id du type d'activité" },
      { id: 'paysId', nom: 'Id du pays' }
    ],
    ids: ['activiteTypeId', 'paysId']
  }
}

export default metasIndex
