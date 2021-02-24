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

export {
  titreEtapeMetas,
  titreEtapeMetasRes,
  titreEtapeEdition,
  titreEtapeCreation
}
