import { entreprises } from '../api/entreprises'
import { listeActionsBuild, listeMutations } from './_liste-build'

const state = {
  elements: [],
  total: 0,
  definitions: [
    { id: 'page', type: 'number', min: 0 },
    { id: 'intervalle', type: 'number', min: 10, max: 500 },
    {
      id: 'colonne',
      type: 'string',
      values: ['nom', 'siren']
    },
    {
      id: 'ordre',
      type: 'string',
      values: ['asc', 'desc']
    },
    { id: 'noms', type: 'string' }
  ],
  params: {
    table: {
      page: 1,
      intervalle: 200,
      ordre: 'asc',
      colonne: null
    },
    filtres: { noms: '' }
  },
  initialized: false,
  useUrl: true
}

const actions = listeActionsBuild('entreprises', 'entreprises', entreprises)

const mutations = Object.assign({}, listeMutations)

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
