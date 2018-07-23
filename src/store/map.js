// import Vue from 'vue'
import tiles from '../conf/map-tiles'

export const state = {
  current: null,
  tiles: tiles
}

export const actions = {}

export const getters = {
  tilesActive: (state, getters, rootState) =>
    state.tiles.find(t => t.name === rootState.user.preferences.map.tilesName)
}

export const mutations = {}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
