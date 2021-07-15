import metasIndex from './metas-definitions'

const state = {
  elements: [],
  definition: {},
  entities: {}
}

const actions = {
  async get({ dispatch, commit }, id) {
    try {
      commit('loadingAdd', 'metaGet', { root: true })

      if (metasIndex[id]) {
        const definition = metasIndex[id]
        const elements = await definition.get()
        commit('set', { elements, definition })

        for (const colonne of metasIndex[id].colonnes) {
          if (colonne.type === 'entities' && colonne.entities) {
            const entities = await metasIndex[colonne.entities].get()

            commit('setEntities', { id: colonne.entities, entities })
          }
        }
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

        commit('set', { elements, definition })
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
    state.definition = {}
    state.entities = {}
  },

  set(state, { elements, definition }) {
    state.elements = elements
    state.definition = definition
  },

  setEntities(state, { id, entities }) {
    state.entities[id] = entities
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
