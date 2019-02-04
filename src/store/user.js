import Vue from 'vue'

import {
  utilisateurLogin,
  utilisateurIdentify,
  utilisateurPasswordInit,
  utilisateurPasswordInitEmail,
  utilisateurAddEmail,
  utilisateurAdd
} from '@/api'

import router from '../router'

export const state = {
  current: null,
  preferences: {
    map: { tilesId: 'osm-fr' },
    titres: {
      vue: 'carte'
    }
  }
}

export const actions = {
  async init({ dispatch }) {
    if (localStorage.getItem('token')) {
      await dispatch('identify')
    } else {
      dispatch('tokenRemove')
    }
  },

  async identify({ commit, dispatch }) {
    try {
      const res = await utilisateurIdentify()

      commit('set', res.utilisateur)
      dispatch('tokenSet', res.token)
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
    } finally {
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

  async addEmail({ commit, dispatch }, email) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'utilisateurAddEmail', { root: true })

    try {
      const res = await utilisateurAddEmail({ email })
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
    } finally {
      commit('loadingRemove', 'utilisateurAddEmail', { root: true })
    }
  },

  async add({ commit, dispatch }, utilisateur) {
    commit('loadingAdd', 'userAdd', { root: true })

    try {
      const u = await utilisateurAdd({ utilisateur })

      if (u) {
        dispatch(
          'messageAdd',
          {
            value: `utilisateur ${u.prenom} ${u.nom} ajouté`,
            type: 'success'
          },
          { root: true }
        )

        router.push({ name: 'titres' })

        dispatch('login', {
          email: u.email,
          motDePasse: utilisateur.motDePasse
        })
      }
    } catch (e) {
      dispatch(
        'messageAdd',
        {
          value: `Erreur: ${e}`,
          type: 'error'
        },
        { root: true }
      )
    } finally {
      commit('loadingRemove', 'userAdd', { root: true })
    }
  },

  async passwordInitEmail({ commit, dispatch }, email) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'utilisateurPasswordInitEmail', { root: true })

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
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurPasswordInitEmail', { root: true })
    }
  },

  async passwordInit(
    { commit, dispatch },
    { motDePasse1, motDePasse2, email }
  ) {
    commit('loadingAdd', 'utilisateurPasswordInit', { root: true })

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

      router.push({ name: 'titres' })

      dispatch('login', { email, motDePasse: motDePasse1 })

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
    } finally {
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
    return rootState.map.tiles.find(t => t.id === state.preferences.map.tilesId)
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
