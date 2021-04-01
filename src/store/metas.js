import metasIndex from './metas-definitions'

export const state = {
  total: 0,
  params: [
    { id: 'colonne', type: 'string', elements: ['id', 'nom'] },
    { id: 'ordre', type: 'string', elements: ['asc', 'desc'] }
  ],
  preferences: {
    table: { ordre: 'asc', colonne: null }
  }
}

export const actions = {
  async paramsSet({ commit }, { section, params }) {
    commit('paramsSet', { section, params })
  }
}

export const getters = {
  elements(state) {
    const elements = Object.keys(metasIndex).map(id => ({
      id,
      nom: metasIndex[id].nom
    }))

    return state.preferences.table.ordre === 'desc'
      ? elements.reverse()
      : elements
  }
}

export const mutations = {
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
