import {
  statistiquesGlobales,
  statistiquesGuyane,
  statistiquesGranulatsMarins
} from '../api/statistiques'

export const state = {
  globales: {},
  guyane: {},
  granulatsMarins: {}
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
      } else if (section === 'granulatsMarins') {
        data = await statistiquesGranulatsMarins()
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
    state[section] = data
  }
}

export default { namespaced: true, state, actions, mutations }
