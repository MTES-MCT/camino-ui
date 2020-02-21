import Vue from 'vue'

import { titres } from '../api/titres'
import { paramsBuild } from './_utils'

export const state = {
  list: [],
  filterIds: [
    'substances',
    'noms',
    'entreprises',
    'references',
    'territoires',
    'typeIds',
    'domaineIds',
    'statutIds'
  ]
}

export const actions = {
  async get({ state, dispatch, commit, rootState }) {
    commit('loadingAdd', 'titres', { root: true })

    try {
      const params = paramsBuild(
        state.filterIds,
        rootState.user.preferences.titres
      )

      const data = await titres(params)

      if (state.list.length) {
        dispatch(
          'messageAdd',
          {
            value: `liste de titres mise à jour`,
            type: 'success'
          },
          { root: true }
        )
      }

      commit('set', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'titres', { root: true })
    }
  }
}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'list', titres)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
