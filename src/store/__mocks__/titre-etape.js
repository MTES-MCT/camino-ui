const titreEtapeMetas = {
  etapesTypes: [
    { id: 'w', nom: 'granulats' },
    { id: 'c', nom: 'carrières' }
  ],
  geoSystemes: [
    { id: 'ifr', nom: 'Ifremer' },
    { id: 'dge', nom: 'DGEC' }
  ],
  unites: [],
  devises: [],
  substances: [],
  entreprises: {
    elements: [
      { id: 'ent-1', nom: '1' },
      { id: 'ent-2', nom: '2' }
    ]
  }
}

const titreEtapeMetasRes = {
  etapesTypes: [
    { id: 'w', nom: 'granulats' },
    { id: 'c', nom: 'carrières' }
  ],
  geoSystemes: [
    { id: 'ifr', nom: 'Ifremer' },
    { id: 'dge', nom: 'DGEC' }
  ],
  unites: [],
  devises: [],
  substances: [],
  entreprises: [
    { id: 'ent-1', nom: '1' },
    { id: 'ent-2', nom: '2' }
  ]
}

const titreEtapeEdition = {
  id: 'etape-id',
  titreDemarcheId: 'demarche-id',
  date: '2020-01-01',
  duree: { ans: null, mois: null },
  amodiataires: [],
  titulaires: [],
  contenu: {},
  geoSystemeIds: [],
  geoSystemeOpposableId: null,
  groupes: [],
  incertitudes: {},
  statutId: '',
  substances: [],
  documents: []
}

const titreEtapeCreation = {
  titreDemarcheId: 'demarche-id',
  date: '2020-01-01',
  duree: { ans: null, mois: null },
  amodiataires: [],
  titulaires: [],
  contenu: {},
  geoSystemeIds: [],
  geoSystemeOpposableId: null,
  groupes: [],
  incertitudes: {},
  statutId: '',
  substances: [],
  documents: []
}

const titreEtapeHeritage1 = {
  date: undefined,
  incertitudes: {
    date: undefined
  },
  statutId: '',
  titreDemarcheId: 'demarche-id',
  typeId: 'new-etape-type-id',
  dateDebut: undefined,
  dateFin: undefined,
  duree: {
    ans: null,
    mois: null
  },
  surface: undefined,
  amodiataires: [],
  titulaires: [],
  groupes: [],
  substances: [],
  geoSystemeIds: [],
  geoSystemeOpposableId: null,
  contenu: {
    sectionId1: { elementId1: 'valeur', elementId2: 'valeur' },
    sectionId2: {}
  },
  heritageProps: {},
  heritageContenu: {
    sectionId1: {
      elementId1: { etape: { id: 'etape-id' }, actif: true },
      elementId2: { etape: { id: 'etape-id' }, actif: false }
    },
    sectionId2: {
      elementId1: { etape: { id: 'etape-id' }, actif: true }
    }
  }
}

const titreEtapeHeritageRes1 = {
  type: {
    id: 'new-etape-type-id'
  },
  heritageProps: {},
  heritageContenu: {
    sectionId1: {
      elementId1: { etape: { id: 'etape-id' }, actif: true },
      elementId2: { etape: { id: 'etape-id' }, actif: false }
    },
    sectionId2: {
      elementId1: { etape: { id: 'etape-id' }, actif: true }
    },
    sectionId3: {}
  },
  contenu: {
    sectionId1: { elementId1: 'valeur', elementId2: 'valeur' }
  }
}

const titreEtapeHeritage2 = {
  amodiataires: [],
  date: '2020-01-01',
  dateDebut: undefined,
  dateFin: undefined,
  duree: { ans: null, mois: null },
  geoSystemeIds: [],
  geoSystemeOpposableId: null,
  groupes: [],
  heritageProps: {},
  incertitudes: { date: undefined },
  statutId: '',
  substances: [],
  surface: undefined,
  titreDemarcheId: 'demarche-id',
  titulaires: [],
  typeId: 'new-etape-type-id'
}

const titreEtapeHeritageRes2 = {
  type: {
    id: 'new-etape-type-id'
  },
  heritageProps: {},
  heritageContenu: {},
  contenu: {}
}

export {
  titreEtapeMetas,
  titreEtapeMetasRes,
  titreEtapeEdition,
  titreEtapeCreation,
  titreEtapeHeritage1,
  titreEtapeHeritageRes1,
  titreEtapeHeritage2,
  titreEtapeHeritageRes2
}
