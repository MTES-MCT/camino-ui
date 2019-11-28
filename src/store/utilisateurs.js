import Vue from 'vue'

import {
  utilisateurs,
  utilisateurCreer,
  utilisateurModifier,
  utilisateurSupprimer,
  utilisateurMotDePasseModifier
} from '../api/utilisateurs'

import router from '../router'

export const state = {
  list: []
}

export const actions = {
  async get({ dispatch, commit }) {
    commit('loadingAdd', 'utilisateurs', { root: true })

    try {
      const data = await utilisateurs({})
      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'utilisateurs', { root: true })
    }
  },

  async add({ commit, dispatch }, utilisateur) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'utilisateurAdd', { root: true })
    try {
      const data = await utilisateurCreer({ utilisateur })

      commit('popupClose', null, { root: true })

      if (data) {
        commit('add', data)
        dispatch(
          'messageAdd',
          {
            value: `utilisateur ${data.prenom} ${data.nom} ajouté`,
            type: 'success'
          },
          { root: true }
        )
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurAdd', { root: true })
    }
  },

  async update({ commit, dispatch, rootState }, utilisateur) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'utilisateurUpdate', { root: true })

    try {
      const data = await utilisateurModifier({ utilisateur })

      commit('utilisateur/set', data, { root: true })

      if (utilisateur.id === rootState.user.current.id) {
        commit('user/set', data, { root: true })
      }

      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        {
          value: `utilisateur ${data.prenom} ${data.nom} mis à jour`,
          type: 'success'
        },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurUpdate', { root: true })
    }
  },

  async remove({ commit, dispatch, rootState }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'utilisateurRemove', { root: true })

    try {
      const data = await utilisateurSupprimer({ id })

      if (data) {
        commit('remove', data.id)

        if (data.id === rootState.user.current.id) {
          dispatch('user/logout', null, { root: true })
        }
        commit('popupClose', null, { root: true })
        dispatch(
          'messageAdd',
          {
            value: `utilisateur ${data.prenom} ${data.nom} supprimé`,
            type: 'success'
          },
          { root: true }
        )

        router.push({ name: 'utilisateurs' })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurRemove', { root: true })
    }
  },

  async passwordUpdate(
    { commit, dispatch },
    { id, motDePasse, motDePasseNouveau1, motDePasseNouveau2 }
  ) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'utilisateurPasswordUpdate', { root: true })

    try {
      const data = await utilisateurMotDePasseModifier({
        id,
        motDePasse,
        motDePasseNouveau1,
        motDePasseNouveau2
      })

      if (data) {
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
    } finally {
      commit('loadingRemove', 'utilisateurPasswordUpdate', { root: true })
    }
  }
}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'list', titres)
  },

  add(state, utilisateur) {
    state.list.push(utilisateur)
  },

  remove(state, id) {
    const index = state.list.findIndex(u => u.id === id)
    if (index > -1) {
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
