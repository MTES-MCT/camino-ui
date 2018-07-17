import Vue from 'vue'

export const state = {
  current: null,
  preferences: {
    map: {
      tilesName: 'osm / mapnik'
    }
  }
}

export const actions = {}

export const getters = {}

export const mutations = {
  preferencesMapTilesNameSelect(state, tilesName) {
    Vue.set(state.preferences.map, 'tilesName', tilesName)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
