import Vue from 'vue'

import { utilisateur } from '@/api'

export const state = {
  current: null
}

export const actions = {
  async get({ commit, dispatch }, id) {
    commit('loadingAdd', 'utilisateur', { root: true })

    try {
      const res = await utilisateur(id)

      if (res) {
        commit('set', res)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
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
