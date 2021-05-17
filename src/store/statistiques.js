import {
  statistiquesGlobales,
  statistiquesGuyane,
  statistiquesGranulatsMarins
} from '../api/statistiques'

const state = {
  globales: {},
  guyane: {},
  granulatsMarins: {}
}

const actions = {
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

      commit('set', { section: section, data: data[Object.keys(data)[0]] })
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'statistiquesGet', { root: true })
    }
  }
}

const mutations = {
  set(state, { section, data }) {
    state[section] = data
  }
}

export default { namespaced: true, state, actions, mutations }
