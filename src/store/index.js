import Vue from 'vue'
import Vuex from 'vuex'

import titre from './titre'
import titres from './titres'
import map from './map'
import utilisateur from './utilisateur'
import utilisateurs from './utilisateurs'

const modules = {
  titre,
  titres,
  map,
  utilisateur,
  utilisateurs
}

export const state = {
  config: {},
  messages: [],
  popup: {
    component: null,
    closeBtn: false
  },
  apiError: undefined,
  menu: {
    component: null
  }
}

export const actions = {
  apiError({ commit }) {
    commit('messageAdd', {
      type: 'error',
      value: `Erreur: impossible de se connecter à l'API (${
        process.env.VUE_APP_API_URL
      })`
    })
    commit('apiError', true)
  },

  messageAdd({ commit }, message) {
    const id = new Date().valueOf()
    message.id = id
    commit('messageAdd', message)
    setTimeout(() => {
      commit('messageRemove', id)
    }, 3000)
  },

  menuToggle({ state, commit }, component) {
    if (state.menu.component && state.menu.component.name === component.name) {
      commit('menuClose')
    } else if (state.menu.component) {
      commit('menuClose')
      commit('menuOpen', component)
    } else {
      commit('menuOpen', component)
    }
  }
}

export const mutations = {
  messageAdd(state, message) {
    state.messages.push(message)
  },
  messageRemove(state, id) {
    Vue.delete(state.messages, state.messages.findIndex(m => m.id === id))
  },
  popupOpen(state, { component, closeBtn }) {
    state.popup = { component, closeBtn }
  },
  popupClose(state) {
    state.popup = { component: null, closeBtn: false }
  },
  apiError(state, status) {
    state.apiError = status
  },
  menuOpen(state, component) {
    state.menu.component = component
  },
  menuClose(state) {
    state.menu.component = null
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules
})
