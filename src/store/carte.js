// import Vue from 'vue'
import tuiles from '../conf/carteTuiles.json'

export const state = {
  current: null,
  tuiles: tuiles
}

export const actions = {}

export const getters = {
  tuilesActive: (state, getters, rootState) =>
    state.tuiles.find(
      t => t.name === rootState.utilisateur.preferences.carte.tuilesNom
    )
}

export const mutations = {}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
