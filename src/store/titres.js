import Vue from 'vue'

import { metasTitres, titresGeo, titres } from '../api/titres'
import { paramsBuild } from './_utils'

export const state = {
  list: [],
  total: 0,
  vue: 'carte',
  metas: {
    domaines: [],
    types: [],
    statuts: []
  },
  params: [
    { id: 'typesIds', type: 'strings', elements: [] },
    { id: 'domainesIds', type: 'strings', elements: [] },
    { id: 'statutsIds', type: 'strings', elements: [] },
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
      elements: [
        'nom',
        'domaine',
        'type',
        'statut',
        'activitesTotal',
        'substances',
        'titulaires'
      ]
    },
    {
      id: 'ordre',
      type: 'string',
      elements: ['asc', 'desc']
    },
    { id: 'perimetre', type: 'numbers' }
  ],
  preferences: {
    table: { page: 1, intervalle: 200, ordre: 'asc', colonne: 'nom' },
    carte: {
      perimetre: [0, 0, 0, 0],
      zoom: null,
      centre: [],
      zoomIni: null,
      centreIni: []
    },
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
  async metasGet({ state, commit, dispatch }) {
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
      let data

      if (state.vue === 'carte') {
        const params = paramsBuild(
          state.params,
          Object.assign({}, state.preferences.filtres, state.preferences.carte)
        )

        data = await titresGeo(params)
      } else {
        const params = paramsBuild(
          state.params,
          Object.assign({}, state.preferences.filtres, state.preferences.table)
        )
        data = await titres(params)
      }

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
  },

  preferencesMapIni({ state, commit }) {
    const zoomIni = state.preferences.carte.zoom
    const centreIni = state.preferences.carte.centre

    commit('preferencesSet', {
      section: 'carte',
      params: { zoomIni, centreIni }
    })
  },

  vueSet({ commit }, vue) {
    commit('set', { elements: [], total: 0 })
    commit('vueSet', vue)
  }
}

export const mutations = {
  set(state, data) {
    Vue.set(state, 'list', data.elements)
    Vue.set(state, 'total', data.total)
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
  },

  vueSet(state, vue) {
    Vue.set(state, 'vue', vue)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
