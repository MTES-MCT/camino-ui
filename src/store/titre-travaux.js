import Vue from 'vue'

import {
  travauxMetas,
  travauxCreer,
  travauxModifier,
  travauxSupprimer
} from '../api/titres-travaux'

export const state = {
  metas: {
    types: []
  }
}

export const actions = {
  async metasGet({ commit }, travaux) {
    commit('loadingAdd', 'travauxMetasGet', { root: true })

    try {
      const data = await travauxMetas(travaux)

      commit('metasSet', { types: data })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'travauxMetasGet', { root: true })
    }
  },

  async add({ commit, dispatch }, travaux) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreTravauxAdd', { root: true })

    try {
      const data = await travauxCreer({ travaux })

      commit('popupClose', null, { root: true })
      await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
      dispatch(
        'messageAdd',
        { value: `le titre a été mis à jour`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreTravauxAdd', { root: true })
    }
  },

  async update({ commit, dispatch }, travaux) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreTravauxUpdate', { root: true })

    try {
      const data = await travauxModifier({ travaux })

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
      commit('loadingRemove', 'titreTravauxUpdate', { root: true })
    }
  },

  async remove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreTravauxRemove', { root: true })

    try {
      const data = await travauxSupprimer({ id })

      commit('popupClose', null, { root: true })
      await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
      dispatch(
        'messageAdd',
        { value: `le titre a été mis à jour`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreTravauxRemove', { root: true })
    }
  }
}

export const mutations = {
  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      Vue.set(state.metas, id, data[id])
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
