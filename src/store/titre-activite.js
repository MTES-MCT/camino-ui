import Vue from 'vue'

import { activite, activiteModifier } from '../api/titres-activites'

export const state = {
  current: null,
  opened: false
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
      console.info(e)
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
          statutId: activite.statut.id
        }
      })

      if (context) {
        commit('popupClose', null, { root: true })

        await dispatch(
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

        if (context.name === 'titre') {
          commit(
            'titre/open',
            { section: 'activites', id: activite.id },
            { root: true }
          )
        } else {
          commit('open')
        }
        await dispatch('reload', context, { root: true })
      }

      return 'success'
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
  },

  open(state) {
    if (!state.opened) {
      Vue.set(state, 'opened', true)
    }
  },

  close(state) {
    if (state.opened) {
      Vue.set(state, 'opened', false)
    }
  },

  toggle(state) {
    if (state.opened) {
      Vue.set(state, 'opened', false)
    } else {
      Vue.set(state, 'opened', true)
    }
  }
}

export default {
  namespaced: true,
  actions,
  mutations
}
