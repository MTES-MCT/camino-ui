import Vue from 'vue'

import {
  titre,
  titreCreer,
  titreModifier,
  titreSupprimer,
  demarcheCreer,
  demarcheModifier,
  demarcheSupprimer,
  etapeCreer,
  etapeModifier,
  etapeSupprimer,
  documentCreer,
  documentModifier,
  documentSupprimer
} from '../api/titres'

import router from '../router'

export const state = {
  current: null
}

export const actions = {
  async get({ commit, dispatch }, id) {
    commit('loadingAdd', 'titre', { root: true })

    try {
      const data = await titre({ id })

      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'titre', { root: true })
    }
  },

  async titreAdd({ commit, dispatch }, titre) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreAdd', { root: true })

    try {
      const data = await titreCreer({ titre })

      if (data) {
        commit('popupClose', null, { root: true })
        router.push({ name: 'titre', params: { id: data.id } })
        dispatch(
          'messageAdd',
          {
            value: `le titre a été créé`,
            type: 'success'
          },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreAdd', { root: true })
    }
  },

  async titreUpdate({ commit, dispatch }, titre) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreUpdate', { root: true })

    try {
      const data = await titreModifier({ titre })

      commit('popupClose', null, { root: true })
      await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
      dispatch(
        'messageAdd',
        { value: `le titre a été mis à jour`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreUpdate', { root: true })
    }
  },

  async titreRemove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreRemove', { root: true })

    try {
      const data = await titreSupprimer({ id })

      if (data) {
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
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreRemove', { root: true })
    }
  },

  async demarcheAdd({ commit, dispatch }, demarche) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDemarcheAdd', { root: true })

    try {
      const data = await demarcheCreer({ demarche })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheAdd', { root: true })
    }
  },

  async demarcheUpdate({ commit, dispatch }, demarche) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDemarcheUpdate', { root: true })

    try {
      const data = await demarcheModifier({ demarche })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheUpdate', { root: true })
    }
  },

  async demarcheRemove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDemarcheRemove', { root: true })

    try {
      const data = await demarcheSupprimer({ id })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheRemove', { root: true })
    }
  },

  async etapeAdd({ commit, dispatch }, etape) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreEtapeAdd', { root: true })

    try {
      const data = await etapeCreer({ etape })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeAdd', { root: true })
    }
  },

  async etapeUpdate({ commit, dispatch }, etape) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreEtapeUpdate', { root: true })

    try {
      const data = await etapeModifier({ etape })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeUpdate', { root: true })
    }
  },

  async etapeRemove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreEtapeRemove', { root: true })

    try {
      const data = await etapeSupprimer({ id })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeRemove', { root: true })
    }
  },

  async documentAdd({ commit, dispatch }, document) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDocumentAdd', { root: true })

    try {
      const data = await documentCreer({ document })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDocumentAdd', { root: true })
    }
  },

  async documentUpdate({ commit, dispatch }, document) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDocumentUpdate', { root: true })

    try {
      const data = await documentModifier({ document })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDocumentUpdate', { root: true })
    }
  },

  async documentRemove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDocumentRemove', { root: true })

    try {
      const data = await documentSupprimer({ id })

      if (data) {
        commit('popupClose', null, { root: true })
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDocumentRemove', { root: true })
    }
  }
}

export const mutations = {
  set(state, titre) {
    Vue.set(state, 'current', titre)
  },

  reset(state) {
    Vue.set(state, 'current', null)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
