import {
  entreprise,
  entrepriseCreer,
  entrepriseModifier
} from '../api/entreprises'

import router from '../router'

export const state = {
  element: null
}

export const actions = {
  async get({ commit, dispatch }, id) {
    commit('loadingAdd', 'entrepriseGet', { root: true })
    try {
      const data = await entreprise({ id })

      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'entrepriseGet', { root: true })
    }
  },

  async add({ commit, dispatch }, entreprise) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'entrepriseAdd', { root: true })
    try {
      const data = await entrepriseCreer({ entreprise })

      commit('popupClose', null, { root: true })

      router.push({ name: 'entreprise', params: { id: data.id } })
      dispatch(
        'messageAdd',
        { value: `l'entreprise a été créée`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'entrepriseAdd', { root: true })
    }
  },

  async update({ commit, dispatch }, entreprise) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'entrepriseUpdate', { root: true })
    try {
      const data = await entrepriseModifier({ entreprise })

      commit('popupClose', null, { root: true })
      await dispatch(
        'reload',
        { name: 'entreprise', id: data.id },
        { root: true }
      )
      dispatch(
        'messageAdd',
        { value: `l'entreprise a été mise à jour`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'entrepriseUpdate', { root: true })
    }
  }
}

export const mutations = {
  set(state, entreprise) {
    state.element = entreprise
  },

  reset(state) {
    state.element = null
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
