import Vue from 'vue'
import { administrations } from '../api'

export const state = {
  list: []
}

export const actions = {
  async get({ dispatch, commit }) {
    commit('loadingAdd', 'administrations', { root: true })

    try {
      const res = await administrations({})
      if (res) {
        commit('set', res)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'administrations', { root: true })
    }
  }
}

export const getters = {}

const stringCompare = (a, b) => (a > b ? 1 : a < b ? -1 : 0)

export const mutations = {
  set(state, administrations) {
    Vue.set(
      state,
      'list',
      administrations.sort((a, b) => {
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
