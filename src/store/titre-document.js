import Vue from 'vue'

import {
  metasDocument,
  documentCreer,
  documentModifier,
  documentSupprimer
} from '../api/titres-documents'

export const state = {
  metas: {
    documentsTypes: []
  }
}

export const actions = {
  async metasGet({ commit }) {
    commit('loadingAdd', 'metasTitreEtapeDocumentGet', { root: true })

    try {
      const data = await metasDocument()

      commit('metasSet', { documentsTypes: data })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'metasTitreEtapeDocumentGet', {
        root: true
      })
    }
  },

  async add({ commit, dispatch }, document) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDocumentAdd', { root: true })

    try {
      const data = await documentCreer({ document })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
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
      commit('loadingRemove', 'titreDocumentAdd', { root: true })
    }
  },

  async update({ commit, dispatch }, document) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDocumentUpdate', { root: true })

    try {
      const data = await documentModifier({ document })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
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
      commit('loadingRemove', 'titreDocumentUpdate', { root: true })
    }
  },

  async remove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDocumentRemove', { root: true })

    try {
      const data = await documentSupprimer({ id })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
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
      commit('loadingRemove', 'titreDocumentRemove', { root: true })
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
