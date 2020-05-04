import Vue from 'vue'
import { entreprises } from '../api/entreprises'
import { paramsBuild } from './_utils'

export const state = {
  list: [],
  total: null,
  params: [
    { id: 'page', type: 'number', min: 0 },
    { id: 'intervalle', type: 'number', min: 10, max: 500 },
    {
      id: 'colonne',
      type: 'string',
      elements: ['nom', 'legalSiren']
    },
    {
      id: 'ordre',
      type: 'string',
      elements: ['asc', 'desc']
    },
    { id: 'nomSiren', type: 'string' }
  ],
  preferences: {
    table: {
      page: 1,
      intervalle: 200,
      ordre: 'asc',
      colonne: null
    },
    filtres: {
      nomSiren: ''
    }
  }
}

export const actions = {
  async get({ state, dispatch, commit }) {
    commit('loadingAdd', 'entreprises', { root: true })

    try {
      const p = paramsBuild(
        state.params,
        Object.assign({}, state.preferences.filtres, state.preferences.table)
      )

      const data = await entreprises(p)

      dispatch(
        'messageAdd',
        {
          value: `liste d'entreprises mise à jour`,
          type: 'success'
        },
        { root: true }
      )

      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'entreprises', { root: true })
    }
  },

  preferencesSet({ commit }, { section, params }) {
    commit('preferencesSet', { section, params })
  }
}

export const mutations = {
  set(state, data) {
    Vue.set(state, 'list', data.entreprises)
    Vue.set(state, 'total', data.total)
  },

  preferencesSet(state, { section, params }) {
    Object.keys(params).forEach(id => {
      Vue.set(state.preferences[section], id, params[id])
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
