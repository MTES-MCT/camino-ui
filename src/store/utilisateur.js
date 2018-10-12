import Vue from 'vue'
import router from '../router'

import { utilisateur, connecter, identifier } from '@/api'

export const state = {
  id: undefined,
  email: undefined,
  nom: undefined,
  prenom: undefined,
  telephoneMobile: undefined,
  telephoneFixe: undefined,
  administrationId: undefined,
  entrepriseId: undefined,
  permissions: [],
  preferences: {
    map: {
      tilesName: 'osm / mapnik'
    }
  },
  popupMessages: []
}

export const actions = {
  async get({ commit, dispatch }, { id }) {
    const u = await utilisateur(id)

    if (u) {
      commit('set', u)
    } else if (u === null) {
      router.push({ name: 'error' })
    } else {
      console.log('fix me')
      dispatch('apiError', null, { root: true })
    }
  },

  async connecter({ commit, dispatch }, { id, motDePasse }) {
    commit('popupMessagesRemove')
    try {
      const { token, utilisateur } = await connecter({ id, motDePasse })

      commit('tokenAdd', token)
      commit('set', utilisateur)
      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        { value: `Bienvenue ${id}`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('tokenRemove')
      commit('reset')
      commit('popupMessageAdd', { value: e, type: 'error' })
    }
  },

  async identifier({ commit }) {
    try {
      const utilisateur = await identifier()
      commit('set', utilisateur)
    } catch (e) {
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
  set(
    state,
    {
      id,
      email,
      nom,
      prenom,
      telephoneMobile,
      telephoneFixe,
      administrationId,
      entrepriseId,
      permissions
    }
  ) {
    state.id = id
    state.email = email
    state.nom = nom
    state.prenom = prenom
    state.telephoneMobile = telephoneMobile
    state.telephoneFixe = telephoneFixe
    state.administrationId = administrationId
    state.entrepriseId = entrepriseId
    state.permissions = permissions
  },
  reset(state) {
    state.id = undefined
    state.email = undefined
    state.nom = undefined
    state.prenom = undefined
    state.telephoneMobile = undefined
    state.telephoneFixe = undefined
    state.administrationId = undefined
    state.entrepriseId = undefined
    state.permissions = []
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
