import {
  etape,
  etapeDeposer,
  etapeSupprimer,
  etapeTelecharger
} from '../api/titres-etapes'

import { saveAs } from 'file-saver'

import { streamToBlob } from '../utils/stream'

const stateInitial = {
  element: null
}

const state = JSON.parse(JSON.stringify(stateInitial))

const actions = {
  async get({ commit, dispatch }, id) {
    try {
      commit('loadingAdd', 'titreEtapeGet', { root: true })

      const newEtape = await etape({ id })

      if (!newEtape) {
        dispatch('pageError', null, { root: true })
      }

      commit('set', { etape: newEtape })
      history.replaceState({}, null, newEtape.slug)
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeGet', { root: true })
    }
  },

  async depose({ commit, dispatch }, etapeId) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'titreEtapeDepose', { root: true })

      const data = await etapeDeposer({ id: etapeId })

      commit('popupClose', null, { root: true })
      await dispatch('reload', { name: 'titre', id: data.slug }, { root: true })
      dispatch(
        'messageAdd',
        { value: `la demande a été déposée`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeDepose', { root: true })
    }
  },

  async remove({ commit, dispatch }, id) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'titreEtapeRemove', { root: true })
      const data = await etapeSupprimer({ id })

      commit('popupClose', null, { root: true })
      await dispatch('reload', { name: 'titre', id: data.slug }, { root: true })
      dispatch(
        'messageAdd',
        { value: `le titre a été mis à jour`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeRemove', { root: true })
    }
  },

  async demandeDownload({ commit, dispatch }, { etapeId, name }) {
    try {
      commit('loadingAdd', 'demandeDownload', { root: true })

      const res = await etapeTelecharger(etapeId)

      if (!res.ok) {
        dispatch(
          'messageAdd',
          {
            value: `le fichier .zip n'a pas pu être téléchargé`,
            type: 'error'
          },
          { root: true }
        )
        return
      }

      const body = await streamToBlob(res, 'demandeDownload', commit)
      saveAs(body, `${name}.zip`)

      dispatch(
        'messageAdd',
        {
          type: 'success',
          value: `fichier téléchargé : ${name}`
        },
        { root: true }
      )
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'demandeDownload', { root: true })
      commit('fileLoad', { loaded: 0, total: 0 }, { root: true })
    }
  }
}

const mutations = {
  set(state, { etape }) {
    state.element = etape
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
