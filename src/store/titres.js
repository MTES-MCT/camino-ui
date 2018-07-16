import Vue from 'vue'
import { titres } from '../api/index.js'
import { titreFormat, metaFormat } from './_utils.js'

export const state = {
  liste: null,
  domaines: [],
  types: [],
  statuts: []
}

export const actions = {
  filterToggle({ state, dispatch, commit }, { name, value, property }) {
    state[name]
      .filter(e => e[property].toString() === value)
      .forEach(fi => commit('filterToggle', fi))
    dispatch('get')
  },
  async get({ state, commit }) {
    const filtrer =
      state.types.length !== 0 &&
      state.domaines.length !== 0 &&
      state.statuts.length !== 0
    const typeIds = state.types.filter(e => e.checked).map(e => e.id)
    const domaineIds = state.domaines.filter(e => e.checked).map(e => e.id)
    const statutIds = state.statuts.filter(e => e.checked).map(e => e.id)
    const substances = []

    const data = await titres({
      filtrer,
      typeIds,
      domaineIds,
      statutIds,
      substances
    })

    commit('set', data.titres.map(t => titreFormat(t)))
    if (!filtrer) {
      commit(
        'metasSet',
        Object.keys(data.metas).reduce(
          (acc, key) =>
            Array.isArray(data.metas[key])
              ? Object.assign(acc, {
                  [key]: data.metas[key].map(d => metaFormat(d))
                })
              : acc,
          {}
        )
      )
    }
  }
}

export const getters = {}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'liste', titres)
  },
  metasSet(state, metas) {
    console.log(metas)
    Vue.set(state, 'statuts', metas.statuts)
    Vue.set(state, 'types', metas.types)
    Vue.set(state, 'domaines', metas.domaines)
  },
  filterToggle(state, f) {
    Vue.set(f, 'checked', !f.checked)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
