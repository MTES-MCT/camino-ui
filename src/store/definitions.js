import Vue from 'vue'

import { definitions } from '../api/definitions'

export const state = {}

export const actions = {
  async get({ state, dispatch, commit }) {
    commit('loadingAdd', 'glossaire', { root: true })

    try {
      const data = await definitions()
      console.log('data :>> ', data)

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
