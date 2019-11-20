import Vue from 'vue'

import {
  utilisateurLogin,
  utilisateurIdentify,
  utilisateurPasswordInit,
  utilisateurPasswordInitEmail,
  utilisateurAddEmail,
  utilisateurAdd
} from '../api'

import router from '../router'

export const state = {
  current: null,
  preferences: {
    carte: { tilesId: 'osm-fr' },
    filtres: {},
    titres: {
      vueId: 'carte',
      page: 1,
      range: 200
    }
  },
  titresFiltresLoaded: 0,
  loaded: false
}

export const actions = {
  async identify({ commit, dispatch }) {
    try {
      const res = await utilisateurIdentify()

      if (res.utilisateur && res.token) {
        dispatch('tokenSet', res.token)
        commit('set', res.utilisateur)
      } else {
        throw new Error("l'utilisateur n'est pas connecté")
      }
    } catch (e) {
      dispatch('tokenRemove')
      commit('reset')
    } finally {
      commit('load')
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
          value: `bienvenue ${res.utilisateur.prenom} ${res.utilisateur.nom}`,
          type: 'success'
        },
        { root: true }
      )
      dispatch('errorRemove', null, { root: true })
    } catch (e) {
      dispatch('tokenRemove')
      commit('reset')
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurLogin', { root: true })
    }
  },

  async logout({ commit, dispatch }) {
    commit('menuClose', null, { root: true })
    dispatch('tokenRemove')
    commit('reset')
    dispatch(
      'messageAdd',
      { value: `Vous êtes déconnecté`, type: 'success' },
      { root: true }
    )
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

        await dispatch('login', {
          email: u.email,
          motDePasse: utilisateur.motDePasse
        })

        router.push({ name: 'titres' })
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

  async passwordInit({ commit, dispatch }, { motDePasse1, motDePasse2 }) {
    commit('loadingAdd', 'utilisateurPasswordInit', { root: true })

    try {
      const res = await utilisateurPasswordInit({ motDePasse1, motDePasse2 })

      dispatch(
        'messageAdd',
        {
          value: 'mot de passe mis à jour',
          type: 'success'
        },
        { root: true }
      )

      router.push({ name: 'titres' })

      dispatch('tokenSet', res.token)
      commit('set', res.utilisateur)
      dispatch(
        'messageAdd',
        {
          value: `bienvenue ${res.utilisateur.prenom} ${res.utilisateur.nom}`,
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
    } finally {
      commit('loadingRemove', 'utilisateurPasswordInit', { root: true })
    }
  },

  preferenceSet({ commit }, { section, value }) {
    commit('preferenceSet', { section, value })
    if (section === 'conditions') {
      localStorage.setItem('conditions', value)
    }
  },

  preferenceReset({ commit }, { section }) {
    commit('preferenceReset', { section })
  },

  tokenSet({ commit }, token) {
    localStorage.setItem('token', token)
  },

  tokenRemove({ commit }) {
    localStorage.removeItem('token')
  }
}

export const getters = {
  tilesActive(state, getters, rootState) {
    return rootState.map.tiles.find(
      ({ id }) => id === state.preferences.carte.tilesId
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
  load(state) {
    state.loaded = true
  },

  preferenceSet(state, { section, value }) {
    const path = section.split('.')
    const id = path.pop()
    const p = path.reduce((res, el) => res[el], state.preferences)
    Vue.set(p, id, value)
  },

  preferenceReset(state, { section }) {
    const path = section.split('.')
    const key = path.pop()
    const p = path.reduce((res, el) => res[el], state.preferences)
    Vue.delete(p, key)
  },

  set(state, user) {
    Vue.set(state, 'current', user)
  },

  reset(state) {
    Vue.set(state, 'current', null)
  },

  titresFiltresLoaded(state) {
    state.titresFiltresLoaded++
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
