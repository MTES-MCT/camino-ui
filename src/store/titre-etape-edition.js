import {
  documentEtapeFormat,
  etapeEditFormat,
  etapePointsFormat
} from '../utils/titre-etape-edit'
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
import { documentsRequiredAdd } from '../utils/documents'
import { pointsImporter } from '../api/geojson'

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
    if (state.element?.type) {
      return state.metas.etapesTypes.find(et => et.id === state.element.type.id)
    }
    return null
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

      commit('metasSet', { etapesTypes: metas })
      commit('dateSet', date)
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
      const newEtape = etapeHeritageBuild(state.element, apiEtape)

      commit('heritageSet', { etape: newEtape })
      await dispatch('documentInit', state.element.documents)

      commit('heritageLoaded', true)
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeHeritageGet', {
        root: true
      })
    }
  },

  async documentInit({ state, getters, commit, rootGetters }, documents) {
    if (!state.element.type) {
      commit('documentsSet', [])
    } else {
      const documentsTypes = state.element.type.documentsTypes

      // si la démarche est mécanisée il faut ajouter des documents obligatoires
      if (state.element.contenu && state.element.contenu.arm) {
        documentsTypes
          .filter(dt => ['doe', 'dep'].includes(dt.id))
          .forEach(dt => (dt.optionnel = !state.element.contenu.arm.mecanise))
      }

      documents = documentsRequiredAdd(
        documents,
        documentsTypes,
        rootGetters['user/userIsAdmin']
      )

      commit('documentsSet', documents)
    }
  },

  async documentAdd({ state, dispatch }, { document, idOld }) {
    document = documentEtapeFormat(document)
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
      commit('loadingAdd', 'titreEtapeUpdate', { root: true })

      const etapeEditFormatted = etapeSaveFormat(etape)
      etapeEditFormatted.titreDemarcheId = state.metas.demarche.id

      let data
      if (etapeEditFormatted.id) {
        data = await etapeModifier({ etape: etapeEditFormatted })
      } else {
        data = await etapeCreer({ etape: etapeEditFormatted })
      }

      const tabId =
        state.metas.demarche?.type?.travaux === true ? 'travaux' : 'demarches'

      const routerOptions = {
        name: 'titre',
        params: { id: data.slug }
      }

      if (etape.id) {
        routerOptions.hash = `#${etape.id}`
      }

      await router.push(routerOptions)

      commit('titre/open', { section: 'etapes', id: etape.id }, { root: true })
      commit('titre/openTab', tabId, { root: true })
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'titreEtapeUpdate', { root: true })
    }
  },

  async pointsImport({ state, commit, dispatch }, { file, geoSystemeId }) {
    try {
      commit('loadingAdd', 'pointsImport', { root: true })

      const points = await pointsImporter({ file, geoSystemeId })
      const etape = etapePointsFormat(state.element, points)

      commit('set', etape)
      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        {
          value: `${points.length} points ont été importés avec succès`,
          type: 'success'
        },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'pointsImport', { root: true })
    }
  },

  entrepriseDocumentAdd({ commit }, { entrepriseId, document }) {
    commit('entrepriseDocumentAdd', { entrepriseId, document })
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
    state.element.justificatifs.push({ id: document.id })
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
