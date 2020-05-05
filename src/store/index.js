import Vue from 'vue'
import Vuex from 'vuex'
import { saveAs } from 'file-saver'

import titre from './titre'
import titreDemarche from './titre-demarche'
import titreEtape from './titre-etape'
import titreDocument from './titre-document'
import titres from './titres'
import titresDemarches from './titres-demarches'
import utilisateur from './utilisateur'
import utilisateurs from './utilisateurs'
import entreprise from './entreprise'
import entreprises from './entreprises'
import administration from './administration'
import administrations from './administrations'
import user from './user'
import titreActivite from './titre-activite'
import titresActivites from './titres-activites'
import statistiques from './statistiques'

import router from '../router'

const modules = {
  titre,
  titreDemarche,
  titreEtape,
  titreDocument,
  titres,
  titresDemarches,
  utilisateur,
  utilisateurs,
  entreprise,
  entreprises,
  administration,
  administrations,
  user,
  titreActivite,
  titresActivites,
  statistiques
}

export const state = {
  config: {},
  messages: [],
  popup: { component: null, props: null, messages: [], loading: false },
  error: null,
  menu: { component: null },
  loading: [],
  loaded: false
}

export const actions = {
  apiError({ commit }, error) {
    const id = Date.now()
    commit('messageAdd', {
      id,
      type: 'error',
      value:
        error ||
        `Erreur: impossible de se connecter à l'API (${process.env.VUE_APP_API_URL})`
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

  errorRemove({ state, commit }) {
    if (state.error) {
      commit('errorRemove')
    }
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

  async reload({ dispatch, rootState }, { name, id }) {
    const idOld = rootState[name].current.id

    if (id !== idOld) {
      router.replace({ name, params: { id } })
    }

    await dispatch(`${name}/get`, id)
  },

  async documentDownload({ dispatch, commit }, name) {
    commit('loadingAdd', 'documentDownload', { root: true })
    try {
      const token = localStorage.getItem('token')
      const headers = new Headers({
        authorization: token ? `Bearer ${token}` : ''
      })
      const method = 'GET'

      const url = `${process.env.VUE_APP_API_URL}/documents/${name}`

      const res = await fetch(url, { method, headers })

      if (res.status !== 200) {
        const error = await res.text()
        throw error
      }

      const body = await res.blob()
      saveAs(body, name)

      dispatch('messageAdd', {
        type: 'success',
        value: `fichier téléchargé : ${name}`
      })
    } catch (e) {
      dispatch('apiError', `erreur de téléchargement : ${name}, ${e}`)
    } finally {
      commit('loadingRemove', 'documentDownload', { root: true })
    }
  },

  async contentDownload({ dispatch, commit }, { section, params }) {
    commit('loadingAdd', 'contentDownload', { root: true })

    try {
      const token = localStorage.getItem('token')
      const headers = new Headers({
        authorization: token ? `Bearer ${token}` : ''
      })
      const method = 'GET'

      const paramsString = new URLSearchParams(params).toString()
      console.log(params, paramsString)

      const url = `${process.env.VUE_APP_API_URL}/${section}?${paramsString}`

      const res = await fetch(url, { method, headers })

      if (res.status !== 200) {
        const error = await res.text()
        throw error
      }

      // https://gist.github.com/nerdyman/5de9cbe640eb1fbe052df43bcec91fad
      const contentDisposition = res.headers.get('Content-disposition')

      const name = contentDisposition
        ? contentDisposition
            .split(';')
            .find(n => n.includes('filename='))
            .replace('filename=', '')
            .trim()
        : ''

      if (!name) throw new Error('nom de fichier manquant')

      const body = await res.blob()
      saveAs(body, name)

      dispatch('messageAdd', {
        type: 'success',
        value: `fichier téléchargé : ${name}`
      })
    } catch (e) {
      dispatch('apiError', `erreur de téléchargement : ${section}, ${e}`)
    } finally {
      commit('loadingRemove', 'contentDownload', { root: true })
    }
  }
}

export const mutations = {
  messageAdd(state, message) {
    state.messages.push(message)
  },

  messageRemove(state, id) {
    Vue.delete(
      state.messages,
      state.messages.findIndex(m => m.id === id)
    )
  },

  popupOpen(state, { component, props }) {
    state.popup.component = component
    state.popup.props = props
    state.popup.messages = []
  },

  popupClose(state) {
    state.popup.component = null
    state.popup.props = null
    state.popup.messages = []
    state.popup.loading = false
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

  popupLoad(state) {
    state.popup.loading = true
  },

  popupMessagesRemove(state) {
    state.popup.messages = []
    state.popup.loading = false
  },

  popupMessageAdd(state, message) {
    state.popup.messages.push(message)
    state.popup.loading = false
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
