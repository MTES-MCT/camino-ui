import Vue from 'vue'
import { titre, titreEtapeUpdate } from '../api'
import router from '../router'

const etapeFormat = etape => {
  console.log(etape.documents)
  // etape.typeId = etape.type.id
  // delete etape.type

  // etape.statutId = etape.statut.id
  // delete etape.statut

  // etape.titulairesIds = etape.titulaires && etape.titulaires.map(t => t.id)
  // delete etape.titulaires

  // etape.amodiatairesIds =
  //   etape.amodiataires && etape.amodiataires.map(t => t.id)
  // delete etape.amodiataires

  // etape.administrationsIds =
  //   etape.administrations && etape.administrations.map(t => t.id)
  // delete etape.administrations

  // etape.substancesIds = etape.substances && etape.substances.map(t => t.id)
  // delete etape.substances

  // etape.emprisesIds = etape.emprises.id
  // delete etape.emprises

  etape.titulaires = etape.titulaires.filter(t => t.id)
  etape.amodiataires = etape.amodiataires.filter(t => t.id)
  etape.administrations = etape.administrations.filter(t => t.id)
  etape.substances = etape.substances.filter(t => t.id)
  etape.emprises = etape.emprises.filter(t => t.id)
  etape.points = etape.points.filter(t => t.id)

  delete etape.geojsonPoints
  delete etape.geojsonMultiPolygon
  delete etape.documents

  return etape
}

export const state = {
  current: null,
  documents: []
}

export const actions = {
  async get({ commit, dispatch }, id) {
    try {
      const t = await titre(id)

      if (t) {
        commit('set', t)
      } else {
        router.push({ name: 'erreur' })
      }
    } catch (e) {
      console.log('fix me')
      dispatch('apiError', e, { root: true })
    }
  },

  async etapeUpdate({ commit, dispatch }, etape) {
    console.log(etape)

    try {
      etape = etapeFormat(etape)
      const res = await titreEtapeUpdate({ etape })

      if (res) {
        console.log(res)
        // commit('set', t)
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
