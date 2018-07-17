import Vue from 'vue'
import Vuex from 'vuex'

import titre from '@/store/titre'
import titres from '@/store/titres'
import map from '@/store/map'
import user from '@/store/user'

const modules = {
  titre,
  titres,
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
