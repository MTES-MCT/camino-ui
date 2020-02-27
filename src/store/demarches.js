import Vue from 'vue'

import { demarches } from '../api/demarches'
import { paramsArrayBuild, paramsStringBuild } from './_utils'

export const state = {
  list: [],
  params: {
    arrays: [
      'typesIds',
      'statutsIds',
      'titresDomainesIds',
      'titresTypesIds',
      'titresStatutsIds'
    ],
    strings: ['page', 'intervalle', 'colonne', 'ordre']
  }
}

export const actions = {
  async get({ state, dispatch, commit }, params) {
    commit('loadingAdd', 'demarches', { root: true })

    try {
      const p = Object.assign(
        paramsArrayBuild(state.params.arrays, params),
        paramsStringBuild(state.params.strings, params)
      )

      const data = await demarches(p)

      dispatch(
        'messageAdd',
        {
          value: `liste de demarches mise à jour`,
          type: 'success'
        },
        { root: true }
      )

      commit('set', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
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
