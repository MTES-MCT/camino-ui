import Vue from 'vue'
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
      commit('loadingRemove', 'titreEtapeMetasGet', { root: true })
    }
  },

  async heritageGet({ commit, state }, { titreDemarcheId, typeId, date }) {
    try {
      commit('loadingAdd', 'titreEtapeHeritageGet', { root: true })
      const data = await etapeHeritage({
        titreDemarcheId,
        date: state.current.date ? state.current.date : date,
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
    Vue.set(state, 'current', e)
  },

  heritageSet(state, { etape, titreDemarcheId }) {
    const e = etapeEditFormat(etape, titreDemarcheId)

    const newEtape = {
      date: state.current.date,
      typeId: state.current.typeId,
      statutId: '',
      incertitudes: { date: state.current.incertitudes.date },
      titreDemarcheId: state.current.titreDemarcheId
    }

    // si
    // - on crée une nouvelle étape fondamentale
    // - on change le type d'étape (non-fondamentale -> fondamentale)
    // alors la nouvelle étape récupère les propriété de l'API
    if (!state.current.heritageProps && e.heritageProps) {
      newEtape.heritageProps = e.heritageProps
      newEtape.duree = e.duree
      newEtape.dateDebut = e.dateDebut
      newEtape.dateFin = e.dateFin
      newEtape.surface = e.surface
      newEtape.titulaires = e.titulaires
      newEtape.amodiataires = e.amodiataires
      newEtape.substances = e.substances
      newEtape.groupes = e.groupes
      newEtape.geoSystemeIds = e.geoSystemeIds
      newEtape.geoSystemeOpposableId = e.geoSystemeOpposableId
    }
    // si on change le type d'étape (fondamentale -> fondamentale)
    // alors on garde les propriétés actuelles
    else if (state.current.heritageProps && e.heritageProps) {
      newEtape.heritageProps = state.current.heritageProps
      newEtape.duree = state.current.duree
      newEtape.dateDebut = state.current.dateDebut
      newEtape.dateFin = state.current.dateFin
      newEtape.surface = state.current.surface
      newEtape.titulaires = state.current.titulaires
      newEtape.amodiataires = state.current.amodiataires
      newEtape.substances = state.current.substances
      newEtape.groupes = state.current.groupes
      newEtape.geoSystemeIds = state.current.geoSystemeIds
      newEtape.geoSystemeOpposableId = state.current.geoSystemeOpposableId
    }

    if (e.heritageContenu && Object.keys(e.heritageContenu).length) {
      Object.keys(e.heritageContenu).forEach(sectionId => {
        if (Object.keys(e.heritageContenu[sectionId]).length) {
          Object.keys(e.heritageContenu[sectionId]).forEach(elementId => {
            if (!newEtape.contenu) {
              newEtape.contenu = {}
            }

            if (!newEtape.contenu[sectionId]) {
              newEtape.contenu[sectionId] = {}
            }

            if (
              state.current.heritageContenu &&
              state.current.heritageContenu[sectionId] &&
              state.current.heritageContenu[sectionId][elementId]
            ) {
              newEtape.contenu[sectionId][elementId] =
                state.current.contenu[sectionId][elementId]
              newEtape.heritageContenu[sectionId][elementId] =
                state.current.heritageContenu[sectionId][elementId]
            } else {
              if (e.contenu[sectionId]) {
                newEtape.contenu[sectionId][elementId] =
                  e.contenu[sectionId][elementId]
              }

              if (!newEtape.heritageContenu) {
                newEtape.heritageContenu = {}
              }

              if (!newEtape.heritageContenu[sectionId]) {
                newEtape.heritageContenu[sectionId] = {}
              }

              newEtape.heritageContenu[sectionId][elementId] =
                e.heritageContenu[sectionId][elementId]
            }
          })
        }
      })
    }

    Vue.set(state, 'current', newEtape)
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
