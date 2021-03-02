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
  substances: []
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
  substances: []
}

const titreEtapeHeritage1 = {
  date: '2020-01-01',
  incertitudes: {
    date: undefined
  },
  statutId: '',
  titreDemarcheId: 'demarche-id',
  typeId: 'etape-type-id',
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
    sectionId: { elementId1: 'valeur', elementId2: 'valeur' }
  },
  heritageProps: {},
  heritageContenu: {
    sectionId: {
      elementId1: { etape: { id: 'etape-id' }, actif: true },
      elementId2: { etape: { id: 'etape-id' }, actif: true }
    }
  }
}

const titreEtapeHeritageRes1 = {
  heritageProps: {},
  heritageContenu: {
    sectionId: {
      elementId1: { etape: { id: 'etape-id' }, actif: true },
      elementId2: { etape: { id: 'etape-id' }, actif: true }
    }
  },
  contenu: {
    sectionId: { elementId1: 'valeur', elementId2: 'valeur' }
  }
}

export {
  titreEtapeMetas,
  titreEtapeMetasRes,
  titreEtapeEdition,
  titreEtapeCreation,
  titreEtapeHeritage1,
  titreEtapeHeritageRes1
}
