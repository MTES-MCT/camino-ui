import Vue from 'vue'
import { entreprises } from '../api'

export const state = {
  list: []
}

export const actions = {
  async get({ dispatch, commit }) {
    commit('loadingAdd', 'entreprises', { root: true })

    try {
      const res = await entreprises({})
      if (res) {
        commit('set', res)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
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
  },

  add(state, entreprise) {
    state.list.push(entreprise)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
