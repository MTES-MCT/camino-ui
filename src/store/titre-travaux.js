// import Vue from 'vue'

import { titreTravauxRapportAdd } from '../api'

export const state = {
  current: null,
  periode: {
    trimestre: 1,
    annee: 2018
  },
  rapportCalendrier: [
    {
      numero: 1,
      nom: '1er trimestre',
      mois: [
        {
          numero: 1,
          nom: 'Janvier'
        },
        {
          numero: 2,
          nom: 'Février'
        },
        {
          numero: 3,
          nom: 'Mars'
        }
      ]
    },
    {
      numero: 2,
      nom: '2nd trimestre',
      mois: [
        {
          numero: 4,
          nom: 'Avril'
        },
        {
          numero: 5,
          nom: 'Mai'
        },
        {
          numero: 6,
          nom: 'Juin'
        }
      ]
    },
    {
      numero: 3,
      nom: '3ème trimestre',
      mois: [
        {
          numero: 7,
          nom: 'Juillet'
        },
        {
          numero: 8,
          nom: 'Août'
        },
        {
          numero: 9,
          nom: 'Septembre'
        }
      ]
    },
    {
      numero: 4,
      nom: '4ème trimestre',
      mois: [
        {
          numero: 10,
          nom: 'Octobre'
        },
        {
          numero: 11,
          nom: 'Novembre'
        },
        {
          numero: 12,
          nom: 'Décembre'
        }
      ]
    }
  ],
  popupMessages: []
}

export const actions = {
  async rapportAdd({ commit, dispatch }, rapport) {
    console.log(this.rapport)
    commit('popupMessagesRemove')
    try {
      const res = await titreTravauxRapportAdd({ rapport })

      console.log(res)
      if (res) {
        commit('popupClose', null, { root: true })
        dispatch(
          'messageAdd',
          {
            value: `Le rapport a été enregistré.`,
            type: 'success'
          },
          { root: true }
        )
        dispatch('titre/reload', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' })
    }
  }
}

export const getters = {}

export const mutations = {
  popupMessagesRemove(state) {
    state.popupMessages = []
  },

  popupMessageAdd(state, message) {
    state.popupMessages.push(message)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
