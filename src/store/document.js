import {
  documentMetas,
  documentCreer,
  // documentModifier,
  documentSupprimer
} from '../api/documents'
import { v4 as uuidv4 } from 'uuid'
import { apiUploadFetch } from '../api/_client'

const state = {
  metas: {
    documentsTypes: [],
    documentsVisibilites: []
  },
  upload: {
    isActive: false,
    percent: 0
  }
}

const actions = {
  async init({ commit }, options) {
    try {
      commit('loadingAdd', 'documentInit', { root: true })

      const data = await documentMetas(options)

      commit('metasSet', data)
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'documentInit', { root: true })
    }
  },

  async upsert({ commit, dispatch }, { document, route, action }) {
    try {
      commit('loadingAdd', 'documentUpsert', { root: true })

      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })

      const idOld = document.id

      const temporaire = document.id === document.typeId
      if (temporaire) {
        delete document.id
      }

      if (!document.id) {
        const { fichierNouveau } = document
        if (!fichierNouveau) return

        commit('uploadStart')

        fichierNouveau.id = `${document.date}-${document.typeId}-${uuidv4()}`

        const upload = await apiUploadFetch(fichierNouveau)
        upload.progress(percent => commit('uploadProgress', percent))

        await upload.complete()

        commit('uploadStop')

        // Offre une traçabilité du document téléversé sur le serveur
        // (pour les opérations de renommage, stockage de données en base)
        document.id = fichierNouveau.id
        delete fichierNouveau.id
        document.fichierHasNew = true

        // Pour ne pas uploader de fichier via GraphQL
        delete document.fichierNouveau

        const updatedDocument = await documentCreer({ document })

        commit('popupClose', null, { root: true })

        dispatch(
          'messageAdd',
          { value: `le document a été mis à jour`, type: 'success' },
          { root: true }
        )

        if (route) {
          await dispatch('reload', route, { root: true })

          if (route.name === 'titre') {
            const section = route.section
            let id

            if (section === 'etapes') id = document.titreEtapeId
            if (section === 'travaux') id = document.titreTravauxEtapeId

            commit('titre/open', { section, id }, { root: true })
          }
        } else if (action) {
          const params = { ...action.params, document: updatedDocument }

          if (idOld) {
            params.idOld = idOld
          }

          await dispatch(action.name, params, { root: true })
        }
      } else {
        delete document.typeId
        // d = await documentModifier({ document })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'documentUpsert', { root: true })
    }
  },

  async remove({ commit, dispatch }, { id, route }) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('loadingAdd', 'documentRemove', { root: true })
      if (route) {
        commit('popupLoad', null, { root: true })
      }

      await documentSupprimer({ id })

      if (route) {
        commit('popupClose', null, { root: true })

        dispatch(
          'messageAdd',
          { value: `le document a été supprimé`, type: 'success' },
          { root: true }
        )
        await dispatch('reload', route, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'documentRemove', { root: true })
    }
  }
}

const mutations = {
  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      state.metas[id] = data[id]
    })
  },

  uploadStart(state) {
    state.upload.percent = 0
    state.upload.isActive = true
  },

  uploadStop(state) {
    state.upload.isActive = false
  },

  uploadProgress(state, percent) {
    console.log(percent)
    state.upload.percent = percent
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
