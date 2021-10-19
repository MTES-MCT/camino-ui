import { journaux } from '../api/journaux'
import { listeActionsBuild, listeMutations } from './_liste-build'

const state = {
  elements: [],
  total: 0,
  definitions: [
    { id: 'page', type: 'number', min: 0 },
    { id: 'intervalle', type: 'number', min: 10, max: 500 },
    { id: 'ordre', type: 'string', values: ['asc', 'desc'] },
    { id: 'recherche', type: 'string' },
    { id: 'titreId', type: 'string' }
  ],
  params: {
    table: { page: 1, intervalle: 50 },
    filtres: { recherche: '' }
  },
  initialized: false
}

const actions = listeActionsBuild('journaux', 'journaux', journaux)
const mutations = Object.assign({}, listeMutations)

export default { namespaced: true, state, actions, mutations }
