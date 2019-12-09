import Vue from 'vue'

import { activites } from '../api/activites'

export const state = {
  list: []
}

export const actions = {
  async get({ dispatch, commit }, { annee, typeId }) {
    commit('loadingAdd', 'activites', { root: true })

    try {
      const data = await activites({ annee, typeId })

      if (data) {
        commit('set', data)
      }
    } catch (e) {
      dispatch('pageError', null, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'activites', { root: true })
    }
  }
}

export const mutations = {
  set(state, activites) {
    Vue.set(state, 'list', activites)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
