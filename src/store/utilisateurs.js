import Vue from 'vue'
import { utilisateurs, utilisateurAdd } from '../api'

export const state = {
  list: [],
  permissions: []
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
    try {
      const data = await utilisateurAdd({ utilisateur })

      if (data.utilisateurAjouter) {
        commit('add', data.utilisateurAjouter)
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
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
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
