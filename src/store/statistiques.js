import Vue from 'vue'
import { statistiques } from '../api'

export const state = {
  titresTotal: 0,
  titresValide: 0,
  titresActivitesDepose: 0,
  titreActivites2018Ratio: 0,
  titresActivitesBeneficesEntreprise: 0,
  titresActivitesBeneficesAdministration: 0,
  loaded: false
}

export const actions = {
  async get({ commit, dispatch }) {
    commit('loadingAdd', 'statistiques', { root: true })

    try {
      const res = await statistiques()

      console.log(res)

      if (res) {
        commit('set', res)
      } else {
        commit('set', {})
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'statistiques', { root: true })
    }
  }
}

export const mutations = {
  set(state, statistiques) {
    if (statistiques.titresTotal)
      Vue.set(state, 'titresTotal', statistiques.titresTotal)
    if (statistiques.titresValide)
      Vue.set(state, 'titresValide', statistiques.titresValide)
    if (statistiques.titresActivitesDepose)
      Vue.set(
        state,
        'titresActivitesDepose',
        statistiques.titresActivitesDepose
      )
    if (statistiques.titreActivites2018Ratio)
      Vue.set(
        state,
        'titreActivites2018Ratio',
        statistiques.titreActivites2018Ratio
      )
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

    Vue.set(state, 'loaded', true)
  }
}

export default { namespaced: true, state, actions, mutations }
