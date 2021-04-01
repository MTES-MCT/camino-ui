import { urlQueryParamsGet } from '../utils/url'
import { entreprises } from '../api/entreprises'
import { paramsBuild } from '../utils/'

export const state = {
  elements: [],
  total: 0,
  definitions: [
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
  params: {
    table: {
      page: 1,
      intervalle: 200,
      ordre: 'asc',
      colonne: null
    },
    filtres: { noms: '' }
  },
  initialized: false
}

export const actions = {
  async init({ dispatch, commit }) {
    try {
      commit('loadingAdd', 'entreprisesInit', { root: true })

      if (!state.initialized) {
        await dispatch('paramsFromQueryUpdate')

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

      if (!state.initialized) return

      await dispatch('urlQueryUpdate')

      const p = paramsBuild(
        state.definitions,
        Object.assign({}, state.params.filtres, state.params.table)
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

  async paramsSet({ state, commit, dispatch }, { section, params, pageReset }) {
    if (section === 'table' && pageReset && state.params.table.page !== 1) {
      params.page = 1
    }

    commit('paramsSet', { section, params })

    await dispatch('get')
  },

  async routeUpdate({ dispatch }) {
    const hasChanged = await dispatch('paramsFromQueryUpdate')

    if (hasChanged) {
      await dispatch('get')
    }
  },

  async paramsFromQueryUpdate({ rootState, state, commit }) {
    let hasChanged = false

    const tableParams = urlQueryParamsGet(
      state.params.table,
      rootState.route.query,
      state.definitions
    )

    if (Object.keys(tableParams).length) {
      commit('paramsSet', { section: 'table', params: tableParams })
      hasChanged = true
    }

    const filtresParams = urlQueryParamsGet(
      state.params.filtres,
      rootState.route.query,
      state.definitions
    )

    if (Object.keys(filtresParams).length) {
      commit('paramsSet', { section: 'filtres', params: filtresParams })
      hasChanged = true
    }

    return hasChanged
  },

  async urlQueryUpdate({ state, dispatch }) {
    const params = Object.assign(state.params.filtres, state.params.table)

    await dispatch(
      'urlQueryUpdate',
      { params, definitions: state.definitions },
      { root: true }
    )
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

  paramsSet(state, { section, params }) {
    Object.keys(params).forEach(id => {
      state.params[section][id] = params[id]
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
