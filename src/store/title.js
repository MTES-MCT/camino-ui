import Vue from 'vue'
import api from './_api.js'

export const state = {
  current: null,
  documents: []
}

export const actions = {
  get({ commit }, { id }) {
    return api.titreGet(id).then(r => {
      commit('set', r)
    })
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
