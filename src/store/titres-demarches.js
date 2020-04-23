import Vue from 'vue'

import { metasDemarches, demarches } from '../api/titres-demarches'

import { paramsBuild } from './_utils'

export const state = {
  list: [],
  total: null,
  metas: {
    types: [],
    statuts: [],
    etapesTypes: [],
    titresTypes: [],
    titresDomaines: [],
    titresStatuts: []
  },
  params: [
    { id: 'typesIds', type: 'array', elements: [] },
    { id: 'statutsIds', type: 'array', elements: [] },
    { id: 'titresDomainesIds', type: 'array', elements: [] },
    { id: 'titresTypesIds', type: 'array', elements: [] },
    { id: 'titresStatutsIds', type: 'array', elements: [] },
    { id: 'page', type: 'number', min: 0 },
    { id: 'intervalle', type: 'number', min: 10, max: 500 },
    {
      id: 'colonne',
      type: 'string',
      elements: [
        'titreNom',
        'titreDomaine',
        'titreType',
        'titreStatut',
        'type',
        'statut'
      ]
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
      titresDomainesIds: [],
      titresTypesIds: [],
      titresStatutsIds: []
      // etapesInclues: [],
      // etapesExclues: []
    }
  }
}

export const actions = {
  async metasGet({ commit }) {
    commit('loadingAdd', 'metasDemarchesGet', { root: true })

    try {
      const data = await metasDemarches()

      commit('metasSet', data)
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'metasDemarchesGet', { root: true })
    }
  },

  async get({ state, dispatch, commit }) {
    commit('loadingAdd', 'demarches', { root: true })

    try {
      const p = paramsBuild(
        state.params,
        Object.assign({}, state.preferences.filtres, state.preferences.table)
      )

      const data = await demarches(p)
      dispatch(
        'messageAdd',
        {
          value: `liste de demarches mise à jour`,
          type: 'success'
        },
        { root: true }
      )

      commit('set', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'demarches', { root: true })
    }
  },

  preferencesSet({ commit }, { section, params }) {
    commit('preferencesSet', { section, params })
  }
}

export const mutations = {
  set(state, data) {
    Vue.set(state, 'list', data.demarches)
    Vue.set(state, 'total', data.total)
  },

  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      let metaId
      let paramsIds
      if (id === 'demarchesTypes') {
        metaId = 'types'
        paramsIds = ['typesIds']
      } else if (id === 'demarchesStatuts') {
        metaId = 'statuts'
        paramsIds = ['statutsIds']
      } else if (id === 'types') {
        metaId = 'titresTypes'
        paramsIds = ['titresTypesIds']
      } else if (id === 'domaines') {
        metaId = 'titresDomaines'
        paramsIds = ['titresDomainesIds']
      } else if (id === 'statuts') {
        metaId = 'titresStatuts'
        paramsIds = ['titresStatutsIds']
      } else if (id === 'etapesTypes') {
        metaId = 'etapesTypes'
        // paramsIds = ['etapesInclues', 'etapesExclues']
      }

      if (metaId) {
        Vue.set(state.metas, metaId, data[id])
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
