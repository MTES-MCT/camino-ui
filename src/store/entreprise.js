import Vue from 'vue'
import router from '../router'

import { entreprise, entrepriseCreate, entrepriseUpdate } from '../api'

export const state = {
  current: null
}

export const actions = {
  async get({ commit, dispatch }, id) {
    commit('loadingAdd', 'entreprise', { root: true })

    try {
      const res = await entreprise(id)

      if (res) {
        commit('set', res)
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

  async reload({ dispatch }, { id, idOld }) {
    if (id !== idOld) {
      router.replace({ name: 'entreprise', params: { id } })
    }

    await dispatch('get', id)

    dispatch(
      'messageAdd',
      {
        value: `l'entreprise a été mise à jour`,
        type: 'success'
      },
      { root: true }
    )
  },

  async create({ commit, dispatch }, entreprise) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'entrepriseCreate', { root: true })
    try {
      const res = await entrepriseCreate({ entreprise })

      if (res) {
        commit('popupClose', null, { root: true })
        dispatch('reload', { id: res.id })
        dispatch(
          'messageAdd',
          {
            value: `fiche entreprise ${res.nom} créée`,
            type: 'success'
          },
          { root: true }
        )
      } else {
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'entrepriseCreate', { root: true })
    }
  },

  async update({ commit, dispatch }, entreprise) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'entrepriseUpsert', { root: true })
    try {
      const res = await entrepriseUpdate({ entreprise })

      commit('popupClose', null, { root: true })

      if (res) {
        commit('add', res)
        commit('popupClose', null, { root: true })
        dispatch('reload', { id: res.id, idOld: entreprise.id })
        dispatch(
          'messageAdd',
          {
            value: `fiche entreprise ${res.nom} modifiée`,
            type: 'success'
          },
          { root: true }
        )
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'entrepriseUpsert', { root: true })
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
