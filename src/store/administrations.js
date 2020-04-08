import Vue from 'vue'

import { administrations } from '../api/administrations'

export const state = {
  list: []
}

export const actions = {
  async get({ dispatch, commit }) {
    commit('loadingAdd', 'administrations', { root: true })

    try {
      const data = await administrations()
      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'administrations', { root: true })
    }
  }
}

export const mutations = {
  set(state, administrations) {
    Vue.set(
      state,
      'list',
      administrations.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
    )
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
