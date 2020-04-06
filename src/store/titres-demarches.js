import Vue from 'vue'

import { metasDemarches, demarches } from '../api/titres-demarches'

import { paramsArrayBuild, paramsStringBuild } from './_utils'

export const state = {
  list: [],
  total: null,
  metas: {
    types: [],
    statuts: [],
    etapesTypes: [],
    titresTypes: [],
    titresDomaines: [],
    titresStatuts: [],
    intervalleMax: 200,
  },
  params: {
    arrays: [
      'typesIds',
      'statutsIds',
      'titresDomainesIds',
      'titresTypesIds',
      'titresStatutsIds',
    ],
    strings: ['page', 'intervalle', 'colonne', 'ordre'],
  },
  preferences: {
    table: {
      page: 1,
      intervalle: 200,
      ordre: 'asc',
      colonne: 'titreNom',
    },
    filtres: {
      typesIds: null,
      statutsIds: null,
      titresDomainesIds: null,
      titresTypesIds: null,
      titresStatutsIds: null,
      etapesIncluesIds: null,
      etapesExcluesIds: null,
    },
  },
}

export const actions = {
  async metasGet({ commit }) {
    commit('loadingAdd', 'metasDemarchesGet', { root: true })

    try {
      const data = await metasDemarches()

      const metas = {}

      if (data.demarchesTypes) metas.types = data.demarchesTypes
      if (data.demarchesStatuts) metas.statuts = data.demarchesStatuts
      if (data.etapesTypes) metas.etapesTypes = data.etapesTypes
      if (data.types) metas.titresTypes = data.types
      if (data.domaines) metas.titresDomaines = data.domaines
      if (data.statuts) metas.titresStatuts = data.statuts

      commit('metasSet', metas)
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'metasDemarchesGet', { root: true })
    }
  },

  async get({ state, dispatch, commit }) {
    commit('loadingAdd', 'demarches', { root: true })

    try {
      const p = Object.assign(
        {},
        paramsArrayBuild(state.params.arrays, state.preferences.filtres),
        paramsStringBuild(state.params.strings, state.preferences.table)
      )

      const data = await demarches(p)
      dispatch(
        'messageAdd',
        {
          value: `liste de demarches mise à jour`,
          type: 'success',
        },
        { root: true }
      )

      commit('set', data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'demarches', { root: true })
    }
  },

  preferencesSet({ commit }, { section, params }) {
    commit('preferencesSet', { section, params })
  },
}

export const mutations = {
  set(state, data) {
    Vue.set(state, 'list', data.demarches)
    Vue.set(state, 'total', data.total)
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
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
