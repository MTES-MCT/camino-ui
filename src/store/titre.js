import Vue from 'vue'
import { titre } from '../api'
import { titreFormat } from './_utils'
import router from '../router'

export const state = {
  current: null,
  documents: [],
  etapeEdit: null
}

export const actions = {
  async get({ commit, dispatch }, { id }) {
    const t = await titre(id)

    if (t) {
      commit('set', titreFormat(t))
    } else if (t === null) {
      router.push({ name: 'error' })
    } else {
      dispatch('apiError', null, { root: true })
    }
  },

  documentSelect({ commit }, { documentId, selected }) {
    if (selected) {
      commit('documentSelectionAdd', documentId)
    } else {
      commit('documentSelectionRemove', documentId)
    }
  },

  etapeEdit({ commit }, { etape }) {
    commit('etapeEdit', etape)
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
  },

  etapeEdit(state, etape) {
    Vue.set(state, 'etapeEdit', etape)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
