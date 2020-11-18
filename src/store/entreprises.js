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
      commit('loadingAdd', 'entreprisesGet', { root: true })

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
      commit('loadingRemove', 'entreprisesGet', { root: true })
    }
  },

  async preferencesSet(
    { state, commit, dispatch },
    { section, params, pageReset }
  ) {
    if (pageReset) {
      commit('preferencesSet', { section: 'table', params: { page: 1 } })
    }

    commit('preferencesSet', { section, params })

    if (state.loaded.url) {
      await dispatch('get')
    }
  },

  async urlLoad({ state, commit, dispatch }) {
    if (!state.loaded.url) {
      commit('load', 'url')
      await dispatch('get')
    }
  }
}

export const mutations = {
  reset(state) {
    Vue.set(state, 'list', [])
    state.total = 0
    state.loaded.url = false
  },

  set(state, data) {
    Vue.set(state, 'list', data.elements)
    state.total = data.total
  },

  preferencesSet(state, { section, params }) {
    Object.keys(params).forEach(id => {
      Vue.set(state.preferences[section], id, params[id])
    })
  },

  load(state, section) {
    state.loaded[section] = true
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
