import Vue from 'vue'
import {
  titre,
  titreCreate,
  titreUpdate,
  titreDelete,
  titreDemarcheCreate,
  titreDemarcheUpdate,
  titreDemarcheDelete,
  titreEtapeCreate,
  titreEtapeUpdate,
  titreEtapeDelete
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

  async titreCreate({ commit, dispatch }, titre ) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreCreate', { root: true })

    try {
      const res = await titreCreate({ titre })

      if (res) {
        commit('popupClose', null, { root: true })
        dispatch('reload', res.id)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreCreate', { root: true })
    }
  },

  async titreUpdate({ commit, dispatch }, titre ) {
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

  async titreDelete({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreDelete', { root: true })

    try {
      const res = await titreDelete({ id })

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
      commit('loadingRemove', 'titreDelete', { root: true })
    }
  },

  async demarcheCreate({ commit, dispatch }, demarche) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreDemarcheCreate', { root: true })

    try {
      const res = await titreDemarcheCreate({ demarche })

      if (res) {
        commit('popupClose', null, { root: true })
        dispatch('reload', res.id)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheCreate', { root: true })
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

  async demarcheDelete({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreDemarcheDelete', { root: true })

    try {
      const res = await titreDemarcheDelete({ id })

      if (res) {
        commit('popupClose', null, { root: true })
        dispatch('reload', res.id)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheDelete', { root: true })
    }
  },

  async etapeCreate({ commit, dispatch }, etape) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreEtapeCreate', { root: true })

    try {
      const res = await titreEtapeCreate({ etape })
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
      commit('loadingRemove', 'titreEtapeCreate', { root: true })
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

  async etapeDelete({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreEtapeDelete', { root: true })

    try {
      const res = await titreEtapeDelete({ id })

      if (res) {
        commit('popupClose', null, { root: true })
        dispatch('reload', res.id)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeDelete', { root: true })
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
