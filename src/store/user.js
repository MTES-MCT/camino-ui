import {
  moi,
  utilisateurConnecter,
  utilisateurCerbereTokenCreer,
  utilisateurCerbereUrlObtenir,
  utilisateurCreationMessageEnvoyer,
  utilisateurCreer,
  utilisateurMotDePasseMessageEnvoyer,
  utilisateurMotDePasseInitialiser,
  userMetas,
  newsletterInscrire,
  utilisateurDeconnecter
} from '../api/utilisateurs'

import { permissionsCheck } from '../utils'
import tiles from '../utils/map-tiles'

import router from '../router'

const state = {
  element: null,
  metas: {
    domaines: [],
    version: null,
    /* global npmVersion */
    // @ts-ignore
    versionUi: `${npmVersion}`,
    tiles,
    entreprisesTitresCreation: []
  },
  preferences: {
    carte: { tilesId: 'osm-fr', markerLayersId: 'clusters' }
  },
  loaded: false
}

const actions = {
  async init({ commit, dispatch }) {
    try {
      commit('loadingAdd', 'userInit', { root: true })

      const data = await userMetas({ titresCreation: true })

      commit('metasSet', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'userInit', { root: true })
    }
  },

  async identify({ commit, dispatch }) {
    try {
      commit('loadingAdd', 'userMoi', { root: true })
      const data = await moi()

      commit('set', data)

      await dispatch('init')
    } catch (e) {
      commit('reset')
    } finally {
      commit('loadingRemove', 'userMoi', { root: true })
      commit('load')
    }
  },

  async login({ commit, dispatch }, { email, motDePasse }) {
    try {
      commit('loadingAdd', 'userLogin', { root: true })

      commit('popupMessagesRemove', null, { root: true })

      const utilisateur = await utilisateurConnecter({ email, motDePasse })

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

      await dispatch('init')
      dispatch('errorRemove', null, { root: true })
    } catch (e) {
      commit('reset')
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'userLogin', { root: true })
    }
  },
  async cerbereUrlGet({ commit }, url) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('loadingAdd', 'cerbereUrlGet', { root: true })

      const data = await utilisateurCerbereUrlObtenir({ url })

      return data
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'cerbereUrlGet', { root: true })
    }
  },

  async cerbereLogin({ commit, dispatch }, { ticket }) {
    try {
      commit('loadingAdd', 'userCerbereLogin', { root: true })

      const utilisateur = await utilisateurCerbereTokenCreer({ ticket })

      commit('set', utilisateur)
      dispatch(
        'messageAdd',
        {
          value: `bienvenue ${utilisateur.prenom} ${utilisateur.nom}`,
          type: 'success'
        },
        { root: true }
      )

      await dispatch('init')
      dispatch('errorRemove', null, { root: true })
    } catch (e) {
      commit('reset')
    } finally {
      commit('loadingRemove', 'userCerbereLogin', { root: true })
      commit('load')
    }
  },

  async logout({ commit, dispatch }) {
    try {
      commit('loadingAdd', 'userLogout', { root: true })

      commit('popupMessagesRemove', null, { root: true })

      await utilisateurDeconnecter()

      dispatch(
        'messageAdd',
        { value: `vous êtes déconnecté`, type: 'success' },
        { root: true }
      )

      commit('menuClose', null, { root: true })
      commit('reset')
      dispatch('errorRemove', null, { root: true })
    } catch (e) {
      dispatch('messageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'userLogout', { root: true })
    }
  },

  async addEmail({ commit, dispatch }, email) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('loadingAdd', 'userAddEmail', { root: true })

      await utilisateurCreationMessageEnvoyer({ email })

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
      commit('loadingRemove', 'userAddEmail', { root: true })
    }
  },

  async add({ commit, dispatch }, { utilisateur, token }) {
    try {
      commit('loadingAdd', 'userAdd', { root: true })

      const data = await utilisateurCreer({ utilisateur, token })

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
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('loadingAdd', 'utilisateurPasswordInitEmail', { root: true })

      const data = await utilisateurMotDePasseMessageEnvoyer({
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

  async passwordInit(
    { commit, dispatch },
    { motDePasse1, motDePasse2, token }
  ) {
    try {
      commit('loadingAdd', 'utilisateurPasswordInit', { root: true })

      const utilisateur = await utilisateurMotDePasseInitialiser({
        motDePasse1,
        motDePasse2,
        token
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

      commit('set', utilisateur)
      dispatch(
        'messageAdd',
        {
          value: `bienvenue ${utilisateur.prenom} ${utilisateur.nom}`,
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

  async newsletterSubscribe({ commit, dispatch }, email) {
    try {
      commit('loadingAdd', 'newsletterSubscribe', { root: true })

      const message = await newsletterInscrire({
        email
      })

      dispatch('messageAdd', { value: message, type: 'info' }, { root: true })
    } catch (e) {
      dispatch('messageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'newsletterSubscribe', { root: true })
    }
  }
}

const getters = {
  user(state) {
    return state.element
  },
  hasEntreprises(state) {
    return state?.element?.entreprises?.length > 0
  },
  isLoaded(state) {
    return state.loaded
  },
  tilesActive(state) {
    return state.metas.tiles.find(
      ({ id }) => id === state.preferences.carte.tilesId
    )
  },

  preferencesConditions(state) {
    if (state.element) {
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
  },

  userIsAdmin(state) {
    return permissionsCheck(state.element, ['super', 'admin', 'editeur'])
  },

  userIsSuper(state) {
    return permissionsCheck(state.element, ['super'])
  }
}

const mutations = {
  load(state) {
    state.loaded = true
  },

  preferencesSet(state, { section, params }) {
    Object.keys(params).forEach(id => {
      state.preferences[section][id] = params[id]
    })
  },

  set(state, user) {
    state.element = user
  },

  reset(state) {
    state.element = null
    state.metas.entreprisesTitresCreation = []
    state.metas.domaines = []
  },

  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      state.metas[id] = data[id]
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
