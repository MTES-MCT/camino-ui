import { TODAY } from '../utils'
import { documentEtapeFormat, etapeEditFormat } from '../utils/titre-etape-edit'
import { etapeSaveFormat } from '../utils/titre-etape-save'
import { etapeHeritageBuild } from '../utils/titre-etape-heritage-build'

import router from '../router'

import {
  etape,
  etapeCreer,
  etapeHeritage,
  etapeModifier,
  titreEtapeEtapesTypes,
  titreEtapeMetas
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

const getters = {
  etapeType(state) {
    return state.metas.etapesTypes.find(et => et.id === state.element.typeId)
  }
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

        commit('set', etapeEditFormat(newEtape))

        commit('heritageLoaded', true)

        titreDemarcheId = state.element.titreDemarcheId
      } else {
        commit('set', etapeEditFormat({}))
      }

      await dispatch('metasGet', { titreDemarcheId, id })

      if (id) {
        await dispatch('dateUpdate', { date: state.element.date })
        await dispatch('documentInit', state.element.documents)
      }

      commit('load')
    } catch (e) {
      console.log(e)
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
      console.log(e)
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

      commit('metasSet', { etapesTypes: metas })
      commit('dateSet', date)
    } catch (e) {
      console.log(e)
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
      await dispatch('documentInit', state.element.documents)

      commit('heritageLoaded', true)
    } catch (e) {
      console.log(e)
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeHeritageGet', {
        root: true
      })
    }
  },

  async documentInit({ state, getters, commit, rootGetters }, documents) {
    if (!getters.etapeType) {
      commit('documentsSet', [])
    } else {
      const documentsTypes = getters.etapeType.documentsTypes
      // supprime tous les documents temporaires
      documents = documents.filter(d => d.id !== d.typeId)

      // supprime les documents dont le documentType n'existe pas
      documents = documents.filter(d => {
        const documentsTypesIds = documentsTypes.map(({ id }) => id)
        if (!documentsTypesIds.includes(d.typeId)) {
          return false
        }

        return true
      })

      // crée les documents dont le type est obligatoires si ils n'existent pas
      documentsTypes.forEach(documentType => {
        if (
          !documentType.optionnel &&
          !documents.find(({ typeId }) => typeId === documentType.id)
        ) {
          documents.push({
            id: documentType.id,
            typeId: documentType.id,
            type: documentType,
            entreprisesLecture: rootGetters['user/userIsAdmin'],
            publicLecture: false,
            fichier: null,
            fichierNouveau: null,
            fichierTypeId: null,
            date: TODAY,
            modification: true,
            suppression: false
          })
        }
      })

      documents.forEach(d => {
        d.suppression = d.id !== d.typeId
      })

      commit('documentsSet', documents)
    }
  },

  async documentAdd({ state, dispatch }, { document, idOld }) {
    document = documentEtapeFormat(document)
    const documents = state.element.documents
    if (idOld) {
      const index = documents.findIndex(({ id }) => id === idOld)
      documents[index] = document
    } else {
      documents.push(document)
    }

    await dispatch('documentInit', documents)
  },

  async documentRemove({ state, dispatch }, { id }) {
    await dispatch(
      'documentInit',
      state.element.documents.filter(d => d.id !== id)
    )
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

      await router.push({
        name: 'titre',
        params: { id: data.id },
        hash: `#${etape.id}`
      })

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

  set(state, etape) {
    state.element = etape
  },

  dateSet(state, date) {
    state.element.date = date
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
  },

  documentsSet(state, documents) {
    state.element.documents = documents
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
