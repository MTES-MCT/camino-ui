import Vue from 'vue'

export const state = {
  types: [],
  domaines: [],
  statuts: []
}

export const actions = {
  set({ state, commit, dispatch, rootState }, { id, values }) {
    const metasFilters = ['types', 'domaines', 'statuts']

    if (metasFilters.find(n => id === n)) {
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
          rootState.user.preferences.filtres[id] &&
          rootState.user.preferences.filtres[id].split(',')

        const idsToRemove = state[id]
          .filter(v => !values.find(value => v.id === value.id))
          .map(({ id }) => id)

        if (idsCurrent) {
          return idsRemove(idsCurrent, idsToRemove)
        }
      }

      const ids = idsFind()
      if (ids) {
        dispatch(
          'user/preferenceSet',
          { section: `filtres.${id}`, value: ids.join(',') || null },
          { root: true }
        )
      }
    }

    commit('set', { id, values })
  }
}

export const getters = {}

export const mutations = {
  set(state, { id, values }) {
    Vue.set(state, id, values)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
