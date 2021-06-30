import {
  travauxEtapeEditFormat,
  travauxEtapeSaveFormat
} from '../utils/titre-travaux-etape'

import router from '../router'

import {
  titreTravauxEtapeMetas,
  titreTravauxEtape,
  travauxEtapeCreer,
  travauxEtapeModifier
} from '../api/titres-travaux-etapes'
import { documentsRequiredAdd } from '../utils/documents'

const state = {
  element: null,
  metas: {
    travaux: null,
    travauxEtapesTypes: null
  },
  loaded: false
}

const getters = {
  etapeType(state) {
    return state.metas.travauxEtapesTypes.find(
      et => et.id === state.element.typeId
    )
  }
}

const actions = {
  async init({ commit, state, dispatch }, { titreTravauxId, id }) {
    try {
      commit('loadingAdd', 'titreTravauxEtapeInit', { root: true })

      if (id) {
        const newEtape = await titreTravauxEtape({ id })

        if (!newEtape?.modification) {
          throw new Error()
        }

        commit('set', travauxEtapeEditFormat(newEtape))
        titreTravauxId = state.element.travaux.id
      } else {
        commit('set', travauxEtapeEditFormat({}))
      }

      await dispatch('metasGet', titreTravauxId)

      if (id) {
        await dispatch('documentInit', state.element.documents)
      }

      commit('load')
    } catch (e) {
      dispatch('pageError', null, { root: true })
    } finally {
      commit('loadingRemove', 'titreTravauxEtapeInit', { root: true })
    }
  },

  async metasGet({ commit, dispatch }, titreTravauxId) {
    try {
      commit('loadingAdd', 'titreTravauxEtapeMetasGet', { root: true })

      const metas = await titreTravauxEtapeMetas({
        titreTravauxId
      })

      commit('metasSet', metas)
    } catch (e) {
      dispatch('pageError', null, { root: true })
    } finally {
      commit('loadingRemove', 'titreTravauxEtapeMetasGet', { root: true })
    }
  },

  async documentInit({ state, getters, commit, rootGetters }, documents) {
    if (!getters.etapeType) {
      commit('documentsSet', [])
    } else {
      const documentsTypes = getters.etapeType.documentsTypes

      documents = documentsRequiredAdd(
        documents,
        documentsTypes,
        rootGetters['user/userIsAdmin']
      )

      commit('documentsSet', documents)
    }
  },

  async documentAdd({ state, dispatch }, { document, idOld }) {
    const documents = state.element.documents || []
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
      commit('loadingAdd', 'titreTravauxEtapeUpdate', { root: true })

      const etapeEditFormatted = travauxEtapeSaveFormat(etape)
      etapeEditFormatted.titreTravauxId = state.metas.travaux.id

      let data
      if (etapeEditFormatted.id) {
        data = await travauxEtapeModifier({ etape: etapeEditFormatted })
      } else {
        data = await travauxEtapeCreer({ etape: etapeEditFormatted })
      }

      await router.push({
        name: 'titre',
        params: { id: data.id }
      })

      commit('titre/open', { section: 'travaux', id: etape.id }, { root: true })
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'titreTravauxEtapeUpdate', { root: true })
    }
  }
}

const mutations = {
  load(state) {
    state.loaded = true
  },

  set(state, travauxEtape) {
    state.element = travauxEtape
  },

  reset(state) {
    state.element = null
    state.metas = {
      travaux: null,
      travauxEtapesTypes: null
    }
    state.loaded = false
  },

  heritageSet(state, { etape }) {
    state.element = etape
  },
  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      state.metas[id] = data[id]
    })
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
