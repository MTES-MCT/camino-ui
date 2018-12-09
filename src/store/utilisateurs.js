import Vue from 'vue'
import {
  utilisateurs,
  utilisateurAdd,
  utilisateurUpdate,
  utilisateurRemove,
  utilisateurPasswordUpdate
} from '../api'

import router from '../router'

export const state = {
  list: [],
  permissions: []
}

export const actions = {
  async get({ dispatch, commit }) {
    try {
      const res = await utilisateurs({})

      if (res) {
        commit('set', res)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    }
  },

  async add({ commit, dispatch }, utilisateur) {
    commit('popupMessagesRemove', null, { root: true })
    try {
      const u = await utilisateurAdd({ utilisateur })

      commit('popupClose', null, { root: true })

      if (u) {
        commit('add', u)
        dispatch(
          'messageAdd',
          {
            value: `utilisateur ${u.id} ajouté`,
            type: 'success'
          },
          { root: true }
        )
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    }
  },

  async update({ commit, dispatch, rootState }, utilisateur) {
    commit('popupMessagesRemove', null, { root: true })
    try {
      const u = await utilisateurUpdate({ utilisateur })

      commit('utilisateur/set', u, { root: true })

      if (utilisateur.id === rootState.user.current.id) {
        commit('user/set', u, { root: true })
      }
      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        { value: `utilisateur ${u.id} mis à jour`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    }
  },

  async remove({ commit, dispatch, rootState }, id) {
    commit('popupMessagesRemove', null, { root: true })
    try {
      const utilisateur = await utilisateurRemove({ id })

      if (utilisateur) {
        commit('remove', utilisateur)

        if (utilisateur === rootState.user.current.id) {
          commit('user/logout', null, { root: true })
        }
        commit('popupClose', null, { root: true })
        dispatch(
          'messageAdd',
          {
            value: `utilisateur ${utilisateur.id} supprimé`,
            type: 'success'
          },
          { root: true }
        )

        router.push({ name: 'utilisateurs' })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    }
  },

  async passwordUpdate(
    { commit, dispatch },
    { id, motDePasse, motDePasseNouveau1, motDePasseNouveau2 }
  ) {
    commit('popupMessagesRemove', null, { root: true })

    try {
      const utilisateur = await utilisateurPasswordUpdate({
        id,
        motDePasse,
        motDePasseNouveau1,
        motDePasseNouveau2
      })

      if (utilisateur) {
        commit('popupClose', null, { root: true })
        dispatch(
          'messageAdd',
          {
            value: `mot de passe modifié`,
            type: 'success'
          },
          { root: true }
        )
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
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
  },

  remove(state, id) {
    const index = state.list.findIndex(u => u.id === id)
    if (index > 0) {
      state.list.splice(index, 1)
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
