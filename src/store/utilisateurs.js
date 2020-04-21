import Vue from 'vue'

import { utilisateurs } from '../api/utilisateurs'

export const state = {
  list: []
}

export const actions = {
  async get({ dispatch, commit }) {
    commit('loadingAdd', 'utilisateurs', { root: true })

    try {
      const data = await utilisateurs({})
      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'utilisateurs', { root: true })
    }
  }
}

export const mutations = {
  set(state, utilisateurs) {
    Vue.set(state, 'list', utilisateurs)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
