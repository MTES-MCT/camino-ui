import Vue from 'vue'

import {
  etapeJustificatifsAssocier,
  etapeEntreprises,
  etapeJustificatifDissocier
} from '../api/titres-etapes'

export const state = {
  metas: {
    entreprises: []
  }
}

export const actions = {
  async metasGet({ commit }, id) {
    commit('loadingAdd', 'metasTitreEtapeJustificatifsMetasGet', { root: true })

    try {
      const data = await etapeEntreprises({ etapeId: id })

      commit('metasSet', data)
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'metasTitreEtapeJustificatifsMetasGet', {
        root: true
      })
    }
  },

  async update({ commit, dispatch }, { id, documentsIds, context }) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreEtapeJustificatifsUpdate', { root: true })

    try {
      await etapeJustificatifsAssocier({ id, documentsIds })

      commit('popupClose', null, { root: true })

      dispatch(
        'messageAdd',
        { value: `le titre a été mis à jour`, type: 'success' },
        { root: true }
      )

      if (context) {
        await dispatch('reload', context, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeJustificatifsUpdate', { root: true })
    }
  },

  async unlink({ commit, dispatch }, { id, documentId, context }) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreEtapeJustificatifUnlink', { root: true })

    try {
      const data = await etapeJustificatifDissocier({ id, documentId })

      if (data) {
        commit('popupClose', null, { root: true })
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )

        if (context) {
          await dispatch('reload', context, { root: true })
        }
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeJustificatifUnlink', { root: true })
    }
  }
}

export const mutations = {
  metasSet(state, data) {
    Vue.set(state.metas, 'entreprises', data.elements)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
