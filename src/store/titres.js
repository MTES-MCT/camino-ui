import Vue from 'vue'

import { titres } from '../api/titres'
import { paramsArrayBuild, paramsStringBuild } from './_utils'

export const state = {
  list: [],
  params: {
    arrays: ['typesIds', 'domainesIds', 'statutsIds'],
    strings: ['substances', 'noms', 'entreprises', 'references', 'territoires']
  }
}

export const actions = {
  async get({ state, dispatch, commit }, params) {
    commit('loadingAdd', 'titres', { root: true })

    try {
      const p = Object.assign(
        paramsArrayBuild(state.params.arrays, params),
        paramsStringBuild(state.params.strings, params)
      )

      const data = await titres(p)

      dispatch(
        'messageAdd',
        {
          value: `liste de titres mise à jour`,
          type: 'success'
        },
        { root: true }
      )

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
