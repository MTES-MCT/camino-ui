import {
  travauxMetas,
  travauxCreer,
  travauxModifier,
  travauxSupprimer
} from '../api/titres-travaux'

const state = {
  metas: {
    types: []
  }
}

const actions = {
  async init({ commit }) {
    commit('loadingAdd', 'travauxInit', { root: true })

    try {
      const data = await travauxMetas()

      commit('metasSet', { types: data })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'travauxInit', { root: true })
    }
  },

  async add({ commit, dispatch }, travaux) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreTravauxAdd', { root: true })

    try {
      const data = await travauxCreer({ travaux })

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
      commit('loadingRemove', 'titreTravauxAdd', { root: true })
    }
  },

  async update({ commit, dispatch }, travaux) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreTravauxUpdate', { root: true })

    try {
      const data = await travauxModifier({ travaux })

      commit('popupClose', null, { root: true })

      dispatch(
        'messageAdd',
        { value: `le titre a été mis à jour`, type: 'success' },
        { root: true }
      )

      await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreTravauxUpdate', { root: true })
    }
  },

  async remove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreTravauxRemove', { root: true })

    try {
      const data = await travauxSupprimer({ id })

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
      commit('loadingRemove', 'titreTravauxRemove', { root: true })
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
