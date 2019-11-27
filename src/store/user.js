import Vue from 'vue'

import {
  moi,
  utilisateurTokenCreer,
  utilisateurCreationEmailEnvoyer,
  utilisateurCreer,
  utilisateurMotDePasseEmailEnvoyer,
  utilisateurMotDePasseInitialiser
} from '../api/utilisateurs'

import router from '../router'

export const state = {
  current: null,
  preferences: {
    carte: { tilesId: 'osm-fr' },
    titres: {
      vueId: 'carte',
      table: {
        page: 1,
        range: 200
      },
      filtres: {
        types: null,
        domaines: null,
        statuts: null,
        noms: null,
        entreprises: null,
        substances: null,
        references: null,
        territoires: null
      }
    }
  },
  titresFiltresLoaded: 0,
  loaded: false
}

export const actions = {
  async identify({ commit, dispatch }) {
    try {
      const data = await moi()

      commit('set', data)
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
      const data = await utilisateurTokenCreer({ email, motDePasse })

      const { utilisateur, token } = data

      dispatch('tokenSet', token)
      commit('set', utilisateur)
      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        {
          value: `bienvenue ${utilisateur.prenom} ${utilisateur.nom}`,
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
      { value: `vous êtes déconnecté`, type: 'success' },
      { root: true }
    )
  },

  async addEmail({ commit, dispatch }, email) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'utilisateurAddEmail', { root: true })

    try {
      await utilisateurCreationEmailEnvoyer({ email })

      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        {
          value: 'un email pour créer votre compte a été envoyé',
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
      const data = await utilisateurCreer({ utilisateur })

      if (data) {
        dispatch(
          'messageAdd',
          {
            value: `utilisateur ${data.prenom} ${data.nom} ajouté`,
            type: 'success'
          },
          { root: true }
        )

        await dispatch('login', {
          email: data.email,
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
      const data = await utilisateurMotDePasseEmailEnvoyer({
        email
      })
      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        {
          value: `${data}`,
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
      const data = await utilisateurMotDePasseInitialiser({
        motDePasse1,
        motDePasse2
      })

      dispatch(
        'messageAdd',
        {
          value: 'mot de passe mis à jour',
          type: 'success'
        },
        { root: true }
      )

      router.push({ name: 'titres' })

      dispatch('tokenSet', data.token)
      commit('set', data.utilisateur)
      dispatch(
        'messageAdd',
        {
          value: `bienvenue ${data.utilisateur.prenom} ${data.utilisateur.nom}`,
          type: 'success'
        },
        { root: true }
      )
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
