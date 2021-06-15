import {
  activite,
  activiteDeposer,
  activiteSupprimer
} from '../api/titres-activites'

const state = {
  element: null,
  opened: false
}

const actions = {
  async get({ commit, dispatch }, id) {
    commit('loadingAdd', 'activiteGet', { root: true })

    try {
      const data = await activite({ id })

      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'activiteGet', { root: true })
    }
  },

  async remove({ commit, dispatch }, { id, route }) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'activiteRemove', { root: true })
      await activiteSupprimer({ id })

      commit('popupClose', null, { root: true })

      await dispatch('reloadRoute', route)

      dispatch(
        'messageAdd',
        { value: `l'activité à été supprimée`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'activiteRemove', { root: true })
    }
  },

  async reloadRoute({ dispatch }, route) {
    if (route?.id) {
      await dispatch('reload', route, { root: true })
    } else {
      await dispatch('reload', { name: 'activites' }, { root: true })
    }
  },

  async depose({ commit, dispatch }, { id, route }) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'titreActiviteDepose', { root: id })

      await activiteDeposer({ id })

      commit('popupClose', null, { root: true })

      await dispatch('reloadRoute', route)
      dispatch(
        'messageAdd',
        { value: `la demande a été déposée`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreActiviteDepose', { root: true })
    }
  }
}

const mutations = {
  set(state, entreprise) {
    state.element = entreprise
  },

  reset(state) {
    state.element = null
  },

  open(state) {
    if (!state.opened) {
      state.opened = true
    }
  },

  close(state) {
    if (state.opened) {
      state.opened = false
    }
  },

  toggle(state) {
    state.opened = !state.opened
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state
}
