import { demarchesMetas, demarches } from '../api/titres-demarches'

import { paramsBuild } from '../utils/'

export const state = {
  elements: [],
  total: 0,
  metas: {
    types: [],
    statuts: [],
    etapesTypes: [],
    titresTypes: [],
    titresDomaines: [],
    titresStatuts: []
  },
  params: [
    { id: 'typesIds', type: 'strings', elements: [] },
    { id: 'statutsIds', type: 'strings', elements: [] },
    { id: 'etapesInclues', type: 'objects', elements: [] },
    { id: 'etapesExclues', type: 'objects', elements: [] },
    { id: 'titresDomainesIds', type: 'strings', elements: [] },
    { id: 'titresTypesIds', type: 'strings', elements: [] },
    { id: 'titresStatutsIds', type: 'strings', elements: [] },
    { id: 'titresNoms', type: 'string' },
    { id: 'titresEntreprises', type: 'string' },
    { id: 'titresSubstances', type: 'string' },
    { id: 'titresReferences', type: 'string' },
    { id: 'titresTerritoires', type: 'string' },
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
        'statut',
        'reference'
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
      etapesInclues: [],
      etapesExclues: [],
      titresDomainesIds: [],
      titresTypesIds: [],
      titresStatutsIds: [],
      titresNoms: '',
      titresEntreprises: '',
      titresSubstances: '',
      titresReferences: '',
      titresTerritoires: ''
    }
  },
  initialized: false
}

export const actions = {
  async init({ state, commit, dispatch }) {
    try {
      commit('loadingAdd', 'demarchesInit', { root: true })

      const data = await demarchesMetas()

      commit('metasSet', data)

      if (!state.initialized) {
        commit('init')
      }

      await dispatch('get')
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'demarchesInit', { root: true })
    }
  },

  async get({ state, dispatch, commit }) {
    try {
      commit('loadingAdd', 'demarches', { root: true })

      if (!state.initialized) return

      const p = paramsBuild(
        state.params,
        Object.assign({}, state.preferences.filtres, state.preferences.table)
      )

      const data = await demarches(p)
      dispatch(
        'messageAdd',
        {
          value: `demarches mises à jour`,
          type: 'success'
        },
        { root: true }
      )

      commit('set', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'demarches', { root: true })
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
  reset(state) {
    state.elements = []
    state.total = 0
    state.initialized = false
  },

  set(state, data) {
    state.elements = data.elements
    state.total = data.total
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
      } else if (id === 'etapesTypes') {
        metaId = 'etapesTypes'
        paramsIds = ['etapesInclues', 'etapesExclues']
      } else if (id === 'statuts') {
        metaId = 'titresStatuts'
        paramsIds = ['titresStatutsIds']
      } else if (id === 'types') {
        metaId = 'titresTypes'
        paramsIds = ['titresTypesIds']
      } else if (id === 'domaines') {
        metaId = 'titresDomaines'
        paramsIds = ['titresDomainesIds']
      }

      if (metaId) {
        state.metas[metaId] = data[id]
      }

      if (paramsIds) {
        paramsIds.forEach(paramId => {
          const param = state.params.find(p => p.id === paramId)

          param.elements = data[id].map(e => e.id)
        })
      }
    })
  },

  preferencesSet(state, { section, params }) {
    Object.keys(params).forEach(id => {
      state.preferences[section][id] = params[id]
    })
  },

  init(state) {
    state.initialized = true
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
