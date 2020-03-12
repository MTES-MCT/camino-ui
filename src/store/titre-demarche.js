import Vue from 'vue'

import {
  metasTitreDemarche,
  demarcheCreer,
  demarcheModifier,
  demarcheSupprimer
} from '../api/titres-demarches'

export const state = {
  metas: {
    types: []
  }
}

export const actions = {
  async metasGet({ commit }, demarche) {
    commit('loadingAdd', 'metasTitreDemarcheGet', { root: true })

    try {
      const data = await metasTitreDemarche(demarche)

      commit('metasSet', { types: data })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'metasTitreDemarcheGet', { root: true })
    }
  },

  async add({ commit, dispatch }, demarche) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDemarcheAdd', { root: true })

    try {
      const data = await demarcheCreer({ demarche })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheAdd', { root: true })
    }
  },

  async update({ commit, dispatch }, demarche) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDemarcheUpdate', { root: true })

    try {
      const data = await demarcheModifier({ demarche })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheUpdate', { root: true })
    }
  },

  async remove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDemarcheRemove', { root: true })

    try {
      const data = await demarcheSupprimer({ id })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheRemove', { root: true })
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
