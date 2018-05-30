import Vue from 'vue'
import api from '../api'

export const state = {
  list: null,
  mocks: {}
}

export const actions = {
  async get({ commit }) {
    const titres = await api.titresGet()
    commit('set', titres)
  },

  mockRntmGet({ commit }) {
    return api.mockRntmGet().then(geodata => {
      commit('mockRntmSet', geodata)
      return geodata
    })
  },

  mockGet({ commit }, id) {
    return api.mockGet(id).then(geodata => {
      commit('mockSet', { id, geodata })
      return geodata
    })
  }
}

export const getters = {}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'list', titres)
  },

  mockSet(state, { id, geodata }) {
    Vue.set(state.mocks, id, geodata)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
