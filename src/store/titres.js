import Vue from 'vue'
import { titres } from '../api'

export const state = {
  list: [],
  filterIds: [
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
  async get({ state, dispatch, commit, rootState }) {
    commit('loadingAdd', 'titres', { root: true })

    try {
      // récupère les paramètres depuis les préférences utilisateurs
      const params = state.filterIds.reduce((params, id) => {
        const i = id.replace(/Id/g, '')
        const values =
          rootState.user.preferences.titres.filtres[i] &&
          rootState.user.preferences.titres.filtres[i]
            .split(',')
            .map(v => v.replace(/^"(.*)"$/, '$1'))

        return values && values.length
          ? Object.assign(params, { [id]: values })
          : params
      }, {})

      const res = await titres(params, 'network-only')

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

      commit('set', res)
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'titres', { root: true })
    }
  }
}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'list', titres)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
