import Vue from 'vue'

export const state = {
  types: [],
  domaines: [],
  statuts: [],
  demarchesTypes: []
}

export const actions = {
  set({ state, commit }, { name, values }) {
    const metaNameFilterCheckboxes = ['types', 'domaines', 'statuts']

    if (metaNameFilterCheckboxes.find(n => n === name)) {
      state[name]
        .filter(value => !values.find(v => v === value))
        .forEach(value => {
          commit(
            'titres/filterCheckboxUnset',
            { id: value.id, name },
            { root: true }
          )
        })

      values
        .filter(val => !state[name].find(v => v === val))
        .forEach(value => {
          commit(
            'titres/filterCheckboxSet',
            { id: value.id, name },
            { root: true }
          )
        })
    }

    commit('set', { name, values })
  }
}

export const getters = {}

export const mutations = {
  set(state, { name, values }) {
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
