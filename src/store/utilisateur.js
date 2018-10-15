import Vue from 'vue'
import router from '../router'

import { utilisateur, utilisateurUpdate } from '@/api'

export const state = {
  current: null,
  popupMessages: []
}

export const actions = {
  async get({ commit, dispatch }, { id }) {
    try {
      const res = await utilisateur(id)

      if (res.utilisateur) {
        commit('set', res.utilisateur)
      } else {
        router.push({ name: 'error' })
      }

      if (res.permissions) {
        commit('utilisateurs/permissionsSet', res.permissions, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    }
  },

  async update({ commit, dispatch }, utilisateur) {
    try {
      const u = await utilisateurUpdate({ utilisateur })
      commit('set', u)
      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        { value: `Utilisateur ${u.id} mis à jour.`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' })
    }
  }
}

export const mutations = {
  set(state, utilisateur) {
    Vue.set(state, 'current', utilisateur)
  },

  reset(state) {
    Vue.set(state, 'current', null)
  },

  popupMessagesRemove(state) {
    state.popupMessages = []
  },

  popupMessageAdd(state, message) {
    state.popupMessages.push(message)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
