import { etapeEditFormat } from '../utils/titre-etape-edit'
import { etapeSaveFormat } from '../utils/titre-etape-save'

import {
  etape,
  etapeHeritage,
  titreEtapeMetas,
  etapeCreer,
  etapeModifier,
  etapeSupprimer
} from '../api/titres-etapes'
import { etapeHeritageBuild } from '../utils/titre-etape-heritage-build'

export const state = {
  element: null,
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
  async init({ commit }, { titreDemarcheId, id, date }) {
    try {
      commit('loadingAdd', 'titreEtapeInit', { root: true })

      let newEtape

      if (id) {
        newEtape = await etape({ id })
        date = newEtape.date
      } else {
        newEtape = { date }
      }

      const metas = await titreEtapeMetas({ titreDemarcheId, id, date })

      commit('metasSet', metas)
      commit('set', { etape: newEtape, titreDemarcheId })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeInit', { root: true })
    }
  },

  async heritageGet({ commit, state }, { titreDemarcheId, typeId, date }) {
    try {
      commit('loadingAdd', 'titreEtapeHeritageGet', { root: true })
      const data = await etapeHeritage({
        titreDemarcheId,
        date: state.element.date ? state.element.date : date,
        typeId
      })

      commit('heritageSet', { etape: data, titreDemarcheId })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeHeritageGet', {
        root: true
      })
    }
  },

  async upsert({ commit, dispatch }, etape) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'titreEtapeUpdate', { root: true })

      const etapeFormatted = etapeSaveFormat(etape)

      let data
      if (etapeFormatted.id) {
        data = await etapeModifier({ etape: etapeFormatted })
      } else {
        data = await etapeCreer({ etape: etapeFormatted })
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
    state.element = e
  },

  heritageSet(state, { etape, titreDemarcheId }) {
    const apiEtape = etapeEditFormat(etape, titreDemarcheId)
    const newEtape = etapeHeritageBuild(state.element, apiEtape)

    state.element = newEtape
  },

  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      if (id === 'entreprises') {
        state.metas[id] = data[id].elements
      } else {
        state.metas[id] = data[id]
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
