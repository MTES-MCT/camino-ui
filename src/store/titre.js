import {
  titreMetas,
  titre,
  titreCreer,
  titreModifier,
  titreSupprimer
} from '../api/titres'

import router from '../router'

const state = {
  element: null,
  metas: {
    referencesTypes: [],
    domaines: []
  },
  opened: {
    etapes: {},
    activites: {},
    travaux: {}
  },
  tabId: 'demarches'
}

const getters = {
  tabId(state, getters) {
    const tabIds = getters.tabs.map(({ id }) => id)

    if (!tabIds.includes(state.tabId)) {
      return tabIds[0]
    }

    return state.tabId
  },

  tabs(state) {
    const tabs = [{ id: 'demarches', nom: 'Droits miniers' }]

    if (state.element?.activites?.length) {
      tabs.push({ id: 'activites', nom: 'Activités' })
    }

    if (state.element?.travaux?.length || state.element?.travauxCreation) {
      tabs.push({ id: 'travaux', nom: 'Travaux' })
    }

    return tabs
  }
}

const actions = {
  async init({ commit }) {
    try {
      commit('loadingAdd', 'titreInit', { root: true })

      const data = await titreMetas()

      commit('metasSet', { referencesTypes: data })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreInit', { root: true })
    }
  },

  async get({ commit, dispatch }, id) {
    try {
      commit('loadingAdd', 'titre', { root: true })

      const data = await titre({ id })

      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'titre', { root: true })
    }
  },

  async add({ commit, dispatch }, titre) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'titreAdd', { root: true })

      const data = await titreCreer({ titre })

      commit('popupClose', null, { root: true })
      router.push({ name: 'titre', params: { id: data.id } })
      dispatch(
        'messageAdd',
        {
          value: 'le titre a été créé',
          type: 'success'
        },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreAdd', { root: true })
    }
  },

  async update({ commit, dispatch }, titre) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'totreUpdate', { root: true })

      const data = await titreModifier({ titre })

      commit('popupClose', null, { root: true })
      await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
      dispatch(
        'messageAdd',
        { value: 'le titre a été mis à jour', type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'totreUpdate', { root: true })
    }
  },

  async remove({ commit, dispatch }, id) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'titreRemove', { root: true })

      await titreSupprimer({ id })

      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        {
          value: `le titre a été supprimé`,
          type: 'success'
        },
        { root: true }
      )
      router.push({ name: 'titres' })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreRemove', { root: true })
    }
  }
}

const mutations = {
  set(state, titre) {
    state.element = titre
  },

  reset(state) {
    state.element = null
  },

  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      state.metas[id] = data[id]
    })
  },

  open(state, { section, id }) {
    if (!state.opened[section][id]) {
      state.opened[section][id] = true
    }

    state.tabId = section
  },

  close(state, { section, id }) {
    if (state.opened[section][id]) {
      state.opened[section][id] = false
    }
  },

  toggle(state, { section, id }) {
    state.opened[section][id] = !state.opened[section][id]
  },

  openTab(state, tabId) {
    state.tabId = tabId
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
