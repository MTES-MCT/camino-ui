import Vue from 'vue'

import { utilisateur } from '../api/utilisateurs'

export const state = {
  current: null
}

export const actions = {
  async get({ commit, dispatch }, id) {
    commit('loadingAdd', 'utilisateur', { root: true })

    try {
      const data = await utilisateur({ id })

      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'utilisateur', { root: true })
    }
  }
}

export const mutations = {
  set(state, utilisateur) {
    Vue.set(state, 'current', utilisateur)
  },

  reset(state) {
    Vue.set(state, 'current', null)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
