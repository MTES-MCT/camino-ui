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
      const idsFind = () => {
        const idsRemove = (ids, idsToRemove, idsToAdd) =>
          ids.reduce(
            (ids, id) => (idsToRemove.find(i => i === id) ? ids : [...ids, id]),
            idsToAdd
          )

        const idsCurrent =
          (rootState.user.preferences.filtres[`${name.slice(0, -1)}Ids`] &&
            rootState.user.preferences.filtres[`${name.slice(0, -1)}Ids`].split(
              ','
            )) ||
          []

        // si c'est le premier chargement
        // et qu'il n'y a aucun paramètre utilisateur (url)
        // on retourne tous les paramètres des metas
        if (!state[name].length && !idsCurrent.length) {
          return values.map(({ id }) => id)
        }

        // si c'est le premier chargement
        // et qu'il y a déjà des paramètres utilisateur (url)
        // on supprime des paramètres utilisateurs,
        // ceux qui ne sont plus présent dans les metas

        const idsToRemove = state[name]
          .filter(v => !values.find(value => v.id === value.id))
          .map(({ id }) => id)

        if (!state[name].length && idsCurrent.length) {
          return idsRemove(idsCurrent, idsToRemove, [])
        }

        // si c'est une mise à jour
        // et qu'il y a déjà des paramètres utilisateur (url)
        // on supprime des paramètres utilisateurs,
        // ceux qui ne sont plus présent dans les metas
        // on y ajoute ceux qui viennent d'être ajouté dans les metas

        const idsToAdd = values
          .filter(
            value =>
              !state[name].find(v => v.id === value.id) &&
              !idsCurrent.find(id => id === value.id)
          )
          .map(({ id }) => id)

        return idsRemove(idsCurrent, idsToRemove, idsToAdd)
      }

      const ids = idsFind()

      dispatch(
        'user/preferenceSet',
        { section: `filtres.${name.slice(0, -1)}Ids`, value: ids.join(',') },
        { root: true }
      )
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
