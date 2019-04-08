import Vue from 'vue'
import { titres } from '../api'

export const state = {
  list: [],
  filterNames: [
    'substances',
    'noms',
    'entreprises',
    'references',
    'territoires',
    'typeIds',
    'domaineIds',
    'statutIds'
  ]
}

export const actions = {
  async get({ state, dispatch, commit, rootState }, fetchPolicy) {
    commit('loadingAdd', 'titres', { root: true })

    try {
      const params = state.filterNames.reduce((params, name) => {
        const values =
          rootState.user.preferences.filtres[name] &&
          rootState.user.preferences.filtres[name].split(',')
        return values && values.length
          ? Object.assign(params, { [name]: values })
          : params
      }, {})

      const res = await titres(params, fetchPolicy)

      if (state.list.length) {
        dispatch(
          'messageAdd',
          {
            value: `liste de titres mise à jour`,
            type: 'success'
          },
          { root: true }
        )
      }

      if (res) {
        commit('set', res.map(t => t))
      } else {
        console.log('aucun titres…')
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'titres', { root: true })
    }
  }
}

export const getters = {}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'list', titres)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
