import metasIndex from './metas-definitions'
import { oneData } from '../utils'

const state = {
  elements: [],
  definition: {}
}

const actions = {
  async get({ dispatch, commit }, id) {
    try {
      commit('loadingAdd', 'metaGet', { root: true })

      if (metasIndex[id]) {
        const definition = metasIndex[id]
        const res = await definition.get()
        let elements = null
        if (res) {
          if (id === 'definitions') elements = res['definitions']
          if (id === 'domaines') elements = res['domaines']
          if (id === 'titres-types-types') elements = res['types']
          if (id === 'titres-types') elements = res['titresTypes']
          if (id === 'titres-statuts') elements = res['statuts']
          if (id === 'titre-types--titres-statuts')
            elements = res['titresTypesTitresStatuts']
          if (id === 'demarches-types') elements = res['demarchesTypes']
          if (id === 'titres-types--demarches-types')
            elements = res['titresTypesDemarchesTypes']
          if (id === 'demarches-statuts') elements = res['demarchesStatuts']
          if (id === 'phases-statuts') elements = res['phasesStatuts']
          if (id === 'etapes-types') elements = res['etapesTypes']
          if (id === 'titres-types--demarches-types--etapes-types')
            elements = res['titresTypesDemarchesTypesEtapesTypes']
          if (id === 'etapes-statuts') elements = res['etapesStatuts']
          if (id === 'etapes-types--etapes-statuts')
            elements = res['etapesTypesEtapesStatuts']
          if (id === 'etapes-types--documents-types')
            elements = res['etapesTypesDocumentsTypes']
          if (id === 'etapes-types--justificatifs-types')
            elements = res['etapesTypesJustificatifsTypes']
          if (id === 'travaux-types') elements = res['travauxTypes']
          if (id === 'travaux-etapes-types')
            elements = res['travauxEtapesTypes']
          if (id === 'travaux-types--travaux-etapes-types')
            elements = res['travauxTypesTravauxEtapesTypes']
          if (id === 'travaux-etapes-types--documents-types')
            elements = res['travauxEtapesTypesDocumentsTypes']
          if (id === 'travaux-etapes-types--etapes-statuts')
            elements = res['travauxEtapesTypesEtapesStatuts']
          if (id === 'devises') elements = res['devises']
          if (id === 'unites') elements = res['unites']
          if (id === 'administrations-types')
            elements = res['administrationsTypes']
          if (id === 'permissions') elements = res['permissions']
          if (id === 'documents-types') elements = res['documentsTypes']
          if (id === 'references-types') elements = res['referencesTypes']
          if (id === 'geo-systemes') elements = res['geoSystemes']
          if (id === 'activites-types') elements = res['activitesTypes']
          if (id === 'activites-statuts') elements = res['activitesStatuts']
          if (id === 'activites-types--titres-types')
            elements = res['activitesTypesTitresTypes']
          if (id === 'activites-types--documents-types')
            elements = res['activitesTypesDocumentsTypes']
          if (id === 'activites-types--pays')
            elements = res['activitesTypesPays']
        }
        commit('set', {
          elements,
          definition
        })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'metaGet', { root: true })
    }
  },

  async update({ dispatch, commit }, { id, element }) {
    try {
      commit('loadingAdd', 'metaUpdate', { root: true })

      if (metasIndex[id]) {
        const definition = metasIndex[id]
        const res = await definition.update({ element })
        let elements = null
        if (res) {
          if (id === 'definitions') elements = res['definitionModifier']
          if (id === 'domaines') elements = res['domaineModifier']
          if (id === 'titres-types-types')
            elements = res['titreTypeTypeModifier']
          if (id === 'titres-types') elements = res['titreTypeModifier']
          if (id === 'titres-statuts') elements = res['titreStatutModifier']
          if (id === 'titre-types--titres-statuts')
            elements = res['titreTypeTitreStatutModifier']
          if (id === 'demarches-types') elements = res['demarcheTypeModifier']
          if (id === 'titres-types--demarches-types')
            elements = res['titreTypeDemarcheTypeModifier']
          if (id === 'demarches-statuts')
            elements = res['demarcheStatutModifier']
          if (id === 'phases-statuts') elements = res['phaseStatutModifier']
          if (id === 'etapes-types') elements = res['etapeTypeModifier']
          if (id === 'titres-types--demarches-types--etapes-types')
            elements = res['titreTypeDemarcheTypeEtapeTypeModifier']
          if (id === 'etapes-statuts') elements = res['etapeStatutModifier']
          if (id === 'etapes-types--etapes-statuts')
            elements = res['etapeTypeEtapeStatutModifier']
          if (id === 'etapes-types--documents-types')
            elements = res['etapeTypeDocumentTypeModifier']
          if (id === 'etapes-types--justificatifs-types')
            elements = res['etapeTypeJustificatifTypeModifier']
          if (id === 'travaux-types') elements = res['travauxTypeModifier']
          if (id === 'travaux-etapes-types')
            elements = res['travauxEtapeTypeModifier']
          if (id === 'travaux-types--travaux-etapes-types')
            elements = res['travauxTypeTravauxEtapeTypeModifier']
          if (id === 'travaux-etapes-types--documents-types')
            elements = res['travauxEtapeTypeDocumentTypeModifier']
          if (id === 'travaux-etapes-types--etapes-statuts')
            elements = res['travauxEtapeTypeEtapeStatutModifier']
          if (id === 'devises') elements = res['deviseModifier']
          if (id === 'unites') elements = res['uniteModifier']
          if (id === 'administrations-types')
            elements = res['administrationTypeModifier']
          if (id === 'permissions') elements = res['permissionModifier']
          if (id === 'documents-types') elements = res['documentTypeModifier']
          if (id === 'references-types') elements = res['referenceTypeModifier']
          if (id === 'geo-systemes') elements = res['geoSystemeModifier']
          if (id === 'activites-types') elements = res['activiteTypeModifier']
          if (id === 'activites-statuts')
            elements = res['activiteStatutModifier']
          if (id === 'activites-types--documents-types')
            elements = res['activiteTypeDocumentTypeModifier']
        }

        commit('set', {
          elements,
          definition
        })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'metaUpdate', { root: true })
    }
  },

  async create({ dispatch, commit }, { id, element }) {
    try {
      commit('loadingAdd', 'metaCreate', { root: true })

      if (metasIndex[id]) {
        const definition = metasIndex[id]
        const res = await definition.create({ element })
        let elements = null
        if (res) {
          if (id === 'titres-types') elements = res['titreTypeCreer']
          if (id === 'titre-types--titres-statuts')
            elements = res['titreTypeTitreStatutCreer']
          if (id === 'titres-types--demarches-types')
            elements = res['titreTypeDemarcheTypeCreer']
          if (id === 'titres-types--demarches-types--etapes-types')
            elements = res['titreTypeDemarcheTypeEtapeTypeCreer']
          if (id === 'etapes-types--etapes-statuts')
            elements = res['etapeTypeEtapeStatutCreer']
          if (id === 'etapes-types--documents-types')
            elements = res['etapeTypeDocumentTypeCreer']
          if (id === 'etapes-types--justificatifs-types')
            elements = res['etapeTypeJustificatifTypeCreer']
          if (id === 'travaux-types--travaux-etapes-types')
            elements = res['travauxTypeTravauxEtapeTypeCreer']
          if (id === 'travaux-etapes-types--documents-types')
            elements = res['travauxEtapeTypeDocumentTypeCreer']
          if (id === 'travaux-etapes-types--etapes-statuts')
            elements = res['travauxEtapeTypeEtapeStatutCreer']
          if (id === 'activites-types--titres-types')
            elements = res['activiteTypeTitreTypeCreer']
          if (id === 'activites-types--documents-types')
            elements = res['activiteTypeDocumentTypeCreer']
          if (id === 'activites-types--pays')
            elements = res['activiteTypePaysCreer']
        }

        commit('set', {
          elements,
          definition
        })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'metaCreate', { root: true })
    }
  },

  async delete({ dispatch, commit }, { id, element }) {
    commit('loadingAdd', 'metaDelete', { root: true })

    try {
      if (metasIndex[id]) {
        const definition = metasIndex[id]
        const res = await definition.delete({ element })
        console.log('res :>> ', res)
        let elements = null
        if (res) {
          if (id === 'titres-types') elements = res['titreTypeSupprimer']
          if (id === 'titre-types--titres-statuts')
            elements = res['titreTypeTitreStatutSupprimer']
          if (id === 'titres-types--demarches-types')
            elements = res['titreTypeDemarcheTypeSupprimer']
          if (id === 'titres-types--demarches-types--etapes-types')
            elements = res['titreTypeDemarcheTypeEtapeTypeSupprimer']
          if (id === 'etapes-types--etapes-statuts')
            elements = res['etapeTypeEtapeStatutSupprimer']
          if (id === 'etapes-types--documents-types')
            elements = res['etapeTypeDocumentTypeSupprimer']
          if (id === 'etapes-types--justificatifs-types')
            elements = res['etapeTypeJustificatifTypeSupprimer']
          if (id === 'travaux-types--travaux-etapes-types')
            elements = res['travauxTypeTravauxEtapeTypeSupprimer']
          if (id === 'travaux-etapes-types--documents-types')
            elements = res['travauxEtapeTypeDocumentTypeSupprimer']
          if (id === 'travaux-etapes-types--etapes-statuts')
            elements = res['travauxEtapeTypeEtapeStatutSupprimer']
          if (id === 'activites-types--titres-types')
            elements = res['activiteTypeTitreTypeSupprimer']
          if (id === 'activites-types--documents-types')
            elements = res['activiteTypeDocumentTypeSupprimer']
          if (id === 'activites-types--pays')
            elements = res['activiteTypePaysSupprimer']
        }

        commit('set', {
          elements,
          definition
        })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'metaDelete', { root: true })
    }
  }
}

const mutations = {
  reset(state) {
    state.elements = []
    state.elements = []
    state.definition = {}
  },

  set(state, { elements, definition }) {
    state.elements = elements
    state.definition = definition
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
