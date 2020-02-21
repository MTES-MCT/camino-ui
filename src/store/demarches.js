import Vue from 'vue'

import { demarches } from '../api/demarches'
import { paramsBuild } from './_utils'

export const state = {
  list: [],
  filterIds: [
    'typeIds',
    'statutIds',
    'titresDomaineIds',
    'titresTypeIds',
    'titresStatutIds'
  ]
}

export const actions = {
  async get({ state, dispatch, commit, rootState }) {
    commit('loadingAdd', 'demarches', { root: true })

    try {
      const params = paramsBuild(
        state.filterIds,
        rootState.user.preferences.demarches
      )

      const data = await demarches(params)

      if (data) {
        commit('set', data)
      }
    } catch (e) {
      dispatch('pageError', null, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'demarches', { root: true })
    }
  }
}

export const mutations = {
  set(state, demarches) {
    Vue.set(state, 'list', demarches)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
