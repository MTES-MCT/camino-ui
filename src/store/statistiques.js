import Vue from 'vue'
import { statistiques } from '../api'

export const state = {
  titresTotal: 0,
  titresValide: 0,
  titresActivites2018Depose: 0,
  titreActivites2018Ratio: 0,
  titresActivites2018BeneficesEntreprise: 0,
  titresActivites2018BeneficesAdministration: 0,
  loaded: false
}

export const actions = {
  async get({ commit, dispatch }) {
    commit('loadingAdd', 'statistiques', { root: true })

    try {
      const res = await statistiques()

      res ? commit('set', res) : commit('set', {})
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'statistiques', { root: true })
    }
  }
}

export const getters = {}

export const mutations = {
  set(state, statistiques) {
    if (statistiques.titresTotal)
      Vue.set(state, 'titresTotal', statistiques.titresTotal)
    if (statistiques.titresValide)
      Vue.set(state, 'titresValide', statistiques.titresValide)
    if (statistiques.titresActivites2018Depose)
      Vue.set(
        state,
        'titresActivites2018Depose',
        statistiques.titresActivites2018Depose
      )
    if (statistiques.titreActivites2018Ratio)
      Vue.set(
        state,
        'titreActivites2018Ratio',
        statistiques.titreActivites2018Ratio
      )
    if (statistiques.titresActivites2018BeneficesEntreprise)
      Vue.set(
        state,
        'titresActivites2018BeneficesEntreprise',
        statistiques.titresActivites2018BeneficesEntreprise
      )
    if (statistiques.titresActivites2018BeneficesAdministration)
      Vue.set(
        state,
        'titresActivites2018BeneficesAdministration',
        statistiques.titresActivites2018BeneficesAdministration
      )

    Vue.set(state, 'loaded', true)
  }
}

export default { namespaced: true, state, actions, getters, mutations }
