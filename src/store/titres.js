import Vue from 'vue'
import { titres } from '../api'
import { titreFormat, metaFormat } from './_utils'

export const state = {
  liste: null,
  domaines:
    // null,
    [
      {
        checked: true,
        id: 'h',
        nom: 'hydrocarbures liquides ou gazeux'
      }
    ],
  types: null,
  statuts: [
    {
      checked: true,
      couleur: 'success',
      id: 'val',
      nom: 'valide'
    }
  ],
  substances: null
}

export const actions = {
  filterInput({ state, dispatch, commit }, { name, value }) {
    const values = value ? value.split(/[ ,]+/) : null
    commit('filterInput', { name, values })
    dispatch('get')
  },
  filterToggle({ state, dispatch, commit }, { name, value, property }) {
    state[name]
      .filter(e => e[property].toString() === value)
      .forEach(f => commit('filterToggle', f))
    dispatch('get')
  },
  async get({ state, commit }) {
    const args = {
      typeIds: state.types && state.types.filter(e => e.checked).map(e => e.id),
      domaineIds:
        state.domaines && state.domaines.filter(e => e.checked).map(e => e.id),
      statutIds:
        state.statuts && state.statuts.filter(e => e.checked).map(e => e.id),
      substances: state.substances
    }

    const a = Object.keys(args).reduce(
      (res, key) =>
        args[key] ? Object.assign(res, { [key]: args[key] }) : res,
      {}
    )

    const data = await titres(a)

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
  }
}

export const getters = {}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'liste', titres)
  },
  typesSet(state, types) {
    console.log(types)
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
