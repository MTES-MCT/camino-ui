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
import titreTravaux from './titre-travaux'

const modules = {
  titre,
  titres,
  map,
  utilisateur,
  utilisateurs,
  entreprises,
  substances,
  user,
  titreTravaux
}

export const state = {
  config: {},
  messages: [],
  popup: {
    component: null,
    props: null,
    messages: []
  },
  error: null,
  menu: {
    component: null
  }
}

export const actions = {
  async init ({ commit, dispatch }) {
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
      dispatch('apiError', e, { root: true })
    }
  },

  apiError ({ commit }, error) {
    commit('messageAdd', {
      type: 'error',
      value:
        error ||
        `Erreur: impossible de se connecter à l'API (${
          process.env.VUE_APP_API_URL
        })`
    })
  },

  pageError ({ commit }) {
    commit('errorAdd', {
      type: 'error',
      value: `Erreur: page introuvable`
    })
  },

  messageAdd ({ commit }, message) {
    const id = new Date().valueOf()
    message.id = id
    commit('messageAdd', message)
    setTimeout(() => {
      commit('messageRemove', id)
    }, 3000)
  },

  menuToggle ({ state, commit }, component) {
    if (state.menu.component && state.menu.component.name === component.name) {
      commit('menuClose')
    } else if (state.menu.component) {
      commit('menuClose')
      commit('menuOpen', component)
    } else {
      commit('menuOpen', component)
    }
  },

  async load ({ dispatch, commit }) {
    commit('errorRemove')
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
  messageAdd (state, message) {
    state.messages.push(message)
  },

  messageRemove (state, id) {
    Vue.delete(state.messages, state.messages.findIndex(m => m.id === id))
  },

  popupOpen (state, { component, props }) {
    state.popup = { component, props, messages: [] }
  },

  popupClose (state) {
    state.popup = {
      component: null,
      props: null,
      messages: []
    }
  },

  errorAdd (state, error) {
    state.error = error
  },

  errorRemove (state) {
    state.error = null
  },

  menuOpen (state, component) {
    state.menu.component = component
  },

  menuClose (state) {
    state.menu.component = null
  },

  popupMessagesRemove (state) {
    state.popup.messages = []
  },

  popupMessageAdd (state, message) {
    state.popup.messages.push(message)
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules
})
