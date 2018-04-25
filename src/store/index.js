import Vue from 'vue'
import Vuex from 'vuex'

import lib from './lib'
import title from './title'
import titles from './titles'
import map from './map'
import user from './user'

const modules = {
  lib,
  title,
  titles,
  map,
  user
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
