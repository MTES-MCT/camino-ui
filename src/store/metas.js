import metasIndex from './metas-definitions'

const state = {
  total: 0,
  definitions: [
    { id: 'colonne', type: 'string', elements: ['id', 'nom'] },
    { id: 'ordre', type: 'string', elements: ['asc', 'desc'] }
  ],
  params: {
    table: { ordre: 'asc', colonne: null }
  }
}

const actions = {
  async paramsSet({ commit }, { section, params }) {
    commit('paramsSet', { section, params })
  }
}

const getters = {
  elements(state) {
    const elements = Object.keys(metasIndex).map(id => ({
      id,
      nom: metasIndex[id].nom
    }))

    return state.params.table.ordre === 'desc' ? elements.reverse() : elements
  }
}

const mutations = {
  reset(state) {
    state.elements = []
    state.total = 0
  },

  set(state, data) {
    state.elements = data.elements
    state.total = data.total
  },

  paramsSet(state, { section, params }) {
    Object.keys(params).forEach(id => {
      state.preferences[section][id] = params[id]
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
