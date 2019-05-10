import Vue from 'vue'
import Vuex from 'vuex'
import { saveAs } from 'file-saver'
import router from '../router'

import { init } from '../api'

import titre from './titre'
import titres from './titres'
import metas from './metas'
import map from './map'
import utilisateur from './utilisateur'
import utilisateurs from './utilisateurs'
import entreprises from './entreprises'
import substances from './substances'
import user from './user'
import titreActivites from './titre-activites'

const modules = {
  titre,
  titres,
  metas,
  map,
  utilisateur,
  utilisateurs,
  entreprises,
  substances,
  user,
  titreActivites
}

/* global npmVersion */
export const state = {
  config: {},
  messages: [],
  popup: { component: null, props: null, messages: [] },
  error: null,
  menu: { component: null },
  versions: {
    api: null, // eslint-disable-next-line camelcase
    ui: `${npmVersion}`
  },
  loading: [],
  loaded: false
}

export const actions = {
  async init({ commit, dispatch }) {
    commit('loadingAdd', 'init')
    try {
      const res = await init()

      if (res.version) {
        commit('apiVersionSet', res.version)
      }

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
        const metasIds = [
          'types',
          'domaines',
          'statuts',
          'devises',
          'volumeUnites',
          'geoSystemes'
        ]

        metasIds.forEach(id => {
          dispatch('metas/set', { id, values: res.metas[id] }, { root: true })
        })

        commit('loaded')
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'init')
    }
  },

  apiError({ commit }, error) {
    const id = Date.now()
    commit('messageAdd', {
      id,
      type: 'error',
      value:
        error ||
        `Erreur: impossible de se connecter à l'API (${
          process.env.VUE_APP_API_URL
        })`
    })

    setTimeout(() => {
      commit('messageRemove', id)
    }, 4500)
  },

  pageError({ commit }) {
    commit('errorAdd', {
      type: 'error',
      value: `Erreur: page introuvable`
    })
  },

  messageAdd({ commit }, message) {
    const id = Date.now()
    message.id = id
    commit('messageAdd', message)
    setTimeout(() => {
      commit('messageRemove', id)
    }, 4500)
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

  async load({ dispatch, commit }) {
    commit('errorRemove')
    await dispatch('init')

    if (router.currentRoute.name === 'titres') {
      dispatch('titres/get', 'network-only', { root: true })
    } else if (router.currentRoute.name === 'titre') {
      dispatch('titre/get', router.currentRoute.params.id, { root: true })
    } else if (router.currentRoute.name === 'utilisateurs') {
      dispatch('utilisateurs/get', null, { root: true })
    } else if (router.currentRoute.name === 'utilisateur') {
      dispatch('utilisateur/get', router.currentRoute.params.id, {
        root: true
      })
    }
  },

  async documentDownload({ dispatch }, { titreDocumentId, fileName }) {
    try {
      const token = localStorage.getItem('token')
      const headers = new Headers({
        'Content-Type': 'application/pdf',
        authorization: token ? `Bearer ${token}` : ''
      })
      const url = `${process.env.VUE_APP_API_URL}/documents/${titreDocumentId}`
      const method = 'GET'

      const res = await fetch(url, { method, headers })

      if (res.status !== 200) {
        const text = await res.text()
        throw text
      }

      const body = await res.blob()
      saveAs(body, `${fileName}.pdf`)

      dispatch('messageAdd', {
        type: 'success',
        value: `fichier téléchargé : ${fileName}.pdf`
      })
    } catch (e) {
      dispatch('apiError', `erreur de téléchargement : ${fileName}.pdf, ${e}`)
    }
  }
}

export const mutations = {
  apiVersionSet(state, version) {
    state.versions.api = version
  },

  loaded(state) {
    state.loaded = true
  },

  messageAdd(state, message) {
    state.messages.push(message)
  },

  messageRemove(state, id) {
    Vue.delete(state.messages, state.messages.findIndex(m => m.id === id))
  },

  popupOpen(state, { component, props }) {
    state.popup = { component, props, messages: [] }
  },

  popupClose(state) {
    state.popup = {
      component: null,
      props: null,
      messages: []
    }
  },

  errorAdd(state, error) {
    state.error = error
  },

  errorRemove(state) {
    state.error = null
  },

  menuOpen(state, component) {
    state.menu.component = component
  },

  menuClose(state) {
    state.menu.component = null
  },

  popupMessagesRemove(state) {
    state.popup.messages = []
  },

  popupMessageAdd(state, message) {
    state.popup.messages.push(message)
  },

  loadingAdd(state, name) {
    state.loading.push(name)
  },

  loadingRemove(state, name) {
    const index = state.loading.indexOf(name)

    if (index > -1) {
      state.loading.splice(index, 1)
    }
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules
})
