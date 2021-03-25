import metasIndex from './metas-definitions'

export const state = {
  total: 0,
  params: [
    { id: 'colonne', type: 'string', elements: ['id', 'nom'] },
    { id: 'ordre', type: 'string', elements: ['asc', 'desc'] }
  ],
  preferences: {
    table: { ordre: 'asc', colonne: null }
  },
  loaded: {
    url: false
  }
}

export const actions = {
  async preferencesSet({ commit }, { section, params }) {
    commit('preferencesSet', { section, params })
  },

  async urlLoad({ state, commit }) {
    if (!state.loaded.url) {
      commit('load', 'url')
    }
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
    state.list = []
    state.total = 0
    state.loaded.url = false
  },

  set(state, data) {
    state.list = data.elements
    state.total = data.total
  },

  preferencesSet(state, { section, params }) {
    Object.keys(params).forEach(id => {
      state.preferences[section][id] = params[id]
    })
  },

  load(state, section) {
    state.loaded[section] = true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
