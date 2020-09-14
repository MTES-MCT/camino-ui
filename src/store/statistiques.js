import Vue from 'vue'
import { statistiques } from '../api/statistiques'

export const state = {
  statistiquesGlobales: {},
  tbGuyane: {},
  loaded: false
}

export const actions = {
  async get({ commit, dispatch }) {
    commit('loadingAdd', 'statistiques', { root: true })

    try {
      const data = await statistiques()

      if (data) {
        commit('set', data)
      } else {
        commit('set', {})
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'statistiques', { root: true })
    }
  }
}

export const mutations = {
  set(state, data) {
    if (data.statistiquesGlobales) {
      const statistiquesGlobales = { ...data.statistiquesGlobales }
      statistiquesGlobales.loaded = true
      Vue.set(state, 'statistiquesGlobales', statistiquesGlobales)
    }
    if (data.tbGuyane) {
      const tbGuyane = { ...data.tbGuyane }
      tbGuyane.loaded = true
      Vue.set(state, 'tbGuyane', tbGuyane)
    }
  }
}

export default { namespaced: true, state, actions, mutations }
