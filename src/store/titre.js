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

  async reload({ dispatch }, { id, idOld, creation }) {
    if (id !== idOld) {
      router.replace({ name: 'titre', params: { id } })
    }

    await dispatch('get', id)

    dispatch(
      'messageAdd',
      {
        value: `le titre a été ${creation ? 'créé' : 'mis à jour'}`,
        type: 'success'
      },
      { root: true }
    )
  },

  async titreCreate({ commit, dispatch }, titre) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreCreate', { root: true })

    try {
      const data = await titreCreer({ titre })

      if (data) {
        commit('popupClose', null, { root: true })
        dispatch('reload', { id: data.id, creation: true })
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreCreate', { root: true })
    }
  },

  async titreUpdate({ commit, dispatch }, titre) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreUpdate', { root: true })

    try {
      const data = await titreModifier({ titre })

      if (data) {
        commit('popupClose', null, { root: true })
        dispatch('reload', { id: data.id, idOld: titre.id })
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreUpdate', { root: true })
    }
  },

  async titreDelete({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDelete', { root: true })

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
      commit('loadingRemove', 'titreDelete', { root: true })
    }
  },

  async demarcheCreate({ commit, dispatch }, demarche) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDemarcheCreate', { root: true })

    try {
      const data = await demarcheCreer({ demarche })

      if (data) {
        commit('popupClose', null, { root: true })
        dispatch('reload', {
          id: data.id,
          idOld: demarche.titreId
        })
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheCreate', { root: true })
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
        dispatch('reload', {
          id: data.id,
          idOld: demarche.titreId
        })
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheUpdate', { root: true })
    }
  },

  async demarcheDelete({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDemarcheDelete', { root: true })

    try {
      const data = await demarcheSupprimer({ id })

      if (data) {
        commit('popupClose', null, { root: true })
        dispatch('reload', {
          id: data.id,
          idOld: id.slice(0, -6)
        })
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheDelete', { root: true })
    }
  },

  async etapeCreate({ commit, dispatch }, etape) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreEtapeCreate', { root: true })

    try {
      const data = await etapeCreer({ etape })

      if (data) {
        commit('popupClose', null, { root: true })
        dispatch('reload', {
          id: data.id,
          idOld: etape.titreDemarcheId.slice(0, -6)
        })
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeCreate', { root: true })
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
        dispatch('reload', {
          id: data.id,
          idOld: etape.titreDemarcheId.slice(0, -6)
        })
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeUpdate', { root: true })
    }
  },

  async etapeDelete({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreEtapeDelete', { root: true })

    try {
      const data = await etapeSupprimer({ id })

      if (data) {
        commit('popupClose', null, { root: true })
        dispatch('reload', {
          id: data.id,
          idOld: id.slice(0, -12)
        })
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeDelete', { root: true })
    }
  },

  async documentCreate({ commit, dispatch }, document) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDocumentCreate', { root: true })

    try {
      const data = await documentCreer({ document })

      if (data) {
        commit('popupClose', null, { root: true })
        dispatch('reload', {
          id: data.id,
          idOld: document.titreEtapeId.slice(0, -12)
        })
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDocumentCreate', { root: true })
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
        dispatch('reload', {
          id: data.id,
          idOld: document.titreEtapeId.slice(0, -12)
        })
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDocumentUpdate', { root: true })
    }
  },

  async documentDelete({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreDocumentDelete', { root: true })

    try {
      const data = await documentSupprimer({ id })

      if (data) {
        commit('popupClose', null, { root: true })
        dispatch('reload', {
          id: data.id,
          idOld: id.slice(0, -21)
        })
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDocumentDelete', { root: true })
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
