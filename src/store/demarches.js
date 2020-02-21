import Vue from 'vue'

import { demarches } from '../api/demarches'

export const state = {
  list: []
}

export const actions = {
  async get({ dispatch, commit }) {
    commit('loadingAdd', 'demarches', { root: true })

    try {
      const data = await demarches()

      if (data) {
        commit('set', data)
      }
    } catch (e) {
      dispatch('pageError', null, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'demarches', { root: true })
    }
  }
}

export const mutations = {
  set(state, demarches) {
    Vue.set(state, 'list', demarches)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
