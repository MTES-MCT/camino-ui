import Vue from 'vue'
import { titre, titreEtapeUpdate } from '../api'
import router from '../router'

export const state = {
  current: null,
  documents: []
}

export const actions = {
  async get({ commit, dispatch }, id) {
    try {
      const res = await titre(id)

      if (res) {
        commit('set', res)
      } else {
        router.push({ name: 'erreur' })
      }
    } catch (e) {
      console.log('fix me')
      dispatch('apiError', e, { root: true })
    }
  },

  async reload({ dispatch, state }) {
    try {
      await dispatch('get', state.current.id)
    } catch (e) {
      console.log(e)
    }
  },

  async etapeUpdate({ dispatch }, etape) {
    try {
      const res = await titreEtapeUpdate({ etape })

      console.log(res)
      if (res) {
        dispatch(
          'messageAdd',
          {
            value: `L'étape a été mise à jour`,
            type: 'success'
          },
          { root: true }
        )
        dispatch('reload')
      } else {
        router.push({ name: 'erreur' })
      }
    } catch (e) {
      console.log('fix me')
      dispatch('apiError', e, { root: true })
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
