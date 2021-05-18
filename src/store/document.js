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

  async add({ commit, dispatch }, { document, context }) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('loadingAdd', 'documentAdd', { root: true })
      if (context) {
        commit('popupLoad', null, { root: true })
      }

      await documentCreer({ document })

      if (context) {
        commit('popupClose', null, { root: true })

        dispatch(
          'messageAdd',
          { value: `le document a été ajouté`, type: 'success' },
          { root: true }
        )
        await dispatch('reload', context, { root: true })
        if (context.name === 'titre') {
          const section = context.section
          let id
          if (section === 'etapes') id = document.titreEtapeId
          if (section === 'travaux') id = document.titreTravauxEtapeId

          commit('titre/open', { section, id }, { root: true })
        }
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'documentAdd', { root: true })
    }
  },

  async update({ commit, dispatch }, { document, context }) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('loadingAdd', 'documentUpdate', { root: true })
      if (context) {
        commit('popupLoad', null, { root: true })
      }

      delete document.typeId
      await documentModifier({ document })

      if (context) {
        commit('popupClose', null, { root: true })

        dispatch(
          'messageAdd',
          { value: `le document a été mis à jour`, type: 'success' },
          { root: true }
        )
        await dispatch('reload', context, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'documentUpdate', { root: true })
    }
  },

  async remove({ commit, dispatch }, { id, context }) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('loadingAdd', 'documentRemove', { root: true })
      if (context) {
        commit('popupLoad', null, { root: true })
      }

      await documentSupprimer({ id })

      if (context) {
        commit('popupClose', null, { root: true })

        dispatch(
          'messageAdd',
          { value: `le document a été supprimé`, type: 'success' },
          { root: true }
        )
        await dispatch('reload', context, { root: true })
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
