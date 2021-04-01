import { entreprises } from '../api/entreprises'
import { paramsBuild } from '../utils/'

export const state = {
  elements: [],
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
  initialized: false
}

export const actions = {
  async init({ dispatch, commit }) {
    try {
      commit('loadingAdd', 'entreprisesInit', { root: true })
      if (!state.initialized) {
        commit('init')
      }

      await dispatch('get')
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'entreprisesInit', { root: true })
    }
  },

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
    } finally {
      commit('loadingRemove', 'entreprisesGet', { root: true })
    }
  },

  async preferencesSet(
    { state, commit, dispatch },
    { section, params, pageReset }
  ) {
    if (section === 'table' && pageReset && state.preference.page !== 1) {
      params.page = 1
    }

    commit('preferencesSet', { section, params })

    await dispatch('get')
  }
}

export const mutations = {
  init(state) {
    state.initialized = true
  },

  reset(state) {
    state.elements = []
    state.total = 0
    state.initalized = false
  },

  set(state, data) {
    state.elements = data.elements
    state.total = data.total
  },

  preferencesSet(state, { section, params }) {
    Object.keys(params).forEach(id => {
      state.preferences[section][id] = params[id]
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
