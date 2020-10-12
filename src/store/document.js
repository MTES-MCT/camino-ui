import Vue from 'vue'

import {
  metasDocument,
  documentCreer,
  documentModifier,
  documentSupprimer
} from '../api/documents'

export const state = {
  metas: {
    documentsTypes: [],
    documentsVisibilites: []
  }
}

export const actions = {
  async metasGet({ commit }, options) {
    commit('loadingAdd', 'metasDocumentGet', { root: true })

    try {
      const data = await metasDocument(options)

      commit('metasSet', data)
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
      await documentCreer({ document })

      commit('popupClose', null, { root: true })

      dispatch(
        'messageAdd',
        { value: `le document a été ajouté`, type: 'success' },
        { root: true }
      )

      if (context) {
        await dispatch('reload', context, { root: true })
        if (context.name === 'titre') {
          const section = context.section
          let id
          if (section === 'etapes') id = document.titreEtapeId
          if (section === 'travaux') id = document.titreTravauxEtapeId

          commit('titre/open', { section, id }, { root: true })
        }
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
      await documentModifier({ document })

      dispatch(
        'messageAdd',
        { value: `le document a été mis à jour`, type: 'success' },
        { root: true }
      )

      if (context) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', context, { root: true })
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
      await documentSupprimer({ id })

      commit('popupClose', null, { root: true })

      dispatch(
        'messageAdd',
        { value: `le document a été supprimé`, type: 'success' },
        { root: true }
      )

      if (context) {
        await dispatch('reload', context, { root: true })
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
