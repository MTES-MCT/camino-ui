import {
  titreMetas,
  titre,
  titreCreer,
  titreModifier,
  titreSupprimer
} from '../api/titres'

import router from '../router'

export const state = {
  current: null,
  metas: {
    referencesTypes: [],
    domaines: []
  },
  opened: {
    etapes: {},
    activites: {},
    travaux: {}
  }
}

export const actions = {
  async metasGet({ commit }) {
    commit('loadingAdd', 'titreMetasGet', { root: true })

    try {
      const data = await titreMetas()

      commit('metasSet', { referencesTypes: data })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreMetasGet', { root: true })
    }
  },

  async get({ commit, dispatch }, id) {
    commit('loadingAdd', 'titre', { root: true })

    try {
      const data = await titre({ id })

      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'titre', { root: true })
    }
  },

  async titreAdd({ commit, dispatch }, titre) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreAdd', { root: true })

    try {
      const data = await titreCreer({ titre })

      commit('popupClose', null, { root: true })
      router.push({ name: 'titre', params: { id: data.id } })
      dispatch(
        'messageAdd',
        {
          value: 'le titre a été créé',
          type: 'success'
        },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreAdd', { root: true })
    }
  },

  async titreUpdate({ commit, dispatch }, titre) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreUpdate', { root: true })

    try {
      const data = await titreModifier({ titre })

      commit('popupClose', null, { root: true })
      await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
      dispatch(
        'messageAdd',
        { value: 'le titre a été mis à jour', type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreUpdate', { root: true })
    }
  },

  async titreRemove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreRemove', { root: true })

    try {
      await titreSupprimer({ id })

      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        {
          value: `le titre a été supprimé`,
          type: 'success'
        },
        { root: true }
      )
      router.push({ name: 'titres' })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreRemove', { root: true })
    }
  }
}

export const mutations = {
  set(state, titre) {
    state.current = titre
  },

  reset(state) {
    state.current = null
  },

  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      state.metas[id] = data[id]
    })
  },

  open(state, { section, id }) {
    if (!state.opened[section][id]) {
      state.opened[section][id] = true
    }
  },

  close(state, { section, id }) {
    if (state.opened[section][id]) {
      state.opened[section][id] = false
    }
  },

  toggle(state, { section, id }) {
    if (state.opened[section][id]) {
      state.opened[section][id] = false
    } else {
      state.opened[section][id] = true
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
