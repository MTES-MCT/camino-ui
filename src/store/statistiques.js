import Vue from 'vue'
import { statistiques } from '../api/statistiques'

export const state = {
  titresActivitesBeneficesEntreprise: 0,
  titresActivitesBeneficesAdministration: 0,
  nbSearchArray: [],
  nbMajTitresArray: [],
  nbAction: 0,
  timeSession: '',
  nbDonwload: 0,
  loaded: false
}

export const actions = {
  async get({ commit, dispatch }) {
    commit('loadingAdd', 'statistiques', { root: true })

    try {
      const data = await statistiques()

      if (data) {
        commit('set', data)
      } else {
        commit('set', {})
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.info(e)
    } finally {
      commit('loadingRemove', 'statistiques', { root: true })
    }
  }
}

export const mutations = {
  set(state, statistiques) {
    if (statistiques.titresActivitesBeneficesEntreprise)
      Vue.set(
        state,
        'titresActivitesBeneficesEntreprise',
        statistiques.titresActivitesBeneficesEntreprise
      )
    if (statistiques.titresActivitesBeneficesAdministration)
      Vue.set(
        state,
        'titresActivitesBeneficesAdministration',
        statistiques.titresActivitesBeneficesAdministration
      )
    if (statistiques.nbSearchArray)
      Vue.set(state, 'nbSearchArray', statistiques.nbSearchArray)
    if (statistiques.nbMajTitresArray)
      Vue.set(state, 'nbMajTitresArray', statistiques.nbMajTitresArray)
    if (statistiques.nbAction) Vue.set(state, 'nbAction', statistiques.nbAction)
    if (statistiques.timeSession)
      Vue.set(state, 'timeSession', statistiques.timeSession)
    if (statistiques.nbDonwload)
      Vue.set(state, 'nbDonwload', statistiques.nbDonwload)

    Vue.set(state, 'loaded', true)
  }
}

export default { namespaced: true, state, actions, mutations }
