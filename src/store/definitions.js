import Vue from 'vue'

import { definitions } from '../api/definitions'

export const state = {
  list: []
}

export const actions = {
  async get({ state, dispatch, commit }) {
    commit('loadingAdd', 'glossaire', { root: true })

    try {
      const data = await definitions()

      commit('set', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'glossaire', { root: true })
    }
  }
}

export const mutations = {
  set(state, data) {
    Vue.set(state, 'list', data)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
