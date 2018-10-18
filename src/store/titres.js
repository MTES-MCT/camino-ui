import Vue from 'vue'
import { titres } from '../api'
import { titreFormat, metaFormat } from './_utils'

export const state = {
  list: null,
  domaines: null,
  types: null,
  statuts: null,
  substances: null,
  noms: null
}

export const actions = {
  async get({ state, dispatch, commit }, fetchPolicy) {
    const args = {
      typeIds: state.types && state.types.filter(e => e.checked).map(e => e.id),
      domaineIds:
        state.domaines && state.domaines.filter(e => e.checked).map(e => e.id),
      statutIds:
        state.statuts && state.statuts.filter(e => e.checked).map(e => e.id),
      substances: state.substances,
      noms: state.noms
    }

    const a = Object.keys(args).reduce(
      (res, key) =>
        args[key] ? Object.assign(res, { [key]: args[key] }) : res,
      {}
    )

    const data = await titres(a, fetchPolicy)
    if (data) {
      commit('set', data.titres.map(t => titreFormat(t)))

      if (!args.typeIds) {
        commit('typesSet', data.metas.types.map(v => metaFormat(v)))
      }
      if (!args.domaineIds) {
        commit('domainesSet', data.metas.domaines.map(v => metaFormat(v)))
      }
      if (!args.statutIds) {
        commit('statutsSet', data.metas.statuts.map(v => metaFormat(v)))
      }
    } else {
      dispatch('apiError', null, { root: true })
    }
  },

  filterInput ({ state, dispatch, commit }, { name, value }) {
    const values = value ? value.split(/[ ,]+/) : null
    commit('filterInput', { name, values })
    dispatch('get')
  },

  filterToggle ({ state, dispatch, commit }, { name, value, property }) {
    state[name]
      .filter(e => e[property].toString() === value)
      .forEach(f => commit('filterToggle', f))
    dispatch('get')
  }
}

export const getters = {}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'list', titres)
  },
  typesSet(state, types) {
    Vue.set(state, 'types', types)
  },
  domainesSet(state, domaines) {
    Vue.set(state, 'domaines', domaines)
  },
  statutsSet(state, statuts) {
    Vue.set(state, 'statuts', statuts)
  },
  filterToggle(state, f) {
    Vue.set(f, 'checked', !f.checked)
  },
  filterInput(state, { name, values }) {
    Vue.set(state, name, values)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
