import {
  statistiquesGlobales,
  statistiquesGuyane,
  statistiquesGranulatsMarins
} from '../api/statistiques'

import { oneData } from '../utils'

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
        data = oneData(await statistiquesGlobales())
      } else if (section === 'guyane') {
        data = oneData(await statistiquesGuyane())
      } else if (section === 'granulatsMarins') {
        data = oneData(await statistiquesGranulatsMarins())
      }

      commit('set', { section: section, data })
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
