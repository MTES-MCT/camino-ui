import Vue from 'vue'
import { entreprises } from '../api'

export const state = {
  current: null,
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

export const getters = {}

const stringCompare = (a, b) => (a > b ? 1 : a < b ? -1 : 0)

export const mutations = {
  set(state, entreprises) {
    Vue.set(
      state,
      'list',
      entreprises.sort((a, b) => {
        if (!a.nom && !b.nom) return stringCompare(a, b)
        if (!a.nom && b.nom) return 1
        if (a.nom && !b.nom) return -1
        return stringCompare(a.nom, b.nom)
      })
    )
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
