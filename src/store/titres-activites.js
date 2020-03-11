import Vue from 'vue'

import { activites, metasActivites } from '../api/titres-activites'

export const state = {
  list: [],
  metas: {
    activitesTypes: []
  }
}

export const actions = {
  async metasGet({ commit, dispatch }) {
    commit('loadingAdd', 'metasActivites', { root: true })

    try {
      const data = await metasActivites()

      commit('metasSet', { activitesTypes: data })
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'metasActivites', { root: true })
    }
  },

  async get({ dispatch, commit }, { annee, typeId }) {
    commit('loadingAdd', 'activites', { root: true })

    try {
      console.log('get', annee, typeId)
      const data = await activites({ annee, typeId })

      if (data) {
        commit('set', data)
      }
    } catch (e) {
      dispatch('pageError', null, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'activites', { root: true })
    }
  }
}

export const mutations = {
  set(state, activites) {
    Vue.set(state, 'list', activites)
  },

  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      Vue.set(state.metas, id, data[id])
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
