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
    titres: {
      map: { tilesId: 'osm-fr' },
      vue: 'carte'
    }
  }
}

export const actions = {
  async init({ dispatch }) {
    if (localStorage.getItem('token')) {
      await dispatch('identifier')
    } else {
      dispatch('tokenRemove')
    }
  },

  async identifier({ commit, dispatch }) {
    try {
      const user = await utilisateurIdentify()
      console.log('user', user)
      commit('set', user)
    } catch (e) {
      dispatch('tokenRemove')
      commit('reset')
    }
  },

  async login({ commit, dispatch }, { email, motDePasse }) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'utilisateurLogin', { root: true })

    try {
      const res = await utilisateurLogin({ email, motDePasse })
      commit('loadingRemove', 'utilisateurLogin', { root: true })

      dispatch('tokenSet', res.token)
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
      dispatch('tokenRemove')
      commit('reset')
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
      commit('loadingRemove', 'utilisateurLogin', { root: true })
    }
  },

  logout({ commit, dispatch }) {
    commit('menuClose', null, { root: true })
    dispatch('tokenRemove')
    commit('reset')
    dispatch(
      'messageAdd',
      { value: `Vous êtes déconnecté`, type: 'success' },
      { root: true }
    )
    dispatch('load', null, { root: true })
  },

  async passwordInitEmail({ commit, dispatch }, { email }) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'utilisateurPasswordInitEmail', { root: true })
    try {
      const res = await utilisateurPasswordInitEmail({ email })
      commit('loadingRemove', 'utilisateurPasswordInitEmail', { root: true })
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
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
      commit('loadingRemove', 'utilisateurPasswordInitEmail', { root: true })
    }
  },

  async passwordInit({ commit, dispatch }, { motDePasse1, motDePasse2 }) {
    commit('loadingAdd', 'utilisateurPasswordInit', { root: true })
    try {
      const res = await utilisateurPasswordInit({ motDePasse1, motDePasse2 })
      commit('loadingRemove', 'utilisateurPasswordInit', { root: true })

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
      commit('loadingRemove', 'utilisateurPasswordInit', { root: true })
    }
  },

  preferenceSet({ state, commit }, { section, value }) {
    commit('preferenceSet', { section, value })
    if (section === 'conditions') {
      localStorage.setItem('conditions', value)
    }
  },

  tokenSet({ commit }, token) {
    localStorage.setItem('token', token)
  },

  tokenRemove() {
    localStorage.removeItem('token')
  }
}

export const getters = {
  tilesActive(state, getters, rootState) {
    return rootState.map.tiles.find(
      t => t.id === state.preferences.titres.map.tilesId
    )
  },

  preferencesConditions(state) {
    if (state.current) {
      return true
    }

    const threedays = 1000 * 60 * 60

    if (
      localStorage.getItem('conditions') &&
      Number(localStorage.getItem('conditions')) + threedays >
        new Date().getTime()
    ) {
      return true
    }

    return false
  }
}

export const mutations = {
  preferenceSet(state, { section, value }) {
    const path = section.split('.')
    const key = path.pop()
    const p = path.reduce((res, el) => res[el], state.preferences)
    Vue.set(p, key, value)
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
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
