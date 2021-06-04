import { urlQueryParamsGet } from '../utils/url'
import { paramsBuild } from '../utils'

const listeActionsBuild = (id, name, elements, metas) => ({
  async init({ state, commit, dispatch }) {
    try {
      commit('loadingAdd', `${id}Init`, { root: true })

      if (metas) {
        const metasData = await metas()
        let data = metasData
        if (name === 'administrations') {
          data = metasData.administrationsTypes
        }

        commit('metasSet', data)
      }

      if (!state.initialized) {
        await dispatch('paramsFromQueryUpdate')

        commit('init')
      }

      await dispatch('get')
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', `${id}Init`, { root: true })
    }
  },

  async get({ state, dispatch, commit }) {
    try {
      commit('loadingAdd', `${id}Get`, { root: true })

      if (!state.initialized) return

      await dispatch('urlQueryUpdate')

      const p = paramsBuild(
        state.definitions,
        Object.assign({}, state.params.filtres, state.params.table)
      )

      const res = await elements(p)
      let data = null
      if (name === 'administrations') data = res.administrations
      if (name === 'activités') data = res.activites

      commit('set', data)

      dispatch(
        'messageAdd',
        {
          value: `mise à jour : ${name}`,
          type: 'success'
        },
        { root: true }
      )
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', `${id}Get`, { root: true })
    }
  },

  async paramsSet({ state, commit, dispatch }, { section, params, pageReset }) {
    if (section === 'table' && pageReset && state.params.table.page !== 1) {
      params.page = 1
    }

    commit('paramsSet', { section, params })

    await dispatch('get')
  },

  async routeUpdate({ dispatch }) {
    const hasChanged = await dispatch('paramsFromQueryUpdate')

    if (hasChanged) {
      await dispatch('get')
    }
  },

  async paramsFromQueryUpdate({ rootState, state, commit }) {
    let hasChanged = false

    const tableParams = urlQueryParamsGet(
      state.params.table,
      rootState.route.query,
      state.definitions
    )

    if (Object.keys(tableParams).length) {
      commit('paramsSet', { section: 'table', params: tableParams })
      hasChanged = true
    }

    if (state.params.filtres) {
      const filtresParams = urlQueryParamsGet(
        state.params.filtres,
        rootState.route.query,
        state.definitions
      )

      if (Object.keys(filtresParams).length) {
        commit('paramsSet', { section: 'filtres', params: filtresParams })
        hasChanged = true
      }
    }

    return hasChanged
  },

  async urlQueryUpdate({ state, dispatch }) {
    if (state.params.filtres) {
      const params = Object.assign(state.params.filtres, state.params.table)

      await dispatch(
        'urlQueryUpdate',
        { params, definitions: state.definitions },
        { root: true }
      )
    }
  }
})

const listeMutations = {
  reset(state) {
    state.elements = []
    state.total = 0
    state.initialized = false
  },

  set(state, { elements, total }) {
    state.elements = elements
    state.total = total
  },

  paramsSet(state, { section, params }) {
    Object.keys(params).forEach(id => {
      state.params[section][id] = params[id]
    })
  },

  init(state) {
    state.initialized = true
  }
}

export { listeActionsBuild, listeMutations }
