import { utilisateurs, utilisateurMetas } from '../api/utilisateurs'
import { paramsBuild } from '../utils/'

export const state = {
  elements: [],
  total: 0,
  metas: {
    permission: [],
    administration: [],
    entreprise: []
  },
  params: [
    { id: 'noms', type: 'string' },
    { id: 'emails', type: 'string' },
    { id: 'permissionIds', type: 'strings', elements: [] },
    { id: 'administrationIds', type: 'strings', elements: [] },
    { id: 'entrepriseIds', type: 'strings', elements: [] },
    { id: 'page', type: 'number', min: 0 },
    { id: 'intervalle', type: 'number', min: 10, max: 500 },
    {
      id: 'colonne',
      type: 'string',
      elements: ['nom', 'prenom', 'email', 'permission', 'lien']
    },
    {
      id: 'ordre',
      type: 'string',
      elements: ['asc', 'desc']
    }
  ],
  preferences: {
    filtres: {
      noms: '',
      emails: '',
      permissionIds: [],
      administrationIds: [],
      entrepriseIds: []
    },
    table: {
      page: 1,
      intervalle: 200,
      ordre: 'asc',
      colonne: null
    }
  },
  initialized: false
}

export const actions = {
  async init({ state, commit, dispatch }) {
    try {
      commit('loadingAdd', 'utilisateursInit', { root: true })

      const data = await utilisateurMetas()

      commit('metasSet', data)

      if (!state.initialized) {
        commit('init')
      }

      await dispatch('get')
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateursInit', { root: true })
    }
  },

  async get({ state, dispatch, commit }) {
    try {
      commit('loadingAdd', 'utilisateurs', { root: true })

      if (!state.initialized) return

      const p = paramsBuild(
        state.params,
        Object.assign({}, state.preferences.filtres, state.preferences.table)
      )

      const data = await utilisateurs(p)

      dispatch(
        'messageAdd',
        { value: "liste d'utilisateurs mise à jour", type: 'success' },
        { root: true }
      )

      commit('set', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'utilisateurs', { root: true })
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
      if (id === 'permissions') {
        metaId = 'permission'
        paramsIds = ['permissionIds']
      } else if (id === 'entreprises') {
        metaId = 'entreprise'
        paramsIds = ['entrepriseIds']

        // l'API renvoie les entreprises dans une propriété 'elements'
        data[id] = data[id].elements
      } else if (id === 'administrations') {
        metaId = 'administration'
        paramsIds = ['administrationIds']

        data[id] = data[id].elements
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
