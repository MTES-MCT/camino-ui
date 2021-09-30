import {
  documentMetas,
  documentCreer,
  documentModifier,
  documentSupprimer
} from '../api/documents'
import { uploadCall } from '../api/_upload'

const state = {
  metas: {
    documentsTypes: [],
    documentsVisibilites: []
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
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })

      const idOld = document.id

      let d
      let titreEtapeIdForEdit = null

      const isTemporary = document.id === document.typeId
      if (isTemporary) {
        delete document.id
      }

      document.fichier = true

      // Il faut envoyer les données de "document" sans sa propriété "fichierNouveau"
      // pour ne pas téléverser le fichier via GQL. Mais transformer "document" ici altère
      // le rendu de la UI. Elle pointe vers la référence de "document.fichierNouveau"
      // pour afficher le nom du fichier. On en crée donc une copie.
      const documentToSend = Object.assign({}, document)
      delete documentToSend.fichierNouveau

      if (!document.id) {
        d = await documentCreer({ document: documentToSend })
      } else {
        delete documentToSend.typeId
        d = await documentModifier({ document: documentToSend })
        titreEtapeIdForEdit = d.titreEtapeId // nécessaire en modification pour accéder au bon chemin
      }

      await uploadCall(
        document.fichierNouveau,
        titreEtapeIdForEdit,
        d.id,
        progress => {
          commit('fileLoad', { loaded: progress, total: 100 }, { root: true })
        }
      )

      commit('fileLoad', { loaded: 0, total: 0 }, { root: true })
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
        const params = { ...action.params, document: d }

        if (idOld) {
          params.idOld = idOld
        }

        await dispatch(action.name, params, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
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

  uploadProgress(state, progress) {
    state.upload.progress = progress
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
