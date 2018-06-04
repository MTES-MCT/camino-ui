import Vue from 'vue'

export const state = {
  current: null,
  preferences: {
    carte: {
      tuilesNom: 'osm / mapnik'
    }
  }
}

export const actions = {}

export const getters = {}

export const mutations = {
  preferencesCarteTuilesNomSelectionner(state, tuilesNom) {
    Vue.set(state.preferences.carte, 'tuilesNom', tuilesNom)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
