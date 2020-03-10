import Vue from 'vue'

import {
  metasTitreEtape,
  etapeCreer,
  etapeModifier,
  etapeSupprimer
} from '../api/titres-etapes'

export const state = {
  current: null,
  metas: {
    demarcheEtapesTypes: [],
    devises: [],
    unites: [],
    geoSystemes: [],
    substances: [],
    entreprises: []
  }
}

export const actions = {
  async metasGet({ commit }, etape) {
    commit('loadingAdd', 'metasTitreEtapeGet', { root: true })

    try {
      const data = await metasTitreEtape(etape)

      commit('metasSet', data)
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'metasTitreEtapeGet', { root: true })
    }
  },

  async add({ commit, dispatch }, etape) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreEtapeAdd', { root: true })

    try {
      const data = await etapeCreer({ etape })

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
      commit('loadingRemove', 'titreEtapeAdd', { root: true })
    }
  },

  async update({ commit, dispatch }, etape) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreEtapeUpdate', { root: true })

    try {
      const data = await etapeModifier({ etape })

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
      commit('loadingRemove', 'titreEtapeUpdate', { root: true })
    }
  },

  async remove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreEtapeRemove', { root: true })

    try {
      const data = await etapeSupprimer({ id })

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
      commit('loadingRemove', 'titreEtapeRemove', { root: true })
    }
  }
}

export const mutations = {
  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      Vue.set(state.metas, id, data[id] ? data[id] : [])
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
