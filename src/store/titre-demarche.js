import {
  demarcheMetas,
  demarcheCreer,
  demarcheModifier,
  demarcheSupprimer
} from '../api/titres-demarches'

const state = {
  metas: {
    types: []
  }
}

const actions = {
  async init({ commit }, demarche) {
    commit('loadingAdd', 'titreDemarcheInit', { root: true })

    try {
      const data = await demarcheMetas(demarche)

      commit('metasSet', { types: data })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemarcheInit', { root: true })
    }
  },

  async add({ commit, dispatch }, demarche) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDemarcheAdd', { root: true })

    try {
      const data = await demarcheCreer({ demarche })

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
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDemarcheUpdate', { root: true })

    try {
      const data = await demarcheModifier({ demarche })

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
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreDemarcheRemove', { root: true })

    try {
      const data = await demarcheSupprimer({ id })

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
