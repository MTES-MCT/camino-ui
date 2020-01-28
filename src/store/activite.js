import Vue from 'vue'

import { activite, activiteModifier } from '../api/activites'

export const state = {
  current: null
}

export const actions = {
  async get({ commit, dispatch }, id) {
    commit('loadingAdd', 'activite', { root: true })

    try {
      const data = await activite({ id })

      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'activite', { root: true })
    }
  },

  async update({ commit, dispatch, rootState }, { activite, context }) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'activiteUpdate', { root: true })

    try {
      const data = await activiteModifier({
        activite: {
          id: activite.id,
          contenu: activite.contenu,
          activiteStatutId: activite.statut.id
        }
      })

      dispatch(
        'messageAdd',
        {
          value:
            data.statut.id === 'dep'
              ? `l'activité a été validée`
              : `l'activité a été enregistrée`,
          type: 'success'
        },
        { root: true }
      )

      commit('popupClose', null, { root: true })

      if (context === 'activite') {
        await dispatch(
          'reload',
          { name: 'activite', id: rootState.activite.current.id },
          { root: true }
        )
      } else if (context === 'titre') {
        await dispatch(
          'reload',
          { name: 'titre', id: rootState.titre.current.id },
          { root: true }
        )
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'activiteUpdate', { root: true })
    }
  }
}

export const mutations = {
  set(state, entreprise) {
    Vue.set(state, 'current', entreprise)
  },

  reset(state) {
    Vue.set(state, 'current', null)
  }
}

export default {
  namespaced: true,
  actions,
  mutations
}
