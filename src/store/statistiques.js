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

      let res
      let data
      if (section === 'globales') {
        res = await statistiquesGlobales()
        data = res ? res.statistiquesGlobales : null
      } else if (section === 'guyane') {
        res = await statistiquesGuyane()
        data = res ? res.statistiquesGuyane : null
      } else if (section === 'granulatsMarins') {
        res = await statistiquesGranulatsMarins()
        data = res ? res.statistiquesGranulatsMarins : null
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
