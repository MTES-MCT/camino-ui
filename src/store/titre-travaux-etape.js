import {
  titreTravauxEtape,
  travauxEtapeSupprimer
} from '../api/titres-travaux-etapes'

const state = {
  element: null
}

const actions = {
  async get({ commit, dispatch }, id) {
    try {
      commit('loadingAdd', 'titreTravauxEtapeGet', { root: true })

      const travauxEtape = await titreTravauxEtape({ id })

      if (!travauxEtape) {
        dispatch('pageError', null, { root: true })
      }

      commit('set', { travauxEtape })
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'titreTravauxEtapeGet', { root: true })
    }
  },

  async remove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreTravauxEtapeRemove', { root: true })

    try {
      const data = await travauxEtapeSupprimer({ id })

      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        { value: `le titre a été mis à jour`, type: 'success' },
        { root: true }
      )
      await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreTravauxEtapeRemove', { root: true })
    }
  }
}

const mutations = {
  set(state, { travauxEtape }) {
    state.element = travauxEtape
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
