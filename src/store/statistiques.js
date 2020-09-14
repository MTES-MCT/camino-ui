import Vue from 'vue'
import { statistiquesGlobales, statistiquesGuyane } from '../api/statistiques'

export const state = {
  globales: {},
  guyane: {}
}

export const actions = {
  async get({ commit, dispatch }, section) {
    try {
      commit('loadingAdd', 'statistiquesGet', { root: true })

      let data
      if (section === 'globales') {
        data = await statistiquesGlobales()
      } else if (section === 'guyane') {
        data = await statistiquesGuyane()
      }

      commit('set', { section: section, data })
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'statistiquesGet', { root: true })
    }
  }
}

export const mutations = {
  set(state, { section, data }) {
    Vue.set(state, section, data)
  }
}

export default { namespaced: true, state, actions, mutations }
