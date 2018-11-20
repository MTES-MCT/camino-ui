import Vue from 'vue'

import {
  utilisateurLogin,
  utilisateurIdentify,
  utilisateurPasswordInit,
  utilisateurPasswordInitEmail
} from '@/api'

export const state = {
  current: null,
  preferences: {
    map: {
      tilesName: 'osm / mapnik'
    }
  },
  popupMessages: []
}

export const actions = {
  async identifier({ commit }) {
    try {
      const user = await utilisateurIdentify()
      commit('set', user)
    } catch (e) {
      commit('tokenRemove')
      commit('reset')
    }
  },

  async login({ commit, dispatch }, { email, motDePasse }) {
    commit('popupMessagesRemove')
    try {
      const res = await utilisateurLogin({ email, motDePasse })

      commit('tokenAdd', res.token)
      commit('set', res.utilisateur)
      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        {
          value: `Bienvenue  ${res.utilisateur.prenom} ${res.utilisateur.nom}`,
          type: 'success'
        },
        { root: true }
      )
      dispatch('load', null, { root: true })
    } catch (e) {
      commit('tokenRemove')
      commit('reset')
      commit('popupMessageAdd', { value: e, type: 'error' })
    }
  },

  logout({ commit, dispatch }) {
    commit('menuClose', null, { root: true })
    commit('tokenRemove')
    commit('reset')
    dispatch(
      'messageAdd',
      { value: `Vous êtes déconnecté`, type: 'success' },
      { root: true }
    )
    dispatch('load', null, { root: true })
  },

  async passwordInitEmail({ commit, dispatch }, { email }) {
    commit('popupMessagesRemove')
    try {
      const res = await utilisateurPasswordInitEmail({ email })
      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        {
          value: `${res}`,
          type: 'success'
        },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' })
    }
  },

  async passwordInit({ commit, dispatch }, { motDePasse1, motDePasse2 }) {
    try {
      const res = await utilisateurPasswordInit({ motDePasse1, motDePasse2 })

      dispatch(
        'messageAdd',
        {
          value: `${res}`,
          type: 'success'
        },
        { root: true }
      )
      return res
    } catch (e) {
      dispatch(
        'messageAdd',
        {
          value: `Erreur: ${e}`,
          type: 'error'
        },
        { root: true }
      )
    }
  }
}

export const getters = {
  tilesActive: (state, getters, rootState) =>
    rootState.map.tiles.find(t => t.name === state.preferences.map.tilesName)
}

export const mutations = {
  preferencesMapTilesNameSelect(state, tilesName) {
    Vue.set(state.preferences.map, 'tilesName', tilesName)
  },

  tokenAdd(state, token) {
    localStorage.setItem('token', token)
  },

  tokenRemove(state) {
    localStorage.removeItem('token')
  },

  set(state, user) {
    Vue.set(state, 'current', {})
    Vue.set(state.current, 'id', user.id)
    Vue.set(state.current, 'prenom', user.prenom)
    Vue.set(state.current, 'nom', user.nom)
    Vue.set(state.current, 'permission', user.permission)
    if (user.entreprise) {
      Vue.set(state.current, 'entreprise', user.entreprise)
    }
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
  getters,
  mutations
}
