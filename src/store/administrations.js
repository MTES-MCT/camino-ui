import { administrations, administrationsMetas } from '../api/administrations'
import { listeActionsBuild, listeMutations } from './_liste-build.js'

const state = {
  elements: [],
  total: 0,
  metas: {
    types: []
  },
  definitions: [
    { id: 'page', type: 'number', min: 0 },
    { id: 'intervalle', type: 'number', min: 10, max: 500 },
    { id: 'colonne', type: 'string', values: ['nom', 'type', 'abreviation'] },
    { id: 'ordre', type: 'string', values: ['asc', 'desc'] },
    { id: 'typesIds', type: 'strings', values: [] },
    { id: 'noms', type: 'string' }
  ],
  params: {
    table: { page: 1, intervalle: 200, ordre: 'asc', colonne: null },
    filtres: { noms: '', typesIds: [] }
  },
  initialized: false,
  useUrl: true
}

const actions = listeActionsBuild(
  'administrations',
  'administrations',
  administrations,
  administrationsMetas
)

const mutations = Object.assign({}, listeMutations, {
  metasSet(state, data) {
    const metas = { types: data }
    Object.keys(metas).forEach(id => {
      const paramsIds = ['typesIds']

      state.metas[id] = metas[id]

      paramsIds.forEach(paramId => {
        const definition = state.definitions.find(p => p.id === paramId)

        definition.values = metas[id].map(e => e.id)
      })
    })
  }
})

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
