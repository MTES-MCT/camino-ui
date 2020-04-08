import Vue from 'vue'
import { entreprises } from '../api/entreprises'

export const state = {
  list: []
}

export const actions = {
  async get({ dispatch, commit }) {
    commit('loadingAdd', 'entreprises', { root: true })

    try {
      const data = await entreprises({})

      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'entreprises', { root: true })
    }
  }
}

export const mutations = {
  set(state, entreprises) {
    Vue.set(
      state,
      'list',
      entreprises.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
    )
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
