import Vue from 'vue'

import { activites, activitesMetas } from '../api/titres-activites'
import { paramsBuild } from './_utils'

export const state = {
  list: [],
  total: 0,
  metas: {
    types: [],
    annees: [],
    statuts: [],
    titresDomaines: [],
    titresTypes: [],
    titresStatuts: []
  },
  params: [
    { id: 'typesIds', type: 'strings', elements: [] },
    { id: 'statutsIds', type: 'strings', elements: [] },
    { id: 'annees', type: 'numbers', elements: [] },
    { id: 'titresNoms', type: 'string' },
    { id: 'titresEntreprises', type: 'string' },
    { id: 'titresSubstances', type: 'string' },
    { id: 'titresReferences', type: 'string' },
    { id: 'titresTerritoires', type: 'string' },
    { id: 'titresTypesIds', type: 'strings', elements: [] },
    { id: 'titresDomainesIds', type: 'strings', elements: [] },
    { id: 'titresStatutsIds', type: 'strings', elements: [] },
    { id: 'page', type: 'number', min: 0 },
    { id: 'intervalle', type: 'number', min: 10, max: 500 },
    {
      id: 'colonne',
      type: 'string',
      elements: ['titreNom', 'titulaires', 'annee', 'periode', 'statut']
    },
    {
      id: 'ordre',
      type: 'string',
      elements: ['asc', 'desc']
    }
  ],
  preferences: {
    table: {
      page: 1,
      intervalle: 200,
      ordre: 'asc',
      colonne: null
    },
    filtres: {
      typesIds: [],
      statutsIds: [],
      annees: [],
      titresNoms: '',
      titresEntreprises: '',
      titresSubstances: '',
      titresReferences: '',
      titresTerritoires: '',
      titresTypesIds: [],
      titresDomainesIds: [],
      titresStatutsIds: []
    }
  },
  loaded: {
    metas: false,
    url: false
  }
}

export const actions = {
  async metasGet({ state, commit, dispatch }) {
    try {
      commit('loadingAdd', 'activitesMetasGet', { root: true })

      const data = await activitesMetas()

      commit('metasSet', data)

      if (!state.loaded.metas) {
        commit('load', 'metas')
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'activitesMetasGet', { root: true })
    }
  },

  async get({ state, dispatch, commit }) {
    try {
      commit('loadingAdd', 'activitesGet', { root: true })

      const p = paramsBuild(
        state.params,
        Object.assign({}, state.preferences.filtres, state.preferences.table)
      )

      const data = await activites(p)

      dispatch(
        'messageAdd',
        { value: `liste d'activités mise à jour`, type: 'success' },
        { root: true }
      )

      commit('set', data)
    } catch (e) {
      dispatch('pageError', null, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'activitesGet', { root: true })
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
  set(state, data) {
    Vue.set(state, 'list', data.elements)
    Vue.set(state, 'total', data.total)
  },

  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      let metaId
      let paramsIds
      if (id === 'activitesTypes') {
        metaId = 'types'
        paramsIds = ['typesIds']
      } else if (id === 'activitesStatuts') {
        metaId = 'statuts'
        paramsIds = ['statutsIds']
      } else if (id === 'activitesAnnees') {
        metaId = 'annees'
        paramsIds = ['annees']
      } else if (id === 'domaines') {
        metaId = 'titresDomaines'
        paramsIds = ['titresDomainesIds']
      } else if (id === 'types') {
        metaId = 'titresTypes'
        paramsIds = ['titresTypesIds']
      } else if (id === 'statuts') {
        metaId = 'titresStatuts'
        paramsIds = ['titresStatutsIds']
      }

      if (metaId) {
        const param = state.params.find(p => p.id === metaId)
        if (param && param.type && param.type === 'numbers') {
          Vue.set(
            state.metas,
            metaId,
            data[id].map(annee => {
              return { id: annee, nom: annee }
            })
          )
        } else {
          Vue.set(state.metas, metaId, data[id])
        }
      }

      if (paramsIds) {
        paramsIds.forEach(paramId => {
          const param = state.params.find(p => p.id === paramId)
          if (param && param.type && param.type === 'numbers') {
            Vue.set(param, 'elements', data[id])
          } else {
            Vue.set(
              param,
              'elements',
              data[id].map(e => e.id)
            )
          }
        })
      }
    })
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
