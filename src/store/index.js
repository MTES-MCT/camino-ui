import Vue from 'vue'
import Vuex from 'vuex'

import lib from './lib'
import titre from './titre'
import titres from './titres'

const modules = {
  lib,
  titre,
  titres
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
