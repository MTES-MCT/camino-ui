import Vue from 'vue'
import Vuex from 'vuex'

import titre from './titre.js'
import titres from './titres.js'
import carte from './carte.js'
import utilisateur from './utilisateur.js'

const modules = {
  titre,
  titres,
  carte,
  utilisateur
}

export const state = {
  config: {}
}

export const actions = {}

export const mutations = {}

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  mutations,
  modules
})
