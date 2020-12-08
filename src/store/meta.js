import Vue from 'vue'
import metasIndex from './metas-definitions'

export const state = {
  elements: [],
  definition: {}
}

export const actions = {
  async get({ dispatch, commit }, id) {
    commit('loadingAdd', 'definition', { root: true })

    try {
      if (metasIndex[id]) {
        const elements = await metasIndex[id].get()
        commit('set', { elements, definition: metasIndex[id] })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'definition', { root: true })
    }
  },

  async update({ dispatch, commit }, { id, element }) {
    commit('loadingAdd', 'definition', { root: true })

    try {
      if (metasIndex[id]) {
        console.log(element)
        const elements = await metasIndex[id].update({ element })
        commit('set', { elements, definition: metasIndex[id] })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'definition', { root: true })
    }
  }
}

export const mutations = {
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
