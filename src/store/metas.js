import Vue from 'vue'
import metasIndex from './metas-definitions'

export const state = {
  list: Object.keys(metasIndex).map(id => ({ id, nom: metasIndex[id].nom })),
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

export const mutations = {
  reset(state) {
    Vue.set(state, 'list', [])
    state.total = 0
    state.loaded.url = false
  },

  set(state, data) {
    Vue.set(state, 'list', data.elements)
    Vue.set(state, 'total', data.total)
  },

  preferencesSet(state, { section, params }) {
    Object.keys(params).forEach(id => {
      Vue.set(state.preferences[section], id, params[id])
    })
  },

  load(state, section) {
    state.loaded[section] = true
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
