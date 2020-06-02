import Vue from 'vue'

import {
  metasDocument,
  documentCreer,
  documentModifier,
  documentSupprimer
} from '../api/documents'

export const state = {
  metas: {
    documentsTypes: []
  }
}

export const actions = {
  async metasGet({ commit }, repertoire) {
    commit('loadingAdd', 'metasDocumentGet', { root: true })

    try {
      const data = await metasDocument({ repertoire })

      commit('metasSet', { documentsTypes: data })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'metasDocumentGet', {
        root: true
      })
    }
  },

  async add({ commit, dispatch }, { document, context }) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'documentAdd', { root: true })

    try {
      const data = await documentCreer({ document })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', context, { root: true })
        dispatch(
          'messageAdd',
          { value: `le document a été ajouté`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'documentAdd', { root: true })
    }
  },

  async update({ commit, dispatch }, { document, context }) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'documentUpdate', { root: true })

    try {
      const data = await documentModifier({ document })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', context, { root: true })
        dispatch(
          'messageAdd',
          { value: `le document a été mis à jour`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'documentUpdate', { root: true })
    }
  },

  async remove({ commit, dispatch }, { id, context }) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'documentRemove', { root: true })

    try {
      const data = await documentSupprimer({ id })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', context, { root: true })
        dispatch(
          'messageAdd',
          { value: `le document a été supprimé`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'documentRemove', { root: true })
    }
  }
}

export const mutations = {
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
