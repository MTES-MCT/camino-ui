import Vue from 'vue'

import {
  moi,
  utilisateurTokenCreer,
  utilisateurCerbereTokenCreer,
  utilisateurCerbereUrlObtenir,
  utilisateurCreationEmailEnvoyer,
  utilisateurCreer,
  utilisateurMotDePasseEmailEnvoyer,
  utilisateurMotDePasseInitialiser,
  metasUser
} from '../api/utilisateurs'

import tiles from './_map-tiles'

import router from '../router'

export const state = {
  current: null,
  metas: {
    domaines: [],
    version: null,
    /* global npmVersion */
    // @ts-ignore
    versionUi: `${npmVersion}`,
    tiles
  },
  preferences: {
    carte: { tilesId: 'osm-fr', markerLayersId: 'clusters' }
  }
}

export const actions = {
  async metasGet({ commit, dispatch }) {
    commit('loadingAdd', 'metasUser', { root: true })

    try {
      const data = await metasUser()

      commit('metasSet', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'metasUser', { root: true })
    }
  },

  async identify({ commit, dispatch }) {
    try {
      const data = await moi()

      commit('set', data)
    } catch (e) {
      dispatch('tokensRemove')
      commit('reset')
    }
  },

  async login({ commit, dispatch }, { email, motDePasse }) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'utilisateurLogin', { root: true })

    try {
      const data = await utilisateurTokenCreer({ email, motDePasse })

      const { utilisateur } = data

      dispatch('tokensSet', data)
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
      dispatch('tokensRemove')
      commit('reset')
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurLogin', { root: true })
    }
  },

  async cerbereUrlGet({ commit }, url) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'cerbereUrlGet', { root: true })

    try {
      const data = await utilisateurCerbereUrlObtenir({ url })

      return data
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'cerbereUrlGet', { root: true })
    }
  },

  async cerbereLogin({ commit, dispatch }, { ticket }) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'cerbereLogin', { root: true })

    try {
      const data = await utilisateurCerbereTokenCreer({ ticket })

      const { utilisateur } = data

      dispatch('tokensSet', data)
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
      dispatch('tokensRemove')
      commit('reset')
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'cerbereLogin', { root: true })
    }
  },

  async logout({ commit, dispatch }) {
    commit('menuClose', null, { root: true })
    dispatch('tokensRemove')
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
      dispatch('messageAdd', { value: e, type: 'error' }, { root: true })
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
      dispatch('messageAdd', { value: data, type: 'success' }, { root: true })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurPasswordInitEmail', {
        root: true
      })
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

      dispatch('tokensSet', data)
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
      dispatch('messageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurPasswordInit', { root: true })
    }
  },

  preferencesSet({ commit }, { section, params }) {
    if (section === 'conditions') {
      localStorage.setItem('conditions', params.value)
    } else {
      commit('preferencesSet', { section, params })
    }
  },

  tokensSet(_, tokens) {
    localStorage.setItem('accessToken', tokens.accessToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
  },

  tokensRemove() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
}

export const getters = {
  tilesActive(state) {
    return state.metas.tiles.find(
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
  preferencesSet(state, { section, params }) {
    Object.keys(params).forEach(id => {
      Vue.set(state.preferences[section], id, params[id])
    })
  },

  set(state, user) {
    Vue.set(state, 'current', user)
  },

  reset(state) {
    Vue.set(state, 'current', null)
  },

  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      Vue.set(state.metas, id, data[id])
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
