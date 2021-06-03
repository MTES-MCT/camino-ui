import { etape } from '../api/titres-etapes'

const stateInitial = {
  element: null
}

const state = JSON.parse(JSON.stringify(stateInitial))

const actions = {
  async get({ commit, dispatch }, id) {
    try {
      commit('loadingAdd', 'titreEtapeGet', { root: true })

      const newEtape = await etape({ id })

      if (!newEtape) {
        throw new Error()
      }

      commit('set', { etape: newEtape })
    } catch (e) {
      dispatch('pageError', null, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeGet', { root: true })
    }
  }
}

const mutations = {
  load(state) {
    state.loaded = true
  },

  set(state, { etape }) {
    state.element = etape
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
