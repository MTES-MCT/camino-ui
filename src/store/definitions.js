import Vue from 'vue'

import {
  definitions,
  domaines,
  demarchesStatuts,
  demarchesTypes,
  etapesTypes,
  etapesStatuts,
  substancesLegalesCodes,
  titresStatuts,
  titresTypesTypes
} from '../api/definitions'

const definitionsIndex = {
  domaines: domaines,
  'demarches-statuts': demarchesStatuts,
  'demarches-types': demarchesTypes,
  'etapes-types': etapesTypes,
  'etapes-statuts': etapesStatuts,
  substances: substancesLegalesCodes,
  'titres-statuts': titresStatuts,
  'titres-types': titresTypesTypes
}

export const state = {
  elements: [],
  sections: []
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

  async sectionGet({ state, dispatch, commit }, slug) {
    commit('loadingAdd', 'definition', { root: true })

    try {
      if (!definitionsIndex[slug]) {
        const data = await definitionsIndex[slug]()
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
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

  sectionSet(state, data) {
    Vue.set(state, 'sections', data)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
