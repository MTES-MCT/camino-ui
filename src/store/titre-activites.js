// import Vue from 'vue'

import { titreActiviteUpdate } from '../api'

export const state = {}

export const actions = {
  async update({ commit, dispatch }, activite) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreActiviteUpdate', { root: true })
    try {
      console.log(activite)
      const res = await titreActiviteUpdate({
        activite: {
          id: activite.id,
          contenu: activite.contenu,
          activiteStatutId: activite.statut.id
        }
      })

      if (res) {
        commit('popupClose', null, { root: true })
        dispatch(
          'messageAdd',
          {
            value:
              res && res.confirmation
                ? `l'activite a été validée`
                : `l'activite a été enregistrée`,
            type: 'success'
          },
          { root: true }
        )
        dispatch('titre/reload', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreActiviteUpdate', { root: true })
    }
  }
}

export const getters = {}

export const mutations = {}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
