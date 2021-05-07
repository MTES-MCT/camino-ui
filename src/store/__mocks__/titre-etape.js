const titreEtapeMetas = {
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
  },
  demarche: {
    id: 'demarche-id',
    type: { nom: 'nom de la démarche' },
    titre: { nom: 'nom du titre', domaine: { id: 'm' } }
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
  ],
  demarche: {
    id: 'demarche-id',
    type: { nom: 'nom de la démarche' },
    titre: { nom: 'nom du titre', domaine: { id: 'm' } }
  }
}

const titreEtapeMetasRes2 = {
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
  ],
  demarche: {
    id: 'demarche-id',
    type: { nom: 'nom de la démarche' },
    titre: { nom: 'nom du titre', domaine: { id: 'm' } }
  },
  etapesTypes: []
}

const titreEtapeEtapesTypes = [
  { id: 'w', nom: 'granulats' },
  { id: 'c', nom: 'carrières' }
]

const titreEtapeEdited = {
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
  documents: [],
  justificatifs: []
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
  documents: [],
  justificatifs: []
}

const titreEtapeHeritage1 = {
  etapeHeritage: {
    id: 'etape-id',
    titreDemarcheId: 'demarche-id',
    date: '2020-01-02',
    incertitudes: {
      date: undefined
    },
    statutId: '',
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
}

const titreEtapeHeritageRes1 = {
  etapeHeritage: {
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
  },
  documents: []
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
    contenu: {
      sectionId1: { elementId1: 'valeur', elementId2: 'valeur' }
    }
  }
}

const titreEtapeHeritage2 = {
  date: '2020-01-01',
  incertitudes: { date: undefined },
  statutId: '',
  titreDemarcheId: 'demarche-id',
  typeId: 'new-etape-type-id',
  documents: [],
  id: undefined
}

const titreEtapeHeritageRes2 = {
  etapeHeritage: {
    type: {
      id: 'new-etape-type-id'
    },
    heritageProps: {},
    heritageContenu: {},
    contenu: {}
  }
}

export {
  titreEtapeMetas,
  titreEtapeEtapesTypes,
  titreEtapeMetasRes,
  titreEtapeMetasRes2,
  titreEtapeEdited,
  titreEtapeCreation,
  titreEtapeHeritage1,
  titreEtapeHeritageRes1,
  titreEtapeHeritage2,
  titreEtapeHeritageRes2
}
