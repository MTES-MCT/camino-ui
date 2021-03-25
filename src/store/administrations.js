import { administrations, administrationsMetas } from '../api/administrations'
import { paramsBuild } from '../utils/'

export const state = {
  list: [],
  total: 0,
  metas: {
    types: []
  },
  params: [
    { id: 'page', type: 'number', min: 0 },
    { id: 'intervalle', type: 'number', min: 10, max: 500 },
    { id: 'colonne', type: 'string', elements: ['nom', 'type', 'abreviation'] },
    { id: 'ordre', type: 'string', elements: ['asc', 'desc'] },
    { id: 'typesIds', type: 'strings', elements: [] },
    { id: 'noms', type: 'string' }
  ],
  preferences: {
    table: { page: 1, intervalle: 200, ordre: 'asc', colonne: null },
    filtres: { noms: '', typesIds: [] }
  },
  loaded: {
    metas: false,
    url: false
  }
}

export const actions = {
  async metasGet({ state, commit, dispatch }) {
    commit('loadingAdd', 'administrationsMetasGet', { root: true })

    try {
      const data = await administrationsMetas()
      commit('metasSet', { types: data })

      if (!state.loaded.metas) {
        commit('load', 'metas')
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'administrationsMetasGet', { root: true })
    }
  },

  async get({ state, dispatch, commit }) {
    try {
      commit('loadingAdd', 'administrations', { root: true })

      const p = paramsBuild(
        state.params,
        Object.assign({}, state.preferences.filtres, state.preferences.table)
      )

      const data = await administrations(p)

      dispatch(
        'messageAdd',
        {
          value: "liste d'administrations mise à jour",
          type: 'success'
        },
        { root: true }
      )

      commit('set', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'administrations', { root: true })
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

    if (state.loaded.metas && state.loaded.url) {
      await dispatch('get')
    }
  },

  async urlLoad({ state, commit, dispatch }) {
    if (!state.loaded.url) {
      commit('load', 'url')

      if (state.loaded.metas) {
        await dispatch('get')
      }
    }
  }
}

export const mutations = {
  reset(state) {
    state.list = []
    state.total = 0
    state.loaded.metas = false
    state.loaded.url = false
  },

  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      const paramsIds = ['typesIds']

      state.metas[id] = data[id]

      paramsIds.forEach(paramId => {
        const param = state.params.find(p => p.id === paramId)

        param.elements = data[id].map(e => e.id)
      })
    })
  },

  set(state, data) {
    state.list = data.elements
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
