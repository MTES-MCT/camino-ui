import {
  definitions,
  domaines,
  titresTypesTypes,
  titresStatuts,
  demarchesTypes,
  demarchesStatuts,
  etapesTypes,
  etapesStatuts,
  domaineModifier,
  definitionModifier,
  typeModifier,
  statutModifier,
  demarcheTypeModifier
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
      { id: 'description', nom: 'Description', type: String },
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
    update: typeModifier,
    nom: 'Types des titres',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      { id: 'description', nom: 'Description', type: String },
      { id: 'ordre', nom: 'Ordre', type: Number }
    ]
  },
  'titres-types': {
    get: 'titresTypes',
    nom: 'Types des titres | Domaines'
  },
  'titres-statuts': {
    get: titresStatuts,
    update: statutModifier,
    nom: 'Statuts des titres',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      { id: 'description', nom: 'Description', type: String },
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
    get: 'titreTypes__titresStatuts',
    nom: 'Types des titres | Statuts des titres'
  },
  'demarches-types': {
    get: demarchesTypes,
    update: demarcheTypeModifier,
    nom: 'Types des démarches',
    colonnes: [
      { id: 'id', nom: 'Id' },
      { id: 'nom', nom: 'Nom', type: String },
      { id: 'description', nom: 'Description', type: String },
      { id: 'ordre', nom: 'Ordre', type: Number },
      { id: 'duree', nom: 'Durée', type: Boolean },
      { id: 'points', nom: 'Points', type: Boolean },
      { id: 'substances', nom: 'Substances', type: Boolean },
      { id: 'titulaires', nom: 'Titulaires', type: Boolean },
      { id: 'exception', nom: 'Exception', type: Boolean },
      { id: 'renouvelable', nom: 'Renouvelable', type: Boolean }
    ]
  },
  'demarches-statuts': {
    get: demarchesStatuts,
    nom: 'Statuts des démarches'
  },
  'titres-types--demarches-types': {
    get: 'titresTypes__demarchesTypes',
    nom: 'Types des titres | Types des démarches'
  },
  'titres-types--demarches-statuts': {
    get: 'demarchesTypes__demarchesStatuts',
    nom: 'Types des démarches | Statuts des démarches'
  },
  'phases-statuts': {
    get: 'phasesStatuts',
    nom: 'Statuts des phases'
  },
  'etapes-types': { get: etapesTypes, nom: 'Types des étapes' },
  'etapes-statuts': {
    get: etapesStatuts,
    nom: 'Statuts des étapes'
  },
  'etapes-types--etapes-statuts': {
    get: 'etapesTypes__etapesStatuts',
    nom: 'Types des étapes | Statuts des étapes'
  },
  'titres-types--demarches-types--etapes-types': {
    get: 'titresTypes__demarchesTypes__etapesTypes',
    nom: 'Types des titres | Types des démarches | types des étapes'
  },
  'travaux-types': {
    get: 'travauxTypes',
    nom: 'Types des travaux'
  },
  'travaux-types--demarches-statuts': {
    get: 'travauxTypes__demarchesStatuts',
    nom: 'Types des travaux | Statuts des travaux (démarches)'
  },
  'travaux-types--etapes-types': {
    get: 'travauxTypes__etapesTypes',
    nom: 'Types des travaux | Types des étapes'
  },
  devises: { get: 'devises', nom: 'Devises' },
  unites: { get: 'unites', nom: 'Unités' },
  'administrations-types': {
    get: 'administrationsTypes',
    nom: 'types des administrations'
  },
  permissions: { get: 'permissions', nom: 'Permissions' },
  'documents-types': {
    get: 'documentsTypes',
    nom: 'Types des documents'
  },
  'references-types': {
    get: 'referencesTypes',
    nom: 'Types des références'
  }
}

export default metasIndex
