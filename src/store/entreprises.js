import Vue from 'vue'

export const state = {
  current: null,
  list: []
}

export const actions = {}

export const getters = {}

const stringCompare = (a, b) => (a > b ? 1 : a < b ? -1 : 0)

export const mutations = {
  set(state, entreprises) {
    Vue.set(
      state,
      'list',
      entreprises.sort((a, b) => {
        if (!a.nom && !b.nom) return stringCompare(a, b)
        if (!a.nom && b.nom) return 1
        if (a.nom && !b.nom) return -1
        return stringCompare(a.nom, b.nom)
      })
    )
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
