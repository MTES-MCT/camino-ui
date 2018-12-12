import Vue from 'vue'
import { titres } from '../api'

export const state = {
  list: null,
  domaines: null,
  types: null,
  statuts: null,
  substances: null,
  noms: null,
  entreprises: null
}

export const actions = {
  async get({ state, dispatch, commit }, fetchPolicy) {
    commit('loadingAdd', 'titres', { root: true })
    const args = {
      typeIds: state.types && state.types.filter(e => e.checked).map(e => e.id),
      domaineIds:
        state.domaines && state.domaines.filter(e => e.checked).map(e => e.id),
      statutIds:
        state.statuts && state.statuts.filter(e => e.checked).map(e => e.id),
      substances: state.substances,
      noms: state.noms,
      entreprises: state.entreprises
    }

    const a = Object.keys(args).reduce(
      (res, key) =>
        args[key] ? Object.assign(res, { [key]: args[key] }) : res,
      {}
    )

    try {
      const res = await titres(a, fetchPolicy)
      commit('loadingRemove', 'titres', { root: true })

      if (state.list) {
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
        console.log('pas de titres…')
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      commit('loadingRemove', 'titres', { root: true })
    }
  },

  filterInput({ dispatch, commit }, { name, value }) {
    const values = value ? value.split(/[ ,]+/) : null
    commit('filterInput', { name, values })
  },

  filterToggle({ state, dispatch, commit }, { name, value, property }) {
    state[name]
      .filter(e => e[property].toString() === value)
      .forEach(f => commit('filterToggle', f))
  }
}

export const getters = {}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'list', titres)
  },

  metasSet(state, { name, values }) {
    // ici on pourrait faire mieux, en
    // - n'ajoutant que les valeurs qui n'existent pas déjà
    // - et ainsi conserver leur état checked
    Vue.set(state, name, values.map(v => Object.assign({ checked: true }, v)))
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
