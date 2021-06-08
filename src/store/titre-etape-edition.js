import { etapeEditFormat } from '../utils/titre-etape-edit'
import { etapeSaveFormat } from '../utils/titre-etape-save'
import { etapeHeritageBuild } from '../utils/titre-etape-heritage-build'

import router from '../router'

import {
  etape,
  etapeHeritage,
  titreEtapeMetas,
  titreEtapeEtapesTypes,
  etapeCreer,
  etapeModifier,
  etapeSupprimer
} from '../api/titres-etapes'

const state = {
  element: null,
  metas: {
    demarche: null,
    etapesTypes: [],
    devises: [],
    unites: [],
    geoSystemes: [],
    substances: [],
    entreprises: []
  },
  heritageLoaded: false,
  loaded: false
}

const actions = {
  async init({ commit, state, dispatch }, { titreDemarcheId, id }) {
    try {
      commit('loadingAdd', 'titreEtapeInit', { root: true })

      if (id) {
        const newEtape = await etape({ id })

        if (!newEtape?.modification) {
          throw new Error()
        }

        commit('set', { etape: etapeEditFormat(newEtape) })
        commit('heritageLoaded', true)

        titreDemarcheId = state.element.titreDemarcheId
      } else {
        commit('set', { etape: etapeEditFormat({}) })
      }

      await dispatch('metasGet', { titreDemarcheId, id })

      if (id) {
        await dispatch('dateUpdate', { date: state.element.date })
      }

      commit('load')
    } catch (e) {
      dispatch('pageError', null, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeInit', { root: true })
    }
  },

  async metasGet({ commit, dispatch }, { titreDemarcheId, id }) {
    try {
      commit('loadingAdd', 'titreEtapeMetasGet', { root: true })

      const metas = await titreEtapeMetas({
        titreDemarcheId,
        id
      })

      commit('metasSet', metas)
    } catch (e) {
      dispatch('pageError', null, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeMetasGet', { root: true })
    }
  },

  async dateUpdate({ state, commit, dispatch }, { date }) {
    try {
      commit('loadingAdd', 'titreEtapeEtapesTypesGet', { root: true })
      const metas = await titreEtapeEtapesTypes({
        id: state.element?.id,
        date,
        titreDemarcheId: state.metas.demarche.id
      })

      const etape = state.element

      etape.date = date

      commit('metasSet', { etapesTypes: metas })
      commit('set', { etape })
    } catch (e) {
      dispatch('pageError', null, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeEtapesTypesGet', { root: true })
    }
  },

  async heritageGet({ commit, state, dispatch }, { typeId }) {
    try {
      commit('loadingAdd', 'titreEtapeHeritageGet', { root: true })
      commit('heritageLoaded', false)

      const data = await etapeHeritage({
        titreDemarcheId: state.metas.demarche.id,
        date: state.element.date,
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
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeHeritageGet', {
        root: true
      })
    }
  },

  async upsert({ state, commit, dispatch }, { etape }) {
    try {
      commit('loadingAdd', 'titreEtapeUpdate', { root: true })

      const etapeEditFormatted = etapeSaveFormat(etape)
      etapeEditFormatted.titreDemarcheId = state.metas.demarche.id

      let data
      if (etapeEditFormatted.id) {
        data = await etapeModifier({ etape: etapeEditFormatted })
      } else {
        data = await etapeCreer({ etape: etapeEditFormatted })
      }

      await router.push({ name: 'titre', params: { id: data.id } })

      commit('titre/open', { section: 'etapes', id: etape.id }, { root: true })
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeUpdate', { root: true })
    }
  }
}

const mutations = {
  load(state) {
    state.loaded = true
  },

  set(state, { etape }) {
    state.element = etape
  },

  reset(state) {
    state.element = null
    state.metas = {
      demarche: null,
      etapesTypes: [],
      devises: [],
      unites: [],
      geoSystemes: [],
      substances: [],
      entreprises: []
    }
    state.heritageLoaded = false
    state.loaded = false
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
  },

  entrepriseDocumentAdd(state, { entrepriseId, document }) {
    const entreprise = state.metas.entreprises.find(
      ({ id }) => id === entrepriseId
    )

    entreprise.documents.push(document)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
