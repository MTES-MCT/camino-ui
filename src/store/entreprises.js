import Vue from 'vue'
import { entreprises, entrepriseSearchDatabase, entrepriseAskApi } from '../api'
import EntrepriseEditPopup from '../components/entreprises/edit-popup.vue'

export const state = {
  list: []
}

export const actions = {
  async get({ dispatch, commit }) {
    commit('loadingAdd', 'entreprises', { root: true })

    try {
      const res = await entreprises({})
      if (res) {
        commit('set', res)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'entreprises', { root: true })
    }
  },

  async findBySiren({ commit, dispatch }, siren) {
    // commit('popupMessagesRemove', null, { root: true })
    // commit('loadingAdd', 'entrepriseAdd', { root: true })
    try {
      let situation = 'absent'
      let res = await entrepriseSearchDatabase(siren)

      if (res) {
        situation = 'enBase'
      } else {
        res = await entrepriseAskApi(siren)
        if (res) {
          situation = 'dansApi'
        }
      }
      if (res) {
        commit(
          'popupOpen',
          {
            component: EntrepriseEditPopup,
            props: {
              entreprise: res,
              action: 'create',
              situation: situation
            }
          },
          { root: true }
        )
      } else {
        // dispatch('pageError', null, { root: true })
        commit(
          'popupOpen',
          {
            component: EntrepriseEditPopup,
            props: {
              entreprise: { legalSiren: siren },
              action: 'create',
              situation: 'horsApi'
            }
          },
          { root: true }
        )
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'entreprise', { root: true })
    }
  }

  // async add({ commit, dispatch }, entreprise) {
  //   commit('popupMessagesRemove', null, { root: true })
  //   commit('loadingAdd', 'entrepriseAdd', { root: true })
  //   try {
  //     const u = await entrepriseAdd({ entreprise })

  //     commit('popupClose', null, { root: true })

  //     if (u) {
  //       commit('add', u)
  //       dispatch(
  //         'messageAdd',
  //         {
  //           value: `entreprise ${u.prenom} ${u.nom} ajouté`,
  //           type: 'success'
  //         },
  //         { root: true }
  //       )
  //     }
  //   } catch (e) {
  //     commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
  //   } finally {
  //     commit('loadingRemove', 'entrepriseAdd', { root: true })
  //   }
  // }
}

export const getters = {}

export const mutations = {
  set(state, entreprises) {
    console.log(state)
    Vue.set(
      state,
      'list',
      entreprises.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
    )
  },

  add(state, entreprise) {
    state.list.push(entreprise)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
