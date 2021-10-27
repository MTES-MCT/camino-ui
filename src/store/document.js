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

      // 1 - Commencer par l'upload
      // 2 - Récupérer nom du fichier temporaire d'upload terminé quand event de fin lancé
      // 3 - Modifier InputDocumentCreation pour accueillir champ du nom temporaire
      // 4 - Invoquer documentCreer avec ce champ
      // 5 - Dans le resolver du même nom, effectuer la transformation de path

      await uploadCall(
        document.fichierNouveau,
        documentToSend,
        progress => {
          commit('fileLoad', { loaded: progress, total: 100 }, { root: true })
        },
        async ({ successful, failed }) => {
          if (failed.length > 0) {
            throw new Error('le téléversement a échoué')
          }

          const [{ uploadURL }] = successful
          const idTmpFile = uploadURL.substring(uploadURL.lastIndexOf('/') + 1)

          const idOld = document.id
          let d

          try {
            if (!document.id) {
              d = await documentCreer({
                document: { ...documentToSend, nomTemporaire: idTmpFile }
              })
            } else {
              d = await documentModifier({
                document: { ...documentToSend, nomTemporaire: idTmpFile }
              })
            }

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
            commit(
              'popupMessageAdd',
              { value: e, type: 'error' },
              { root: true }
            )
          }
        }
      )
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
