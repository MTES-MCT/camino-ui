import Vue from 'vue'

import {
  metasInit,
  metasTitre,
  metasTitres,
  metasTitreEtape,
  metasTitreDemarche,
  metasDocument,
  metasUtilisateur
} from '../api/metas'

export const state = {
  titres: {
    domaines: [],
    types: [],
    statuts: []
  },

  titre: {
    referencesTypes: []
  },

  demarche: {
    titreDemarchesTypes: []
  },

  etape: {
    demarcheEtapesTypes: [],
    devises: [],
    unites: [],
    geoSystemes: [],
    substances: []
  },

  document: {
    documentsTypes: []
  },

  utilisateur: {
    permissions: [],
    entreprises: [],
    administrations: []
  },

  utilisateurDomaines: [],

  version: null,
  /* global npmVersion */
  versionUi: `${npmVersion}`
}

export const actions = {
  async init({ commit, dispatch }) {
    commit('loadingAdd', 'metasInit', { root: true })

    try {
      const data = await metasInit()

      commit('set', { data })
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
      const data = await metasTitre()

      commit('set', { data: { referencesTypes: data }, type: 'titre' })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'metasTitreGet', { root: true })
    }
  },

  async titresGet({ state, commit, dispatch }) {
    commit('loadingAdd', 'metasTitresGet', { root: true })

    try {
      const data = await metasTitres()

      commit('set', { data, type: 'titres' })
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'metasTitresGet', { root: true })
    }
  },

  async titreDemarcheGet({ commit }, demarche) {
    commit('loadingAdd', 'metasTitreDemarcheGet', { root: true })

    try {
      const data = await metasTitreDemarche(demarche)

      commit('set', { data: { titreDemarchesTypes: data }, type: 'demarche' })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'metasTitreDemarcheGet', { root: true })
    }
  },

  async titreEtapeGet({ commit }, etape) {
    commit('loadingAdd', 'metasTitreEtapeGet', { root: true })

    try {
      const data = await metasTitreEtape(etape)

      commit('set', { data, type: 'etape' })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'metasTitreEtapeGet', { root: true })
    }
  },

  async titreEtapeDocumentGet({ commit }) {
    commit('loadingAdd', 'titreEtapeDocumentMetasGet', { root: true })

    try {
      const data = await metasDocument()

      commit('set', { data: { documentsTypes: data }, type: 'document' })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeDocumentMetasGet', {
        root: true
      })
    }
  },

  async utilisateurGet({ commit, dispatch }) {
    commit('loadingAdd', 'utilisateurPermissions', { root: true })

    try {
      const data = await metasUtilisateur()

      commit('set', { data, type: 'utilisateur' })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'utilisateurPermissions', { root: true })
    }
  }
}

export const mutations = {
  set(state, { type, data }) {
    if (!data) {
      throw new Error('erreur API: metas données indisponibles')
    }

    Object.keys(data).forEach(id => {
      Vue.set(
        type ? state[type] : state,
        id,
        data[id]
          ? Array.isArray(data[id])
            ? data[id].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
            : data[id]
          : null
      )
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
