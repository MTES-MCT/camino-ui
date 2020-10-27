import Vue from 'vue'
import {
  administration,
  metasAdministration,
  administrationModifier
} from '../api/administrations'

export const state = {
  current: null,
  metas: { types: [], regions: [], departements: [] }
}

export const actions = {
  async metasGet({ commit }) {
    commit('loadingAdd', 'metasAdministrationGet', { root: true })

    try {
      const data = await metasAdministration()

      commit('metasSet', data)
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'metasAdministrationGet', { root: true })
    }
  },

  async get({ commit, dispatch }, id) {
    commit('loadingAdd', 'administration', { root: true })

    try {
      const data = await administration({ id })

      commit('set', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'administration', { root: true })
    }
  },

  async update({ commit, dispatch }, administration) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'administrationUpdate', { root: true })
      const data = await administrationModifier({ administration })

      commit('popupClose', null, { root: true })
      await dispatch(
        'reload',
        { name: 'administration', id: data.id },
        { root: true }
      )
      dispatch(
        'messageAdd',
        { value: `l'administration a été mise à jour`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'administrationUpdate', { root: true })
    }
  }
}

export const mutations = {
  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      if (id === 'administrationsTypes') {
        Vue.set(state.metas, 'types', data[id])
      } else {
        Vue.set(state.metas, id, data[id])
      }
    })
  },

  set(state, administration) {
    Vue.set(state, 'current', administration)
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
