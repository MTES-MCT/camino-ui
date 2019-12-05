import Vue from 'vue'
import {
  entreprise,
  entrepriseCreer,
  entrepriseModifier
} from '../api/entreprises'

export const state = {
  current: null
}

export const actions = {
  async get({ commit, dispatch }, id) {
    commit('loadingAdd', 'entreprise', { root: true })

    try {
      const data = await entreprise({ id })

      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'entreprise', { root: true })
    }
  },

  async add({ commit, dispatch }, entreprise) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'entrepriseAdd', { root: true })
    try {
      const data = await entrepriseCreer({ entreprise })

      commit('popupClose', null, { root: true })
      await dispatch(
        'reload',
        { id: data.id, name: 'entreprise' },
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
    Vue.set(state, 'current', entreprise)
  },

  reset(state) {
    Vue.set(state, 'current', null)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
