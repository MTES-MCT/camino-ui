import Vue from 'vue'
import api from './_api.js'

export const state = {
  list: null
}

export const actions = {
  get({ commit }) {
    return api.titresGet().then(titres => {
      commit('set', titres)
    })
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
