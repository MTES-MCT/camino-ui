import {
  definitions,
  domaines,
  demarchesStatuts,
  demarchesTypes,
  etapesTypes,
  etapesStatuts,
  substancesLegales,
  titresStatuts,
  titresTypesTypes
} from '../api/metas'

import { oneData } from '../utils'

const definitionsIndex = {
  domaines,
  'titre-minier': '',
  'autorisation-miniere': '',
  'demarches-statuts': demarchesStatuts,
  'demarches-types': demarchesTypes,
  'etapes-types': etapesTypes,
  'etapes-statuts': etapesStatuts,
  'substances-legales': substancesLegales,
  'titres-statuts': titresStatuts,
  'titres-types': titresTypesTypes
}

const state = {
  elements: [],
  entrees: []
}

const actions = {
  async get({ dispatch, commit }) {
    commit('loadingAdd', 'definitions', { root: true })

    try {
      const data = oneData(await definitions())

      commit('set', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'definitions', { root: true })
    }
  },

  async entreesGet({ state, dispatch, commit }, slug) {
    commit('loadingAdd', 'definition', { root: true })

    try {
      if (definitionsIndex[slug]) {
        const data = oneData(await definitionsIndex[slug]())

        commit('entreesSet', data)
      } else {
        commit('entreesSet', [])
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'definition', { root: true })
    }
  }
}

const mutations = {
  set(state, data) {
    state.elements = data
  },

  entreesSet(state, data) {
    state.entrees = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
