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
      id: 1,
      nom: '1er trimestre',
      mois: [
        {
          id: 1,
          nom: 'Janvier'
        },
        {
          id: 2,
          nom: 'Février'
        },
        {
          id: 3,
          nom: 'Mars'
        }
      ]
    },
    {
      id: 2,
      nom: '2nd trimestre',
      mois: [
        {
          id: 4,
          nom: 'Avril'
        },
        {
          id: 5,
          nom: 'Mai'
        },
        {
          id: 6,
          nom: 'Juin'
        }
      ]
    },
    {
      id: 3,
      nom: '3ème trimestre',
      mois: [
        {
          id: 7,
          nom: 'Juillet'
        },
        {
          id: 8,
          nom: 'Août'
        },
        {
          id: 9,
          nom: 'Septembre'
        }
      ]
    },
    {
      id: 4,
      nom: '4ème trimestre',
      mois: [
        {
          id: 10,
          nom: 'Octobre'
        },
        {
          id: 11,
          nom: 'Novembre'
        },
        {
          id: 12,
          nom: 'Décembre'
        }
      ]
    }
  ]
}

export const actions = {
  async rapportAdd ({ commit, dispatch }, rapport) {
    commit('popupMessagesRemove', null, { root: true })
    try {
      const res = await titreTravauxRapportAdd({ rapport })

      console.log(res)
      if (res) {
        commit('popupClose', null, { root: true })
        dispatch(
          'messageAdd',
          {
            value: `le rapport a été enregistré`,
            type: 'success'
          },
          { root: true }
        )
        dispatch('titre/reload', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
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
