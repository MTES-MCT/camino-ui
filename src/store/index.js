import { shallowRef } from '@vue/reactivity'
import { createStore } from 'vuex'
import { saveAs } from 'file-saver'

import router from '../router'
import { apiRestFetch } from '../api/_client'
import { urlQueryUpdate } from '../utils/url'

import titre from './titre'
import titreDemarche from './titre-demarche'
import titreDemande from './titre-demande'
import titreEtape from './titre-etape'
import titreEtapeJustificatifs from './titre-etape-justificatifs'
import titreTravaux from './titre-travaux'
import titreTravauxEtape from './titre-travaux-etape'
import document from './document'
import titres from './titres'
import titresDemarches from './titres-demarches'
import utilisateur from './utilisateur'
import utilisateurs from './utilisateurs'
import entreprise from './entreprise'
import entreprises from './entreprises'
import administration from './administration'
import administrations from './administrations'
import metas from './metas'
import meta from './meta'
import user from './user'
import titreActivite from './titre-activite'
import titresActivites from './titres-activites'
import statistiques from './statistiques'
import definitions from './definitions'

const modules = {
  titre,
  titreDemarche,
  titreDemande,
  titreEtape,
  titreEtapeJustificatifs,
  document,
  titres,
  titresDemarches,
  titreTravaux,
  titreTravauxEtape,
  utilisateur,
  utilisateurs,
  entreprise,
  entreprises,
  administration,
  administrations,
  meta,
  metas,
  user,
  titreActivite,
  titresActivites,
  statistiques,
  definitions
}

const state = {
  config: {},
  messages: [],
  popup: { component: null, props: null, messages: [], loading: false },
  error: null,
  menu: { component: null },
  loading: [],
  fileLoading: {
    loaded: 0,
    total: 0
  }
}

const actions = {
  apiError({ commit }, error) {
    const id = Date.now()
    commit('messageAdd', {
      id,
      type: 'error',
      value: `Erreur : ${error}`
    })

    setTimeout(() => {
      commit('messageRemove', id)
    }, 4500)

    console.error(error)
  },

  pageError({ commit }) {
    commit('errorUpdate', {
      type: 'error',
      value: `Erreur: page introuvable`
    })
  },

  errorRemove({ state, commit }) {
    if (state.error) {
      commit('errorUpdate', null)
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
    if (!id) {
      router.push({ name })
    } else {
      const idOld = rootState[name].element.id

      if (id !== idOld) {
        router.replace({ name, params: { id } })
      } else {
        await dispatch(`${name}/get`, id)
      }
    }
  },

  async download({ dispatch, commit }, filePath) {
    try {
      commit('loadingAdd', 'fileLoading')
      const res = await apiRestFetch(filePath)

      // https://gist.github.com/nerdyman/5de9cbe640eb1fbe052df43bcec91fad
      const contentDisposition = res.headers.get('Content-disposition')

      const name = contentDisposition
        ? decodeURIComponent(
            contentDisposition
              .split(';')
              .find(n => n.includes('filename='))
              .replace('filename=', '')
              .trim()
          )
        : ''

      if (!name) throw new Error('nom de fichier manquant')

      let body

      // si le navigateur supporte l'API Web Streams
      if (res.body) {
        // progress

        const total = res.headers.get('content-length')
        const reader = res.body.getReader()
        let loaded = 0
        const chunks = []

        commit('loadingRemove', 'fileLoading')

        while (true) {
          const { done, value } = await reader.read()

          if (done) break

          chunks.push(value)
          loaded += value.length

          commit('fileLoad', { loaded, total })
        }

        body = new Blob(chunks)
      } else {
        body = await res.blob()
      }

      saveAs(body, name)

      dispatch('messageAdd', {
        type: 'success',
        value: `fichier téléchargé : ${name}`
      })

      return name
    } catch (e) {
      dispatch('apiError', `téléchargement : ${filePath}, ${e}`)
    } finally {
      commit('loadingRemove', 'fileLoading')
      commit('fileLoad', { loaded: 0, total: 0 })
    }
  },

  async urlQueryUpdate({ rootState }, { params, definitions }) {
    const { status, query } = urlQueryUpdate(
      params,
      rootState.route.query,
      definitions
    )

    if (status === 'updated') {
      router.push({ query })
    } else if (status === 'created') {
      router.replace({ query })
    }
  }
}

const mutations = {
  messageAdd(state, message) {
    state.messages.push(message)
  },

  messageRemove(state, id) {
    const index = state.messages.findIndex(m => m.id === id)
    state.messages.splice(index, 1)
  },

  popupOpen(state, { component, props }) {
    state.popup.component = shallowRef(component)
    state.popup.props = props
    state.popup.messages = []
  },

  popupClose(state) {
    state.popup.component = null
    state.popup.props = null
    state.popup.messages = []
    state.popup.loading = false
  },

  errorUpdate(state, error) {
    state.error = error
  },

  menuOpen(state, component) {
    state.menu.component = shallowRef(component)
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
  },

  fileLoad(state, { loaded, total }) {
    state.fileLoading.loaded = loaded
    state.fileLoading.total = total
  }
}

export { state, actions, mutations }

export default createStore({
  state,
  actions,
  mutations,
  modules
})
