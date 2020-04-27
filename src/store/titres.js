import Vue from 'vue'

import { metasTitres, titres } from '../api/titres'
import { paramsBuild } from './_utils'

export const state = {
  list: [],
  metas: {
    domaines: [],
    types: [],
    statuts: []
  },
  params: [
    { id: 'typesIds', type: 'array', elements: [] },
    { id: 'domainesIds', type: 'array', elements: [] },
    { id: 'statutsIds', type: 'array', elements: [] },
    { id: 'substances', type: 'string' },
    { id: 'noms', type: 'string' },
    { id: 'entreprises', type: 'string' },
    { id: 'references', type: 'string' },
    { id: 'territoires', type: 'string' },
    { id: 'page', type: 'number', value: 1, min: 0 },
    { id: 'intervalle', type: 'number', min: 10, max: 500 },

    {
      id: 'colonne',
      type: 'string',
      elements: ['nom', 'domaine', 'type', 'statut', 'activitesTotal']
    },
    {
      id: 'ordre',
      type: 'string',
      elements: ['asc', 'desc']
    }
  ],
  preferences: {
    vue: { vueId: 'carte' },
    table: { page: 1, intervalle: 200, ordre: 'asc', colonne: 'nom' },
    carte: { zoom: null, centre: [] },
    filtres: {
      typesIds: [],
      domainesIds: [],
      statutsIds: [],
      noms: '',
      entreprises: '',
      substances: '',
      references: '',
      territoires: ''
    }
  }
}

export const actions = {
  async metasGet({ commit, dispatch }) {
    commit('loadingAdd', 'metasTitresGet', { root: true })

    try {
      const data = await metasTitres()

      commit('metasSet', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'metasTitresGet', { root: true })
    }
  },

  async get({ state, dispatch, commit }) {
    commit('loadingAdd', 'titres', { root: true })

    try {
      const params = paramsBuild(state.params, state.preferences.filtres)

      const data = await titres(params)

      dispatch(
        'messageAdd',
        { value: `liste de titres mise à jour`, type: 'success' },
        { root: true }
      )

      commit('set', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'titres', { root: true })
    }
  },

  preferencesSet({ commit }, { section, params }) {
    commit('preferencesSet', { section, params })
  }
}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'list', titres)
  },

  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      let paramsIds
      let metaId
      if (id === 'types') {
        metaId = id
        paramsIds = ['typesIds']
      } else if (id === 'domaines') {
        metaId = id
        paramsIds = ['domainesIds']
      } else if (id === 'statuts') {
        metaId = id
        paramsIds = ['statutsIds']
      }

      if (metaId) {
        Vue.set(state.metas, id, data[id])
      }

      if (paramsIds) {
        paramsIds.forEach(paramId => {
          const param = state.params.find(p => p.id === paramId)
          Vue.set(
            param,
            'elements',
            data[id].map(e => e.id)
          )
        })
      }
    })
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
