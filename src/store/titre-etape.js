import { etapeEditFormat } from '../utils/titre-etape-edit'
import { etapeSaveFormat } from '../utils/titre-etape-save'
import { etapeHeritageBuild } from '../utils/titre-etape-heritage-build'
import { etapeFormat } from '../utils/titre-etape-format'

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

import { oneData } from '../utils'

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
        const newEtape = oneData(await etape({ id }))

        if (!newEtape?.modification) {
          throw new Error()
        }

        commit('set', { etape: etapeEditFormat(newEtape) })
        commit('heritageLoaded', true)

        titreDemarcheId = state.element.titreDemarcheId
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

      const etape = state.element ? state.element : etapeEditFormat({})

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

      const data = oneData(
        await etapeHeritage({
          titreDemarcheId: state.metas.demarche.id,
          date: state.element.date,
          typeId
        })
      )

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

  async upsert({ state, commit, dispatch }, { etape, depose }) {
    try {
      commit('loadingAdd', 'titreEtapeUpdate', { root: true })

      const etapeEditFormatted = etapeSaveFormat(etape)
      etapeEditFormatted.titreDemarcheId = state.metas.demarche.id

      let data
      if (etapeEditFormatted.id) {
        data = oneData(
          await etapeModifier({ etape: etapeEditFormatted, depose })
        )
      } else {
        data = oneData(await etapeCreer({ etape: etapeEditFormatted, depose }))
      }

      await router.push({
        name: 'titre',
        params: { id: data.id }
      })
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeUpdate', { root: true })
    }
  },

  async remove({ commit, dispatch }, id) {
    commit('popupMessagesRemove', null, { root: true })
    commit('popupLoad', null, { root: true })
    commit('loadingAdd', 'titreEtapeRemove', { root: true })

    try {
      const data = (await etapeSupprimer({ id })).etapeSupprimer

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
  mutations,
  getters
}
