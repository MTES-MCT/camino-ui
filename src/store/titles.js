import Vue from 'vue'
import api from '../api'

export const state = {
  list: null
}

export const actions = {
  async get({ commit }) {
    const titres = await api.titresGet()
    commit('set', titres)
  }
}

export const getters = {}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'list', titres)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
