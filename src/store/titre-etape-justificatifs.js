import Vue from 'vue'

import { etapeJustificatifsModifier } from '../api/titres-etapes'
import { documents } from '../api/documents'

export const state = {
  metas: {
    documents: []
  }
}

export const actions = {
  async metasGet({ commit }, entreprisesIds) {
    commit('loadingAdd', 'metasTitreEtapeJustificatifsGet', { root: true })

    try {
      const data = await documents({ entreprisesIds })

      console.log(data)

      commit('metasSet', data)
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'metasTitreEtapeJustificatifsGet', { root: true })
    }
  },

  async update({ commit, dispatch }, { id, documentsIds, context }) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreEtapeJustificatifsUpdate', { root: true })

    try {
      const data = await etapeJustificatifsModifier({ id, documentsIds })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', context, { root: true })
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeJustificatifsUpdate', { root: true })
    }
  }
}

export const mutations = {
  metasSet(state, data) {
    Vue.set(state.metas, 'documents', data)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
