import Vue from 'vue'
import { stats } from '../api'

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
    commit('loadingAdd', 'stats', { root: true })

    try {
      const res = await stats()

      if (res) {
        commit('set', res)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
      console.log(e)
    } finally {
      commit('loadingRemove', 'stats', { root: true })
    }
  }
}

export const getters = {}

export const mutations = {
  set(state, stats) {
    if (stats.titresTotal) Vue.set(state, 'titresTotal', stats.titresTotal)
    if (stats.titresValide) Vue.set(state, 'titresValide', stats.titresValide)
    if (stats.titresActivites2018Depose)
      Vue.set(
        state,
        'titresActivites2018Depose',
        stats.titresActivites2018Depose
      )
    if (stats.titreActivites2018Ratio)
      Vue.set(state, 'titreActivites2018Ratio', stats.titreActivites2018Ratio)
    if (stats.titresActivites2018BeneficesEntreprise)
      Vue.set(
        state,
        'titresActivites2018BeneficesEntreprise',
        stats.titresActivites2018BeneficesEntreprise
      )
    if (stats.titresActivites2018BeneficesAdministration)
      Vue.set(
        state,
        'titresActivites2018BeneficesAdministration',
        stats.titresActivites2018BeneficesAdministration
      )

    Vue.set(state, 'loaded', true)
  }
}

export default { namespaced: true, state, actions, getters, mutations }
