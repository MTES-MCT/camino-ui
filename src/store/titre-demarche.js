import {
  demarcheMetas,
  demarcheCreer,
  demarcheModifier,
  demarcheSupprimer
} from '../api/titres-demarches'

import { oneData } from '../utils'

const state = {
  metas: {
    types: []
  }
}

const actions = {
  async init({ commit }, demarche) {
    try {
      commit('loadingAdd', 'titreDemarcheInit', { root: true })
      const data = oneData(await demarcheMetas(demarche))

      commit('metasSet', { types: data })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheInit', { root: true })
    }
  },

  async add({ commit, dispatch }, demarche) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'titreDemarcheAdd', { root: true })
      const data = oneData(await demarcheCreer({ demarche }))

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
      commit('loadingRemove', 'titreDemarcheAdd', { root: true })
    }
  },

  async update({ commit, dispatch }, demarche) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'titreDemarcheUpdate', { root: true })
      const data = oneData(await demarcheModifier({ demarche }))

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
      commit('loadingRemove', 'titreDemarcheUpdate', { root: true })
    }
  },

  async remove({ commit, dispatch }, id) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'titreDemarcheRemove', { root: true })
      const data = oneData(await demarcheSupprimer({ id }))

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
      commit('loadingRemove', 'titreDemarcheRemove', { root: true })
    }
  }
}

const mutations = {
  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      state.metas[id] = data[id]
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
