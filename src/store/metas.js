import Vue from 'vue'

export const state = {
  types: [],
  domaines: [],
  statuts: []
}

export const actions = {}

export const getters = {}

export const mutations = {
  set(state, response) {
    Object.keys(response).forEach(id => {
      Vue.set(state, id, response[id])
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
