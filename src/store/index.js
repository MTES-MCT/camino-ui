import Vue from 'vue'
import Vuex from 'vuex'

import titre from './titre'
import titres from './titres'
import map from './map'
import user from './user'

const modules = {
  titre,
  titres,
  map,
  user
}

export const state = {
  config: {},
  erreurs: []
}

export const actions = {
  errorApi({ commit }) {
    commit(
      'errorSet',
      `Erreur: impossible de se connecter à l'API (${
        process.env.VUE_APP_API_URL
      })`
    )
  }
}

export const mutations = {
  errorSet(state, message) {
    state.erreurs.push(message)
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules
})
