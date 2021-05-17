import metasIndex from './metas-definitions'
import { oneData } from '../utils'

const state = {
  elements: [],
  definition: {}
}

const actions = {
  async get({ dispatch, commit }, id) {
    try {
      commit('loadingAdd', 'metaGet', { root: true })

      if (metasIndex[id]) {
        const definition = metasIndex[id]
        const elements = await definition.get()
        commit('set', {
          elements: oneData(elements),
          definition
        })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'metaGet', { root: true })
    }
  },

  async update({ dispatch, commit }, { id, element }) {
    try {
      commit('loadingAdd', 'metaUpdate', { root: true })

      if (metasIndex[id]) {
        const definition = metasIndex[id]
        const elements = await definition.update({ element })

        commit('set', {
          elements: oneData(elements),
          definition
        })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'metaUpdate', { root: true })
    }
  },

  async create({ dispatch, commit }, { id, element }) {
    try {
      commit('loadingAdd', 'metaCreate', { root: true })

      if (metasIndex[id]) {
        const definition = metasIndex[id]
        const elements = await definition.create({ element })

        commit('set', {
          elements: oneData(elements),
          definition
        })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'metaCreate', { root: true })
    }
  },

  async delete({ dispatch, commit }, { id, element }) {
    commit('loadingAdd', 'metaDelete', { root: true })

    try {
      if (metasIndex[id]) {
        const definition = metasIndex[id]
        const elements = await definition.delete({ element })

        commit('set', {
          elements: oneData(elements),
          definition
        })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'metaDelete', { root: true })
    }
  }
}

const mutations = {
  reset(state) {
    state.elements = []
    state.elements = []
    state.definition = {}
  },

  set(state, { elements, definition }) {
    state.elements = elements
    state.definition = definition
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
