import Vue from 'vue'
import router from '../router'

import { utilisateur } from '@/api'

export const state = {
  current: null
}

export const actions = {
  async get({ commit, dispatch }, id) {
    try {
      const res = await utilisateur(id)

      if (res.utilisateur) {
        commit('set', res.utilisateur)
      } else {
        router.push({ name: 'erreur' })
      }

      if (res.permissions) {
        commit('utilisateurs/permissionsSet', res.permissions, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    }
  }
}

export const mutations = {
  set(state, utilisateur) {
    Vue.set(state, 'current', utilisateur)
  },

  reset(state) {
    Vue.set(state, 'current', null)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
