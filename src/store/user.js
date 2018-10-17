import Vue from 'vue'

import { utilisateurLogin, identifier } from '@/api'

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
      dispatch('reload', null, { root: true })
    } catch (e) {
      commit('tokenRemove')
      commit('reset')
      commit('popupMessageAdd', { value: e, type: 'error' })
    }
  },

  async identifier({ commit }) {
    try {
      const user = await identifier()

      commit('set', user)
    } catch (e) {
      commit('tokenRemove')
      commit('reset')
    }
  },

  logout({ commit, dispatch }) {
    commit('menuClose', null, { root: true })
    commit('tokenRemove')
    commit('reset')
    dispatch(
      'messageAdd',
      { value: `Vous êtes déconnecté.`, type: 'success' },
      { root: true }
    )
    dispatch('reload', null, { root: true })
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
