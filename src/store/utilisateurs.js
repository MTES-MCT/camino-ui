import Vue from 'vue'
import { utilisateurs } from '../api'

export const state = {
  list: []
}

export const actions = {
  async get({ state, dispatch, commit }) {
    const data = await utilisateurs({})

    if (data) {
      commit('set', data)
    } else {
      dispatch('apiError', null, { root: true })
    }
  }
}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'list', titres)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
