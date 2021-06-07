import { etape, etapeDeposer } from '../api/titres-etapes'
import router from '../router'

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
  },

  async depose({ commit, dispatch }, etapeId) {
    try {
      commit('loadingAdd', 'titreEtapeDepose', { root: true })

      const data = await etapeDeposer({ id: etapeId })

      await router.push({ name: 'titre', params: { id: data.id } })
    } catch (e) {
      dispatch('pageError', null, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeDepose', { root: true })
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
