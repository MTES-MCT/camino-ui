import Vue from 'vue'
import {
  titre,
  titreUpdate,
  titreRemove,
  titreDemarcheUpdate,
  titreDemarcheRemove,
  titreEtapeUpdate,
  titreEtapeRemove
} from '../api'

import router from '../router'

export const state = {
  current: null,
  documents: []
}

export const actions = {
  async get({ commit, dispatch }, id) {
    commit('loadingAdd', 'titre', { root: true })

    try {
      const res = await titre(id)

      if (res) {
        commit('set', res)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'titre', { root: true })
    }
  },

  async reload({ dispatch }, id) {
    router.replace({ name: 'titre', params: { id } })
    await dispatch('get', id)

    dispatch(
      'messageAdd',
      {
        value: `le titre a été mis à jour`,
        type: 'success'
      },
      { root: true }
    )
  },

  async titreUpdate({ commit, dispatch }, { titre, creation }) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreUpdate', { root: true })

    try {
      const res = await titreUpdate({ titre })

      if (res) {
        commit('popupClose', null, { root: true })
        dispatch('reload', res.id)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreUpdate', { root: true })
    }
  },

  async titreRemove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreRemove', { root: true })

    try {
      const res = await titreRemove({ id })

      if (res) {
        commit('popupClose', null, { root: true })
        router.push({ name: 'titres' })

        dispatch(
          'messageAdd',
          {
            value: `le titre a été supprimé`,
            type: 'success'
          },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreRemove', { root: true })
    }
  },

  async demarcheUpdate({ commit, dispatch }, demarche) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreDemarcheUpdate', { root: true })

    try {
      const res = await titreDemarcheUpdate({ demarche })

      if (res) {
        commit('popupClose', null, { root: true })
        dispatch('reload', res.id)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheUpdate', { root: true })
    }
  },

  async demarcheRemove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreDemarcheRemove', { root: true })

    try {
      const res = await titreDemarcheRemove({ id })

      if (res) {
        commit('popupClose', null, { root: true })
        dispatch('reload', res.id)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheRemove', { root: true })
    }
  },

  async etapeUpdate({ commit, dispatch }, etape) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreEtapeUpdate', { root: true })

    try {
      const res = await titreEtapeUpdate({ etape })
      console.log(res)
      if (res) {
        commit('popupClose', null, { root: true })
        dispatch('reload', res.id)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeUpdate', { root: true })
    }
  },

  async etapeRemove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreEtapeRemove', { root: true })

    try {
      const res = await titreEtapeRemove({ id })

      if (res) {
        commit('popupClose', null, { root: true })
        dispatch('reload', res.id)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeRemove', { root: true })
    }
  },

  documentSelect({ commit }, { documentId, selected }) {
    if (selected) {
      commit('documentSelectionAdd', documentId)
    } else {
      commit('documentSelectionRemove', documentId)
    }
  }
}

export const getters = {
  documentsTotal: state =>
    state.current && state.current['démarches']
      ? Object.keys(state.current['démarches']).reduce(
          (total, type) =>
            (total += state.current['démarches'][type].reduce(
              (subtotal, d) =>
                (subtotal += d.documents ? d.documents.length : 0),
              0
            )),
          0
        )
      : 0,

  documentSelected: state => documentId =>
    state.documents.find(id => id === documentId)
}

export const mutations = {
  set(state, titre) {
    Vue.set(state, 'current', titre)
  },

  reset(state) {
    Vue.set(state, 'current', null)
  },

  documentSelectionAdd(state, documentId) {
    state.documents.push(documentId)
  },

  documentSelectionRemove(state, documentId) {
    const index = state.documents.findIndex(id => id === documentId)
    Vue.delete(state.documents, index)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
