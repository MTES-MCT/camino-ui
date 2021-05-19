import { etapeEditFormat } from '../utils/titre-etape-edit'
import { etapeSaveFormat } from '../utils/titre-etape-save'

import router from '../router'

import {
  etape,
  etapeHeritage,
  titreEtapeMetas,
  etapeCreer,
  etapeModifier,
  etapeSupprimer
} from '../api/titres-etapes'
import { etapeHeritageBuild } from '../utils/titre-etape-heritage-build'

const state = {
  element: null,
  metas: {
    etapesTypes: [],
    devises: [],
    unites: [],
    geoSystemes: [],
    substances: [],
    entreprises: []
  },
  heritageLoaded: false
}

const actions = {
  async init({ commit }, { titreDemarcheId, id, date }) {
    try {
      commit('loadingAdd', 'titreEtapeInit', { root: true })

      let newEtape
      let metasParams

      // modification
      if (id) {
        newEtape = await etape({ id })
        metasParams = {
          titreDemarcheId: newEtape.titreDemarcheId,
          id: newEtape.id,
          date: newEtape.date
        }
      } else {
        newEtape = { date, titreDemarcheId }
        metasParams = { titreDemarcheId, date }
      }

      const metas = await titreEtapeMetas(metasParams)

      commit('metasSet', metas)
      commit('set', { etape: newEtape })

      if (id) {
        commit('heritageLoaded', true)
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeInit', { root: true })
    }
  },

  async heritageGet({ commit, state }, { titreDemarcheId, typeId, date }) {
    try {
      commit('loadingAdd', 'titreEtapeHeritageGet', { root: true })
      commit('heritageLoaded', false)

      const data = await etapeHeritage({
        titreDemarcheId: state.element.titreDemarcheId || titreDemarcheId,
        date: state.element.date || date,
        typeId
      })

      commit('heritageSet', { etape: data })
      commit('heritageLoaded', true)
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeHeritageGet', {
        root: true
      })
    }
  },

  async upsert({ commit, dispatch }, { etape, redirect }) {
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
      if (redirect) {
        await router.push({
          name: 'titre',
          params: { id: data.id }
        })
      } else {
        await dispatch('reload', { name: 'titre', id: data.id }, { root: true })
        commit(
          'titre/open',
          { section: 'etapes', id: etape.id },
          { root: true }
        )
        dispatch(
          'messageAdd',
          { value: `le titre a été mis à jour`, type: 'success' },
          { root: true }
        )
      }
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

const mutations = {
  set(state, { etape }) {
    const e = etapeEditFormat(etape)
    state.element = e
  },

  reset(state) {
    state.element = null
  },

  heritageSet(state, { etape }) {
    const apiEtape = etapeEditFormat(etape)
    const newEtape = etapeHeritageBuild(state.element, apiEtape)

    state.element = newEtape
  },

  heritageLoaded(state, loaded) {
    state.heritageLoaded = loaded
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
