import Vue from 'vue'

export const state = {
  types: [],
  domaines: [],
  statuts: []
}

export const actions = {
  set({ state, commit, dispatch, rootState }, { name, values }) {
    const metasFilters = ['types', 'domaines', 'statuts']

    if (metasFilters.find(n => name === n)) {
      // si il y a déjà des filtres dans les préférences utilisateur (ex: url)
      // on supprime les préférences utilisateurs,
      // qui ne sont plus présent dans les metas
      // (ex: lors d'une déconnexion, les titres échus ne sont plus visibles)
      const idsFind = () => {
        const idsRemove = (ids, idsToRemove) =>
          ids.reduce(
            (ids, id) => (idsToRemove.find(i => i === id) ? ids : [...ids, id]),
            []
          )

        const idsCurrent =
          (rootState.user.preferences.filtres[`${name.slice(0, -1)}Ids`] &&
            rootState.user.preferences.filtres[`${name.slice(0, -1)}Ids`].split(
              ','
            )) ||
          []

        const idsToRemove = state[name]
          .filter(v => !values.find(value => v.id === value.id))
          .map(({ id }) => id)

        if (idsCurrent.length) {
          return idsRemove(idsCurrent, idsToRemove, [])
        }
      }

      const ids = idsFind()

      if (ids) {
        dispatch(
          'user/preferenceSet',
          { section: `filtres.${name.slice(0, -1)}Ids`, value: ids.join(',') },
          { root: true }
        )
      }
    }

    commit('set', { name, values })
  }
}

export const getters = {}

export const mutations = {
  loaded(state) {
    state.loaded = true
  },

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
