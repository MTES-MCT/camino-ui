import {
  documentMetas,
  documentCreer,
  documentModifier,
  documentSupprimer
} from '../api/documents'

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

  async upsert(
    { commit, dispatch },
    { document, route, mutation, temporaire }
  ) {
    try {
      commit('loadingAdd', 'documentUpsert', { root: true })

      if (route) {
        commit('popupMessagesRemove', null, { root: true })
        commit('popupLoad', null, { root: true })
      }

      const idOld = document.id

      let d

      if (temporaire) {
        delete document.id
      }

      if (!document.id) {
        d = await documentCreer({ document })
      } else {
        delete document.typeId
        d = await documentModifier({ document })
      }

      if (route || mutation) {
        commit('popupClose', null, { root: true })

        dispatch(
          'messageAdd',
          { value: `le document a été mis à jour`, type: 'success' },
          { root: true }
        )
      }

      if (route) {
        await dispatch('reload', route, { root: true })

        if (route.name === 'titre') {
          const section = route.section
          let id

          if (section === 'etapes') id = document.titreEtapeId
          if (section === 'travaux') id = document.titreTravauxEtapeId

          commit('titre/open', { section, id }, { root: true })
        }
      } else if (mutation) {
        const params = { ...mutation.params, document: d }

        if (temporaire) {
          params.idOld = idOld
        }

        commit(mutation.name, params, { root: true })
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
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
