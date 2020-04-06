import Vue from 'vue'

import {
  metasTitre,
  titre,
  titreCreer,
  titreModifier,
  titreSupprimer,
} from '../api/titres'

import router from '../router'

export const state = {
  current: null,
  metas: {
    referencesTypes: [],
    domaines: [],
  },
}

export const actions = {
  async metasGet({ commit }) {
    commit('loadingAdd', 'metasTitreGet', { root: true })

    try {
      const data = await metasTitre()

      commit('metasSet', { referencesTypes: data })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'metasTitreGet', { root: true })
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
      console.log(e)
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

      if (data) {
        commit('popupClose', null, { root: true })
        router.push({ name: 'titre', params: { id: data.id } })
        dispatch(
          'messageAdd',
          {
            value: `le titre a été créé`,
            type: 'success',
          },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
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
        { value: `le titre a été mis à jour`, type: 'success' },
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
      const data = await titreSupprimer({ id })

      if (data) {
        commit('popupClose', null, { root: true })
        dispatch(
          'messageAdd',
          {
            value: `le titre a été supprimé`,
            type: 'success',
          },
          { root: true }
        )
        router.push({ name: 'titres' })
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreRemove', { root: true })
    }
  },
}

export const mutations = {
  set(state, titre) {
    Vue.set(state, 'current', titre)
  },

  reset(state) {
    Vue.set(state, 'current', null)
  },

  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      Vue.set(state.metas, id, data[id])
    })
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
