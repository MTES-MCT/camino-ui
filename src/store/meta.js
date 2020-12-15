import Vue from 'vue'
import metasIndex from './metas-definitions'

export const state = {
  elements: [],
  definition: {}
}

export const actions = {
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
      console.info(e)
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
      console.info(e)
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
      console.info(e)
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
      console.info(e)
    } finally {
      commit('loadingRemove', 'metaDelete', { root: true })
    }
  }
}

export const mutations = {
  reset(state) {
    Vue.set(state, 'list', [])
    state.elements = []
    state.definition = {}
  },

  set(state, { elements, definition }) {
    Vue.set(state, 'elements', elements)
    Vue.set(state, 'definition', definition)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
