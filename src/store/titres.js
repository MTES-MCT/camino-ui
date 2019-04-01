import Vue from 'vue'
import { titres } from '../api'

export const state = {
  list: [],
  filterCheckboxes: {
    domaines: { name: 'Domaines', ids: [] },
    types: { name: 'Types', ids: [] },
    statuts: { name: 'Statuts', ids: [] }
  },
  filterInputs: {
    noms: { name: 'Nom', values: [], placeholder: '…' },
    entreprises: {
      name: 'Entreprises',
      values: [],
      placeholder: 'Nom ou siret'
    },
    substances: {
      name: 'Substances',
      values: [],
      placeholder: 'Or, Argent, Ag, …'
    },
    references: {
      name: 'Références',
      values: [],
      placeholder: 'Référence DGEC, DEAL, DEB, BRGM, Ifremer, …'
    },
    territoires: {
      name: 'Territoires',
      values: [],
      placeholder: 'Commune, département, région, …'
    }
  }
}

export const actions = {
  async get({ state, dispatch, commit }, fetchPolicy) {
    commit('loadingAdd', 'titres', { root: true })
    const args = {
      typeIds: state.filterCheckboxes.types.ids,
      domaineIds: state.filterCheckboxes.domaines.ids,
      statutIds: state.filterCheckboxes.statuts.ids,
      substances: state.filterInputs.substances.values,
      noms: state.filterInputs.noms.values,
      entreprises: state.filterInputs.entreprises.values,
      references: state.filterInputs.references.values,
      territoires: state.filterInputs.territoires.values
    }

    const a = Object.keys(args).reduce(
      (res, key) =>
        args[key].length ? Object.assign(res, { [key]: args[key] }) : res,
      {}
    )

    try {
      const res = await titres(a, fetchPolicy)

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
    } finally {
      commit('loadingRemove', 'titres', { root: true })
    }
  },

  filterInputSet({ commit }, { name, value }) {
    const values = value ? value.split(/[ ,]+/) : []
    commit('filterInputSet', { name, values })
  },

  filterCheckboxToggle({ state, commit }, { name, id }) {
    if (state.filterCheckboxes[name].ids.find(i => i === id)) {
      commit('filterCheckboxUnset', { name, id })
    } else {
      commit('filterCheckboxSet', { name, id })
    }
  }
}

export const getters = {}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'list', titres)
  },

  filterInputSet(state, { name, values }) {
    Vue.set(state.filterInputs[name], 'values', values)
  },

  filterCheckboxSet(state, { name, id }) {
    state.filterCheckboxes[name].ids.push(id)
  },

  filterCheckboxUnset(state, { name, id }) {
    const index = state.filterCheckboxes[name].ids.indexOf(id)

    if (index > -1) {
      state.filterCheckboxes[name].ids.splice(index, 1)
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
