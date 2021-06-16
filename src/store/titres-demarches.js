import { demarchesMetas, demarches } from '../api/titres-demarches'
import { listeActionsBuild, listeMutations } from './_liste-build'

const state = {
  elements: [],
  total: 0,
  metas: {
    types: [],
    statuts: [],
    etapesTypes: [],
    titresTypes: [],
    titresDomaines: [],
    titresStatuts: []
  },
  definitions: [
    { id: 'typesIds', type: 'strings', values: [] },
    { id: 'statutsIds', type: 'strings', values: [] },
    { id: 'etapesInclues', type: 'objects', values: [] },
    { id: 'etapesExclues', type: 'objects', values: [] },
    { id: 'titresDomainesIds', type: 'strings', values: [] },
    { id: 'titresTypesIds', type: 'strings', values: [] },
    { id: 'titresStatutsIds', type: 'strings', values: [] },
    { id: 'titresNoms', type: 'string' },
    { id: 'titresEntreprises', type: 'string' },
    { id: 'titresSubstances', type: 'string' },
    { id: 'titresReferences', type: 'string' },
    { id: 'titresTerritoires', type: 'string' },
    { id: 'page', type: 'number', min: 0 },
    { id: 'intervalle', type: 'number', min: 10, max: 500 },
    {
      id: 'colonne',
      type: 'string',
      values: [
        'titreNom',
        'titreDomaine',
        'titreType',
        'titreStatut',
        'type',
        'statut',
        'reference'
      ]
    },
    {
      id: 'ordre',
      type: 'string',
      values: ['asc', 'desc']
    }
  ],
  params: {
    table: {
      page: 1,
      intervalle: 200,
      ordre: 'asc',
      colonne: null
    },
    filtres: {
      typesIds: [],
      statutsIds: [],
      etapesInclues: [],
      etapesExclues: [],
      titresDomainesIds: [],
      titresTypesIds: [],
      titresStatutsIds: [],
      titresNoms: '',
      titresEntreprises: '',
      titresSubstances: '',
      titresReferences: '',
      titresTerritoires: ''
    }
  },
  initialized: false,
  useUrl: true
}

const actions = listeActionsBuild(
  'titresDemarches',
  'démarches',
  demarches,
  demarchesMetas
)

const mutations = Object.assign({}, listeMutations, {
  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      let metaId
      let paramsIds

      if (id === 'demarchesTypes') {
        metaId = 'types'
        paramsIds = ['typesIds']
      } else if (id === 'demarchesStatuts') {
        metaId = 'statuts'
        paramsIds = ['statutsIds']
      } else if (id === 'etapesTypes') {
        metaId = 'etapesTypes'
        paramsIds = ['etapesInclues', 'etapesExclues']
      } else if (id === 'statuts') {
        metaId = 'titresStatuts'
        paramsIds = ['titresStatutsIds']
      } else if (id === 'types') {
        metaId = 'titresTypes'
        paramsIds = ['titresTypesIds']
      } else if (id === 'domaines') {
        metaId = 'titresDomaines'
        paramsIds = ['titresDomainesIds']
      }

      if (metaId) {
        state.metas[metaId] = data[id]
      }

      if (paramsIds) {
        paramsIds.forEach(paramId => {
          const definition = state.definitions.find(p => p.id === paramId)
          definition.values = data[id].map(e => e.id)
        })
      }
    })
  }
})

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
