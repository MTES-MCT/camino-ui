import { etapeEditFormat } from '../utils/titre-etape-edit'
import { etapeSaveFormat } from '../utils/titre-etape-save'
import { etapeHeritageBuild } from '../utils/titre-etape-heritage-build'
import { etapeFormat } from '../utils/titre-etape-format'

import router from '../router'

import {
  etape,
  etapeHeritage,
  titreEtapeMetas,
  etapeCreer,
  etapeModifier,
  etapeSupprimer
} from '../api/titres-etapes'

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
  async init({ commit, dispatch }, { titreDemarcheId, id, date, fromPopup }) {
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

        if (!newEtape?.modification) {
          throw new Error()
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
      if (fromPopup) {
        commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
      } else {
        dispatch('pageError', null, { root: true })
      }
    } finally {
      commit('loadingRemove', 'titreEtapeInit', { root: true })
    }
  },

  async heritageGet(
    { commit, state, dispatch },
    { titreDemarcheId, typeId, date, fromPopup }
  ) {
    try {
      commit('loadingAdd', 'titreEtapeHeritageGet', { root: true })
      commit('heritageLoaded', false)

      const data = await etapeHeritage({
        titreDemarcheId: state.element.titreDemarcheId || titreDemarcheId,
        date: state.element.date || date,
        typeId
      })

      const apiEtape = etapeEditFormat(data)
      const etapeType = state.metas.etapesTypes.find(
        et => et.id === apiEtape.typeId
      )
      const newEtape = etapeHeritageBuild(state.element, apiEtape, etapeType)

      commit('heritageSet', { etape: newEtape })
      commit('heritageLoaded', true)
    } catch (e) {
      console.log(e)
      if (fromPopup) {
        commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
      } else {
        dispatch('apiError', e, { root: true })
      }
    } finally {
      commit('loadingRemove', 'titreEtapeHeritageGet', {
        root: true
      })
    }
  },

  async upsert({ commit, dispatch }, { etape, fromPopup, depose }) {
    try {
      commit('loadingAdd', 'titreEtapeUpdate', { root: true })

      if (fromPopup) {
        commit('popupMessagesRemove', null, { root: true })
        commit('popupLoad', null, { root: true })
      }

      const etapeEditFormatted = etapeSaveFormat(etape)

      let data
      if (etapeEditFormatted.id) {
        data = await etapeModifier({ etape: etapeEditFormatted, depose })
      } else {
        data = await etapeCreer({ etape: etapeEditFormatted, depose })
      }

      if (!fromPopup) {
        await router.push({
          name: 'titre',
          params: { id: data.id }
        })
      } else {
        commit('popupClose', null, { root: true })
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

const getters = {
  etapeEditFormatted(state) {
    return etapeFormat(state.element, state.metas)
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
    state.element = etape
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
  mutations,
  getters
}
