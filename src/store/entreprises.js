import Vue from 'vue'
import { entreprises } from '../api/entreprises'
import { paramsBuild } from './_utils'

export const state = {
  list: [],
  total: 0,
  params: [
    { id: 'page', type: 'number', min: 0 },
    { id: 'intervalle', type: 'number', min: 10, max: 500 },
    {
      id: 'colonne',
      type: 'string',
      elements: ['nom', 'siren']
    },
    {
      id: 'ordre',
      type: 'string',
      elements: ['asc', 'desc']
    },
    { id: 'noms', type: 'string' }
  ],
  preferences: {
    table: {
      page: 1,
      intervalle: 200,
      ordre: 'asc',
      colonne: null
    },
    filtres: {
      noms: ''
    }
  },
  loaded: {
    url: false
  }
}

export const actions = {
  async get({ state, dispatch, commit }) {
    try {
      if (!state.loaded.url) return

      commit('loadingAdd', 'entreprises', { root: true })

      const p = paramsBuild(
        state.params,
        Object.assign({}, state.preferences.filtres, state.preferences.table)
      )

      const data = await entreprises(p)

      dispatch(
        'messageAdd',
        {
          value: "liste d'entreprises mise à jour",
          type: 'success'
        },
        { root: true }
      )

      commit('set', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'entreprises', { root: true })
    }
  },

  async preferencesSet({ commit, dispatch }, { section, params }) {
    commit('preferencesSet', { section, params })

    await dispatch('get')
  },

  async loaded({ state, commit, dispatch }) {
    if (!state.loaded.url) {
      commit('loaded', 'url')
      await dispatch('get')
    }
  }
}

export const mutations = {
  set(state, data) {
    Vue.set(state, 'list', data.elements)
    Vue.set(state, 'total', data.total)
  },

  preferencesSet(state, { section, params }) {
    Object.keys(params).forEach(id => {
      Vue.set(state.preferences[section], id, params[id])
    })
  },

  loaded(state, section) {
    state.loaded[section] = true
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
