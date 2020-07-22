import Vue from 'vue'

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
} from '../api/definitions'

const definitionsIndex = {
  domaines: domaines,
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

export const state = {
  elements: [],
  entrees: []
}

export const actions = {
  async get({ dispatch, commit }) {
    commit('loadingAdd', 'glossaire', { root: true })

    try {
      const data = await definitions()

      commit('set', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'glossaire', { root: true })
    }
  },

  async entreesGet({ state, dispatch, commit }, slug) {
    commit('loadingAdd', 'definition', { root: true })

    try {
      if (definitionsIndex[slug]) {
        const data = await definitionsIndex[slug]()
        commit('entreesSet', data)
      } else {
        commit('entreesSet', [])
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'definition', { root: true })
    }
  }
}

export const mutations = {
  set(state, data) {
    Vue.set(state, 'elements', data)
  },

  entreesSet(state, data) {
    Vue.set(state, 'entrees', data)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
