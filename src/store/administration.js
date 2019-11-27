import Vue from 'vue'
import { administration } from '../api/administrations'

export const state = {
  current: null
}

export const actions = {
  async get({ commit, dispatch }, id) {
    commit('loadingAdd', 'administration', { root: true })

    try {
      const data = await administration({ id })

      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'administration', { root: true })
    }
  }
}

export const mutations = {
  set(state, administration) {
    Vue.set(state, 'current', administration)
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
