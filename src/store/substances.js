import Vue from 'vue'

export const state = {
  list: []
}

export const actions = {
  set({ commit }, substances) {
    commit('set', substances)
  }
}

export const getters = {}

export const mutations = {
  set(state, substances) {
    Vue.set(state, 'list', substances)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
