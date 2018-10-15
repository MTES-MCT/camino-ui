import Vue from 'vue'
import {
  utilisateurs,
  utilisateurAdd,
  utilisateurUpdate,
  utilisateurRemove
} from '../api'

import router from '../router'

export const state = {
  list: [],
  permissions: [],
  popupMessages: []
}

export const actions = {
  async get({ dispatch, commit }) {
    try {
      const data = await utilisateurs({})
      if (data.utilisateurs) {
        commit('set', data.utilisateurs)
      }

      if (data.permissions) {
        commit('permissionsSet', data.permissions)
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    }
  },

  async add({ commit, dispatch }, utilisateur) {
    commit('popupMessagesRemove')
    try {
      const data = await utilisateurAdd({ utilisateur })

      commit('popupClose', null, { root: true })

      if (data.utilisateurAjouter) {
        commit('add', data.utilisateurAjouter)
        dispatch(
          'messageAdd',
          {
            value: `Utilisateur ${data.utilisateurAjouter.id} ajouté.`,
            type: 'success'
          },
          { root: true }
        )
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' })
    }
  },

  async update({ commit, dispatch }, utilisateur) {
    commit('popupMessagesRemove')
    try {
      const u = await utilisateurUpdate({ utilisateur })

      commit('utilisateur/set', u, { root: true })
      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        { value: `Utilisateur ${u.id} mis à jour.`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' })
    }
  },

  async remove({ commit, dispatch }, id) {
    commit('popupMessagesRemove')
    try {
      const data = await utilisateurRemove({ id })

      if (data.utilisateurSupprimer) {
        commit('remove', data.utilisateurSupprimer)
        commit('popupClose', null, { root: true })
        dispatch(
          'messageAdd',
          {
            value: `Utilisateur ${data.utilisateurSupprimer.id} supprimé.`,
            type: 'success'
          },
          { root: true }
        )

        router.push({ name: 'utilisateurs' })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' })
    }
  }
}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'list', titres)
  },

  permissionsSet(state, permissions) {
    Vue.set(state, 'permissions', permissions)
  },

  reset(state) {
    Vue.set(state, 'permissions', [])
  },

  add(state, utilisateur) {
    state.list.push(utilisateur)
  },

  remove(state, id) {
    const index = state.list.findIndex(u => u.id === id)
    if (index > 0) {
      state.list.splice(index, 1)
    }
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
