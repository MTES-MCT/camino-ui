import { etapeEditFormat } from '@/tools/titre-etape'
import Vue from 'vue'

import {
  etape,
  etapeNouvelle,
  titreEtapeMetas,
  etapeCreer,
  etapeModifier,
  etapeSupprimer
} from '../api/titres-etapes'

export const state = {
  current: null,
  metas: {
    etapesTypes: [],
    devises: [],
    unites: [],
    geoSystemes: [],
    substances: [],
    entreprises: []
  }
}

export const actions = {
  async metasGet({ commit }, { titreDemarcheId, id, date }) {
    try {
      commit('loadingAdd', 'titreEtapeMetasGet', { root: true })
      const metas = await titreEtapeMetas({ titreDemarcheId, id, date })

      let data

      if (id) {
        data = await etape({ id })
      } else {
        data = await etapeNouvelle({ titreDemarcheId, date })
      }

      commit('metasSet', metas)
      commit('set', { etape: data, titreDemarcheId })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeMetasGet', { root: true })
    }
  },

  async upsert({ commit, dispatch }, etape) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'titreEtapeUpdate', { root: true })

      let data
      if (etape.id) {
        data = await etapeModifier({ etape })
      } else {
        data = await etapeCreer({ etape })
      }

      commit('popupClose', null, { root: true })
      await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
      commit('titre/open', { section: 'etapes', id: etape.id }, { root: true })
      dispatch(
        'messageAdd',
        { value: `le titre a été mis à jour`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeUpdate', { root: true })
    }
  },

  async remove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreEtapeRemove', { root: true })

    try {
      const data = await etapeSupprimer({ id })

      commit('popupClose', null, { root: true })
      await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
      dispatch(
        'messageAdd',
        { value: `le titre a été mis à jour`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeRemove', { root: true })
    }
  }
}

export const mutations = {
  set(state, { etape, titreDemarcheId }) {
    const e = etapeEditFormat(etape, titreDemarcheId)

    console.log(e)
    Vue.set(state, 'current', e)
  },

  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      if (id === 'entreprises') {
        Vue.set(state.metas, id, data[id].elements)
      } else {
        Vue.set(state.metas, id, data[id])
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
