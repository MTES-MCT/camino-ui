import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

import { init } from '../api'

import titre from './titre'
import titres from './titres'
import map from './map'
import utilisateur from './utilisateur'
import utilisateurs from './utilisateurs'
import entreprises from './entreprises'
import substances from './substances'
import user from './user'

const modules = {
  titre,
  titres,
  map,
  utilisateur,
  utilisateurs,
  entreprises,
  substances,
  user
}

export const state = {
  config: {},
  messages: [],
  popup: {
    component: null,
    props: null
  },
  apiError: undefined,
  menu: {
    component: null
  }
}

export const actions = {
  async init({ commit, dispatch }) {
    try {
      const res = await init()

      if (res.permissions) {
        commit('utilisateurs/permissionsSet', res.permissions, { root: true })
      }

      if (res.substances) {
        commit('substances/set', res.substances, { root: true })
      }

      if (res.entreprises) {
        commit('entreprises/set', res.entreprises, { root: true })
      }

      if (res.metas) {
        commit(
          'titres/metasSet',
          { values: res.metas.types, name: 'types' },
          { root: true }
        )
        commit(
          'titres/metasSet',
          { values: res.metas.domaines, name: 'domaines' },
          { root: true }
        )
        commit(
          'titres/metasSet',
          { values: res.metas.statuts, name: 'statuts' },
          { root: true }
        )
      }
    } catch (e) {
      console.log('fix me')
      dispatch('apiError', e, { root: true })
    }
  },

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
  },

  async reload({ dispatch }) {
    await dispatch('init')
    if (router.currentRoute.name === 'titres') {
      dispatch('titres/get', 'network-only', { root: true })
    } else if (router.currentRoute.name === 'titre') {
      dispatch('titre/get', router.currentRoute.params.id, { root: true })
    } else if (router.currentRoute.name === 'utilisateurs') {
      dispatch('utilisateurs/get', null, { root: true })
    } else if (router.currentRoute.name === 'utilisateur') {
      dispatch('utilisateur/get', router.currentRoute.params.id, { root: true })
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
  popupOpen(state, { component, props }) {
    state.popup = { component, props }
  },
  popupClose(state) {
    state.popup = {
      component: null,
      props: null
    }
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
