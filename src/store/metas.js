import Vue from 'vue'
import {
  metasInit,
  metasTitre,
  metasTitres,
  metasTitreEtape,
  metasTitreEtapeDocument,
  metasUtilisateur
} from '../api'

export const state = {
  types: [],
  domaines: [],
  statuts: [],
  referencesTypes: [],
  devises: [],
  unites: [],
  geoSystemes: [],
  substances: [],
  entreprises: [],
  administrations: [],
  versions: {
    api: null,
    /* global npmVersion */
    ui: `${npmVersion}`
  },
  permissions: []
}

export const actions = {
  async init({ commit, dispatch }) {
    commit('loadingAdd', 'metasInit', { root: true })

    try {
      const res = await metasInit()

      commit('apiVersionSet', res.version)
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'metasInit', { root: true })
    }
  },

  async titreGet({ commit }) {
    commit('loadingAdd', 'metasTitreGet', { root: true })

    try {
      const res = await metasTitre()
      commit('set', res)
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'metasTitreGet', { root: true })
    }
  },

  async titresGet({ state, commit, dispatch }) {
    commit('loadingAdd', 'metasTitresGet', { root: true })

    try {
      const res = await metasTitres()
      commit('set', res)
      commit('titresLoaded')
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'metasTitresGet', { root: true })
    }
  },

  async titreEtapeGet({ commit }) {
    commit('loadingAdd', 'titreEtapeMetasGet', { root: true })

    try {
      const res = await metasTitreEtape()
      commit('set', res)
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeMetasGet', { root: true })
    }
  },

  async titreEtapeDocumentGet({ commit }) {
    commit('loadingAdd', 'titreEtapeDocumentMetasGet', { root: true })

    try {
      const res = await metasTitreEtapeDocument()
      commit('set', res)
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeDocumentMetasGet', { root: true })
    }
  },

  async utilisateurGet({ commit, dispatch }) {
    commit('loadingAdd', 'utilisateurPermissions', { root: true })

    try {
      const res = await metasUtilisateur()

      commit('set', res)
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'utilisateurPermissions', { root: true })
    }
  }
}

export const mutations = {
  set(state, response) {
    Object.keys(response).forEach(id => {
      Vue.set(
        state,
        id,
        response[id].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
      )
    })
  },

  apiVersionSet(state, version) {
    state.versions.api = version
  },

  titresLoaded(state) {
    state.titresLoaded++
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
