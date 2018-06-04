import Vue from 'vue'
import { titres } from '../api'

export const state = {
  list: null
}

export const actions = {
  async get({ commit }) {
    const t = await titres()
    commit('set', t)
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
