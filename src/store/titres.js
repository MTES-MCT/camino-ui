import { urlQueryParamsGet } from '../utils/url'
import { titresMetas, titresGeo, titres, titresGeoPolygon } from '../api/titres'
import { paramsBuild } from '../utils/'
import { nextTick } from '@vue/runtime-core'

export const state = {
  elements: [],
  total: 0,
  vueId: 'carte',
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
        'titulaires',
        'references'
      ]
    },
    {
      id: 'ordre',
      type: 'string',
      elements: ['asc', 'desc']
    },
    { id: 'perimetre', type: 'numbers' }
  ],
  urlParams: [
    { id: 'zoom', type: 'number', min: 1, max: 18 },
    { id: 'centre', type: 'tuple' },
    { id: 'vueId', type: 'string', elements: ['carte', 'table'] }
  ],
  preferences: {
    table: { page: 1, intervalle: 200, ordre: 'asc', colonne: 'nom' },
    carte: { perimetre: [0, 0, 0, 0], zoom: null, centre: [] },
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
  },
  initialized: false
}

export const actions = {
  async init({ state, commit, dispatch, rootState }) {
    try {
      commit('loadingAdd', 'titresInit', { root: true })

      const data = await titresMetas()

      commit('metasSet', data)

      if (!state.initialized) {
        await dispatch('preferencesFromQueryUpdate')

        commit('init')
      }

      if (state.vueId === 'table') {
        dispatch('get')
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'titresInit', { root: true })
    }
  },

  async preferencesFromQueryUpdate({ rootState, state, commit }) {
    let hasChanged = false

    const vueParams = urlQueryParamsGet(
      { vueId: state.vueId },
      rootState.route.query,
      state.urlParams.filter(p => p.id === 'vueId')
    )

    if (vueParams.vueId) {
      commit('set', { elements: [], total: 0 })
      commit('vueSet', vueParams.vueId)
      hasChanged = true
    }

    if (state.vueId === 'carte') {
      const carteParams = urlQueryParamsGet(
        {
          zoom: state.preferences.carte.zoom,
          centre: state.preferences.carte.centre
        },
        rootState.route.query,
        state.urlParams
      )

      if (Object.keys(carteParams).length) {
        commit('preferencesSet', { section: 'carte', params: carteParams })
        hasChanged = true
      }
    }

    if (state.vueId === 'table') {
      const tableParams = urlQueryParamsGet(
        state.preferences.table,
        rootState.route.query,
        state.params
      )

      if (Object.keys(tableParams).length) {
        commit('preferencesSet', { section: 'table', params: tableParams })
        hasChanged = true
      }
    }

    const filtresParams = urlQueryParamsGet(
      state.preferences.filtres,
      rootState.route.query,
      state.params
    )

    if (Object.keys(filtresParams).length) {
      commit('preferencesSet', { section: 'filtres', params: filtresParams })
      hasChanged = true
    }

    return hasChanged
  },

  async routeUpdate({ dispatch, commit }) {
    const hasChanged = await dispatch('preferencesFromQueryUpdate')

    if (hasChanged) {
      await dispatch('get')
    }
  },

  async get({ state, dispatch, commit }) {
    try {
      commit('loadingAdd', 'titres', { root: true })

      if (!state.initialized) return

      let data

      const vuePreferences =
        state.vueId === 'carte'
          ? {
              zoom: state.preferences.carte.zoom,
              centre: state.preferences.carte.centre
            }
          : state.preferences.table

      const queryPreferences = Object.assign(
        { vueId: state.vueId },
        state.preferences.filtres,
        vuePreferences
      )

      const queryParams = [...state.params, ...state.urlParams]

      await dispatch(
        'urlQueryUpdate',
        {
          preferences: queryPreferences,
          params: queryParams
        },
        { root: true }
      )

      if (state.vueId === 'carte') {
        const params = paramsBuild(
          state.params,
          Object.assign({}, state.preferences.filtres, state.preferences.carte)
        )

        if (state.preferences.carte.zoom > 7) {
          data = await titresGeoPolygon(params)
        } else {
          data = await titresGeo(params)
        }
      } else {
        const params = paramsBuild(
          state.params,
          Object.assign({}, state.preferences.filtres, state.preferences.table)
        )
        data = await titres(params)
      }

      commit('set', Object.freeze(data))
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'titres', { root: true })
    }
  },

  async preferencesSet({ state, commit, dispatch }, { section, params }) {
    const paramsNew = Object.keys(params).reduce((acc, id) => {
      if (state.preferences[section][id] !== params[id]) {
        acc[id] = params[id]
      }

      return acc
    }, {})

    if (Object.keys(paramsNew).length) {
      commit('preferencesSet', { section, params: paramsNew })

      if (
        section === 'carte' &&
        !Object.keys(paramsNew).includes('perimetre')
      ) {
        return
      }

      await dispatch('get')
    }
  },

  async vueSet({ state, commit, dispatch }, vueId) {
    if (vueId === state.vueId) return

    commit('set', { elements: [], total: 0 })
    commit('vueSet', vueId)

    // vueId est 'carte'
    // le composant `map.vue` émet un event `perimetre`
    // qui met à jour les préférences utilisateurs
    // et déclenche déjà un rechargement des titres
    if (vueId === 'carte') return

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
    state.initialized = false
  },

  set(state, { elements, total }) {
    state.elements = elements
    state.total = total
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
        state.metas[id] = data[id]
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

  vueSet(state, vueId) {
    state.vueId = vueId
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
