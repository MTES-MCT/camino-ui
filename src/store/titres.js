import { urlQueryParamsGet } from '../utils/url'
import { titresMetas, titresGeo, titres, titresGeoPolygon } from '../api/titres'
import { paramsBuild } from '../utils/'

export const state = {
  elements: [],
  total: 0,
  vueId: 'carte',
  metas: {
    domaines: [],
    types: [],
    statuts: []
  },
  definitions: [
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
  urlDefinitions: [
    { id: 'zoom', type: 'number', min: 1, max: 18 },
    { id: 'centre', type: 'tuple' },
    { id: 'vueId', type: 'string', elements: ['carte', 'table'] }
  ],
  params: {
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
  async init({ state, commit, dispatch }) {
    try {
      commit('loadingAdd', 'titresInit', { root: true })

      const data = await titresMetas()

      commit('metasSet', data)

      if (!state.initialized) {
        await dispatch('paramsFromQueryUpdate')

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

  async get({ state, dispatch, commit }) {
    try {
      commit('loadingAdd', 'titres', { root: true })

      if (!state.initialized) return

      await dispatch('urlQueryUpdate')

      let data

      if (state.vueId === 'carte') {
        const definitions = paramsBuild(
          state.definitions,
          Object.assign({}, state.params.filtres, state.params.carte)
        )

        if (state.params.carte.zoom > 7) {
          data = await titresGeoPolygon(definitions)
        } else {
          data = await titresGeo(definitions)
        }
      } else {
        const definitions = paramsBuild(
          state.definitions,
          Object.assign({}, state.params.filtres, state.params.table)
        )
        data = await titres(definitions)
      }

      commit('set', Object.freeze(data))
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'titres', { root: true })
    }
  },

  async paramsSet({ state, commit, dispatch }, { section, params }) {
    const newParams = Object.keys(params).reduce((acc, id) => {
      if (state.params[section][id] !== params[id]) {
        acc[id] = params[id]
      }

      return acc
    }, {})

    if (Object.keys(newParams).length) {
      commit('paramsSet', { section, params: newParams })

      if (
        section === 'carte' &&
        !Object.keys(newParams).includes('perimetre')
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
  },

  async routeUpdate({ dispatch }) {
    const hasChanged = await dispatch('paramsFromQueryUpdate')

    if (hasChanged) {
      await dispatch('get')
    }
  },

  async paramsFromQueryUpdate({ rootState, state, commit }) {
    let hasChanged = false

    const vueParams = urlQueryParamsGet(
      { vueId: state.vueId },
      rootState.route.query,
      state.urlDefinitions.filter(p => p.id === 'vueId')
    )

    if (vueParams.vueId) {
      commit('set', { elements: [], total: 0 })
      commit('vueSet', vueParams.vueId)
      hasChanged = true
    }

    if (state.vueId === 'carte') {
      const carteParams = urlQueryParamsGet(
        {
          zoom: state.params.carte.zoom,
          centre: state.params.carte.centre
        },
        rootState.route.query,
        state.urlDefinitions
      )

      if (Object.keys(carteParams).length) {
        commit('paramsSet', { section: 'carte', params: carteParams })
        hasChanged = true
      }
    }

    if (state.vueId === 'table') {
      const tableParams = urlQueryParamsGet(
        state.params.table,
        rootState.route.query,
        state.definitions
      )

      if (Object.keys(tableParams).length) {
        commit('paramsSet', { section: 'table', params: tableParams })
        hasChanged = true
      }
    }

    const filtresParams = urlQueryParamsGet(
      state.params.filtres,
      rootState.route.query,
      state.definitions
    )

    if (Object.keys(filtresParams).length) {
      commit('paramsSet', {
        section: 'filtres',
        params: filtresParams
      })
      hasChanged = true
    }

    return hasChanged
  },

  async urlQueryUpdate({ state, dispatch }) {
    const paramsVue =
      state.vueId === 'carte'
        ? {
            zoom: state.params.carte.zoom,
            centre: state.params.carte.centre
          }
        : state.params.table

    const params = Object.assign(
      { vueId: state.vueId },
      state.params.filtres,
      paramsVue
    )

    const definitions = [...state.definitions, ...state.urlDefinitions]

    await dispatch('urlQueryUpdate', { params, definitions }, { root: true })
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
          const param = state.definitions.find(p => p.id === paramId)

          param.elements = data[id].map(e => e.id)
        })
      }
    })
  },

  paramsSet(state, { section, params }) {
    Object.keys(params).forEach(id => {
      state.params[section][id] = params[id]
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
