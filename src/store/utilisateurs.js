import Vue from 'vue'

import { utilisateurs, metasUtilisateurs } from '../api/utilisateurs'
import { paramsBuild } from './_utils'

export const state = {
  list: [],
  total: null,
  metas: {
    permission: [],
    administration: [],
    entreprise: []
  },
  params: [
    { id: 'noms', type: 'string' },
    { id: 'prenoms', type: 'string' },
    { id: 'email', type: 'string' },
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
    table: {
      page: 1,
      intervalle: 200,
      ordre: 'asc',
      colonne: null
    },
    filtres: {
      noms: '',
      prenoms: '',
      email: '',
      permissionIds: [],
      administrationIds: [],
      entrepriseIds: []
    }
  }
}

export const actions = {
  async metasGet({ commit, dispatch }) {
    commit('loadingAdd', 'metasUtilisateur', { root: true })

    try {
      const data = await metasUtilisateurs()

      commit('metasSet', data)
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'metasUtilisateur', { root: true })
    }
  },

  async get({ dispatch, commit }) {
    commit('loadingAdd', 'utilisateurs', { root: true })

    try {
      const p = paramsBuild(
        state.params,
        Object.assign({}, state.preferences.filtres, state.preferences.table)
      )

      const data = await utilisateurs(p)

      dispatch(
        'messageAdd',
        {
          value: `liste d'utilisateurs mise à jour`,
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
      commit('loadingRemove', 'utilisateurs', { root: true })
    }
  },

  preferencesSet({ commit }, { section, params }) {
    commit('preferencesSet', { section, params })
  }
}

export const mutations = {
  set(state, data) {
    Vue.set(state, 'list', data.utilisateurs)
    Vue.set(state, 'total', data.total)
  },

  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      let metaId
      let paramsIds
      if (id === 'permissions') {
        metaId = 'permission'
        paramsIds = ['permissionIds']
      } else if (id === 'utilisateursEntreprises') {
        metaId = 'entreprise'
        paramsIds = ['entrepriseIds']
      } else if (id === 'utilisateursAdministrations') {
        metaId = 'administration'
        paramsIds = ['administrationIds']
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
