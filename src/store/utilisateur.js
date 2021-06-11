import {
  utilisateurMetas,
  utilisateur,
  utilisateurCreer,
  utilisateurModifier,
  utilisateurSupprimer,
  utilisateurMotDePasseModifier,
  utilisateurEmailMessageEnvoyer,
  utilisateurEmailModifier
} from '../api/utilisateurs'

import router from '../router'

const state = {
  element: null,
  metas: {
    permissions: [],
    entreprises: [],
    administrations: []
  },
  metasLoaded: false
}

const actions = {
  async init({ commit }) {
    commit('loadingAdd', 'utilisateurInit', { root: true })

    try {
      const data = await utilisateurMetas()

      commit('metasSet', data)
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurInit', { root: true })
    }
  },

  async get({ commit, dispatch }, id) {
    commit('loadingAdd', 'utilisateur', { root: true })

    try {
      const data = await utilisateur({ id })

      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateur', { root: true })
    }
  },

  async add({ commit, dispatch }, utilisateur) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'utilisateurAdd', { root: true })
    try {
      const data = await utilisateurCreer({ utilisateur })

      commit('popupClose', null, { root: true })

      router.push({ name: 'utilisateur', params: { id: data.id } })
      dispatch(
        'messageAdd',
        {
          value: `l'utilisateur ${data.prenom} ${data.nom} a été ajouté`,
          type: 'success'
        },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurAdd', { root: true })
    }
  },

  async update({ commit, dispatch, rootState }, utilisateur) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'utilisateurUpdate', { root: true })

    try {
      const data = await utilisateurModifier({ utilisateur })

      commit('popupClose', null, { root: true })

      if (utilisateur.id === rootState.user.element.id) {
        commit('user/set', data, { root: true })
      }

      await dispatch(
        'reload',
        { name: 'utilisateur', id: data.id },
        { root: true }
      )
      dispatch(
        'messageAdd',
        { value: `l'utilisateur a été mis à jour`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurUpdate', { root: true })
    }
  },

  async passwordUpdate(
    { commit, dispatch },
    { id, motDePasse, motDePasseNouveau1, motDePasseNouveau2 }
  ) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'utilisateurPasswordUpdate', { root: true })

    try {
      await utilisateurMotDePasseModifier({
        id,
        motDePasse,
        motDePasseNouveau1,
        motDePasseNouveau2
      })

      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        {
          value: `le mot de passe a été modifié`,
          type: 'success'
        },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurPasswordUpdate', {
        root: true
      })
    }
  },

  async emailVerification({ commit, dispatch }, { email }) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'utilisateurEmailVerification', { root: true })

    try {
      await utilisateurEmailMessageEnvoyer({
        email
      })

      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        {
          value: `un email de vérification vient de vous être envoyé`,
          type: 'success'
        },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurEmailVerification', {
        root: true
      })
    }
  },

  async emailUpdate({ commit, dispatch }, { emailToken }) {
    commit('loadingAdd', 'utilisateurEmailModifier', { root: true })

    try {
      await utilisateurEmailModifier({
        emailToken
      })

      dispatch(
        'messageAdd',
        {
          value: `votre email a été modifié avec succés`,
          type: 'success'
        },
        { root: true }
      )
    } catch (e) {
      dispatch('messageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurEmailModifier', {
        root: true
      })
    }
  },

  async remove({ commit, dispatch, rootState }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'utilisateurRemove', { root: true })

    try {
      const data = await utilisateurSupprimer({ id })

      if (rootState.user.element.id === data.id) {
        await dispatch('user/logout', null, { root: true })
      }
      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        {
          value: `l'utilisateur ${data.prenom} ${data.nom} a été supprimé`,
          type: 'success'
        },
        { root: true }
      )

      router.push({ name: 'utilisateurs' })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurRemove', { root: true })
    }
  }
}

const mutations = {
  set(state, utilisateur) {
    state.element = utilisateur
  },

  reset(state) {
    state.element = null
  },

  metasReset(state) {
    state.metas = {
      permissions: [],
      entreprises: [],
      administrations: []
    }
    state.metasLoaded = false
  },

  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      if (id === 'entreprises' || id === 'administrations') {
        state.metas[id] = data[id].elements
      } else {
        state.metas[id] = data[id]
      }
    })

    state.metasLoaded = true
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
