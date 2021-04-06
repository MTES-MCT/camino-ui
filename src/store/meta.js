import metasIndex from './metas-definitions'

const state = {
  elements: [],
  definition: {}
}

const actions = {
  async get({ dispatch, commit }, id) {
    commit('loadingAdd', 'metaGet', { root: true })

    try {
      if (metasIndex[id]) {
        const definition = metasIndex[id]
        const elements = await definition.get()

        commit('set', { elements, definition })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'metaGet', { root: true })
    }
  },

  async update({ dispatch, commit }, { id, element }) {
    commit('loadingAdd', 'metaUpdate', { root: true })

    try {
      if (metasIndex[id]) {
        const definition = metasIndex[id]
        const elements = await definition.update({ element })

        commit('set', { elements, definition })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'metaUpdate', { root: true })
    }
  },

  async create({ dispatch, commit }, { id, element }) {
    commit('loadingAdd', 'metaCreate', { root: true })

    try {
      if (metasIndex[id]) {
        const definition = metasIndex[id]
        const elements = await definition.create({ element })

        commit('set', { elements, definition })
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

        commit('set', { elements, definition })
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
