// import Vue from 'vue'

import { titreTravauxRapportAdd } from '../api'

export const state = {
  current: null,
  calendrier: [
    {
      numero: '01',
      nom: '1er trimestre',
      mois: [
        {
          numero: '01',
          nom: 'Janvier'
        },
        {
          numero: '02',
          nom: 'Février'
        },
        {
          numero: '03',
          nom: 'Mars'
        }
      ]
    },
    {
      numero: '02',
      nom: '2nd trimestre',
      mois: [
        {
          numero: '04',
          nom: 'Avril'
        },
        {
          numero: '05',
          nom: 'Mai'
        },
        {
          numero: '06',
          nom: 'Juin'
        }
      ]
    },
    {
      numero: '03',
      nom: '3ème trimestre',
      mois: [
        {
          numero: '07',
          nom: 'Juillet'
        },
        {
          numero: '08',
          nom: 'Août'
        },
        {
          numero: '09',
          nom: 'Septembre'
        }
      ]
    },
    {
      numero: '04',
      nom: '4ème trimestre',
      mois: [
        {
          numero: '10',
          nom: 'Octobre'
        },
        {
          numero: '11',
          nom: 'Novembre'
        },
        {
          numero: '12',
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
