import Vue from 'vue'

export const state = {
  current: null,
  list: []
}

export const actions = {}

export const getters = {}

export const mutations = {
  set(state, entreprises) {
    Vue.set(state, 'list', entreprises)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
