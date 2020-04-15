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
    { id: 'typesIds', type: 'array' },
    { id: 'domainesIds', type: 'array' },
    { id: 'statutsIds', type: 'array' },
    { id: 'substances', type: 'string' },
    { id: 'noms', type: 'string' },
    { id: 'entreprises', type: 'string' },
    { id: 'references', type: 'string' },
    { id: 'territoires', type: 'string' }
  ],
  preferences: {
    vue: { vueId: 'carte' },
    table: {
      page: 1,
      intervalle: 200,
      ordre: 'asc',
      colonne: 'nom'
    },
    carte: {
      zoom: null,
      centre: null
    },
    filtres: {
      typesIds: null,
      domainesIds: null,
      statutsIds: null,
      noms: null,
      entreprises: null,
      substances: null,
      references: null,
      territoires: null
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
        {
          value: `liste de titres mise à jour`,
          type: 'success'
        },
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
      Vue.set(state.metas, id, data[id])
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
