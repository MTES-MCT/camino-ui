import Vue from 'vue'
import api from './_api.js'

export const state = {
  list: null,
  mockGeodata: null
}

export const actions = {
  get({ commit }) {
    return api.titresGet().then(titres => {
      commit('set', titres)
    })
  },

  mockGeodataGet({ commit }) {
    return api.mockGeodataGet().then(geodata => {
      commit('mockGeodataSet', geodata)
      return geodata
    })
  },

  mocksGet() {
    return api.mockGeodataGet().then(geodata => {
      return geodata
    })
  }
}

export const getters = {}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'list', titres)
  },

  mockGeodataSet(state, geodata) {
    Vue.set(state, 'mockGeodata', geodata)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
