import Vue from 'vue'

import { utilisateurs, metasUtilisateur } from '../api/utilisateurs'
import { paramsBuild } from './_utils'

export const state = {
  list: [],
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
  loaded: {
    metas: false,
    url: false
  }
}

export const actions = {
  async metasGet({ state, commit }) {
    try {
      commit('loadingAdd', 'metasUtilisateur', { root: true })

      const data = await metasUtilisateur()

      commit('metasSet', data)

      if (!state.loaded.metas) {
        commit('load', 'metas')
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'metasUtilisateur', { root: true })
    }
  },

  async get({ dispatch, commit }) {
    try {
      commit('loadingAdd', 'utilisateurs', { root: true })

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
      console.info(e)
    } finally {
      commit('loadingRemove', 'utilisateurs', { root: true })
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
