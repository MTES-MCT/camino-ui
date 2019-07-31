import titre from './titre'
import * as api from '../api'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../router', () => ({
  push: () => {},
  replace: () => {}
}))

jest.mock('../api', () => ({
  titre: jest.fn(),
  titreCreate: jest.fn(),
  titreUpdate: jest.fn(),
  titreDelete: jest.fn(),
  titreDemarcheCreate: jest.fn(),
  titreDemarcheUpdate: jest.fn(),
  titreDemarcheDelete: jest.fn(),
  titreEtapeCreate: jest.fn(),
  titreEtapeUpdate: jest.fn(),
  titreEtapeDelete: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe('état du titre sélectionné', () => {
  let store
  let titreId
  let documentId
  let actions
  let mutations
  let titreInfo
  let demarcheId
  let demarcheInfo
  let etapeId
  let etapeInfo

  beforeEach(() => {
    titreInfo = { id: 83, nom: 'marne' }
    titreId = 83
    demarcheInfo = { id: 52, nom: 'val' }
    demarcheId = 52
    etapeInfo = { id: 14, nom: 'champs' }
    etapeId = 14
    documentId = 62
    titre.state = {
      current: null,
      documents: []
    }
    actions = {
      pageError: jest.fn(),
      apiError: jest.fn(),
      messageAdd: jest.fn()
    }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupLoad: jest.fn(),
      popupMessagesRemove: jest.fn(),
      popupClose: jest.fn(),
      popupMessageAdd: jest.fn()
    }
    store = new Vuex.Store({
      modules: { titre },
      actions,
      mutations
    })
  })

  test('obtient le titre en cours', async () => {
    const apiMock = api.titre.mockResolvedValue(titreInfo)
    await store.dispatch('titre/get', titreId)

    expect(apiMock).toHaveBeenCalledWith(titreId)
    expect(store.state.titre.current).toEqual(titreInfo)
  })

  test("retourne une erreur si l'api retourne null lors d'une requête sur un titre", async () => {
    const apiMock = api.titre.mockResolvedValue(null)
    await store.dispatch('titre/get', titreId)

    expect(apiMock).toHaveBeenCalledWith(titreId)
    expect(store.state.titre.current).toEqual(null)
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si de l'api ne répond pas lors d'une requête sur un titre", async () => {
    api.titre.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titre/get', titreId)

    expect(store.state.titre.current).toEqual(null)
    expect(actions.apiError).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalled()
  })

  test('recharge le titre affiché', async () => {
    store.state.titre.current = titreInfo
    api.titre.mockResolvedValue(titreInfo)
    await store.dispatch('titre/reload', titreInfo.id)

    expect(actions.messageAdd).toHaveBeenCalled()
    expect(console.log).not.toHaveBeenCalled()
  })

  test('crée un titre', async () => {
    api.titreCreate.mockResolvedValue(titreInfo)
    await store.dispatch('titre/titreCreate', titreInfo)

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur 404 si l'API retourne null lors de la création d'un titre", async () => {
    api.titreCreate.mockResolvedValue(null)
    await store.dispatch('titre/titreCreate', titreInfo)

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création dun titre", async () => {
    api.titreCreate.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/titreCreate', titreInfo)

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour un titre', async () => {
    const actionReload = jest.fn()
    titre.actions.reload = actionReload
    store = new Vuex.Store({ modules: { titre }, actions, mutations })
    api.titreUpdate.mockResolvedValue(titreInfo)
    await store.dispatch('titre/titreUpdate', titreInfo)

    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actionReload).toHaveBeenCalled()
  })

  test("retourne une erreur 404 si l'API retourne null lors de la mise à jour d'un titre", async () => {
    api.titreUpdate.mockResolvedValue(null)
    await store.dispatch('titre/titreUpdate', titreInfo)

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la mise à jour d'un titre", async () => {
    api.titreUpdate.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/titreUpdate', titreInfo)

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime un titre', async () => {
    const apiMock = api.titreDelete.mockResolvedValue(true)
    await store.dispatch('titre/titreDelete', titreId)

    expect(apiMock).toHaveBeenCalledWith({ id: titreId })
  })

  test("retourne une erreur 404 si l'API retourne null lors de la suppression d'un titre", async () => {
    const apiMock = api.titreDelete.mockResolvedValue(null)
    await store.dispatch('titre/titreDelete', titreId)

    expect(apiMock).toHaveBeenCalledWith({ id: titreId })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API si l'API retourne une erreur lors de la suppression d'un titre", async () => {
    const apiMock = api.titreDelete.mockRejectedValue(
      new Error("error de l'api")
    )
    await store.dispatch('titre/titreDelete', titreId)

    expect(apiMock).toHaveBeenCalledWith({ id: titreId })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('crée une démarche', async () => {
    api.titreDemarcheCreate.mockResolvedValue(demarcheInfo)
    await store.dispatch('titre/demarcheCreate', demarcheInfo)

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur 404 lors de la création d'une démarche", async () => {
    api.titreDemarcheCreate.mockResolvedValue(null)
    await store.dispatch('titre/demarcheCreate', demarcheInfo)

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création d'une démarche", async () => {
    api.titreDemarcheCreate.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/demarcheCreate', demarcheInfo)

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour une démarche', async () => {
    api.titreDemarcheUpdate.mockResolvedValue(demarcheInfo)
    await store.dispatch('titre/demarcheUpdate', demarcheInfo)

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur 404 lors de la mise à jour d'une démarche", async () => {
    api.titreDemarcheUpdate.mockResolvedValue(null)
    await store.dispatch('titre/demarcheUpdate', demarcheInfo)

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur de l'api lors de la mise à jour d'une démarche", async () => {
    api.titreDemarcheUpdate.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titre/demarcheUpdate', demarcheInfo)

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime une démarche', async () => {
    api.titreDemarcheDelete.mockResolvedValue(demarcheId)
    await store.dispatch('titre/demarcheDelete', demarcheId)

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur 404 lors de la suppression d'une démarche", async () => {
    api.titreDemarcheDelete.mockResolvedValue(null)
    await store.dispatch('titre/demarcheDelete', demarcheId)

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur de l'api lors de la suppression d'une démarche", async () => {
    api.titreDemarcheDelete.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titre/demarcheDelete', demarcheId)

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour une étape', async () => {
    api.titreEtapeCreate.mockResolvedValue(etapeInfo)
    await store.dispatch('titre/etapeCreate', etapeInfo)

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur 404 lors de la création d'une étape", async () => {
    api.titreEtapeCreate.mockResolvedValue(null)
    await store.dispatch('titre/etapeCreate', etapeInfo)

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création d'une étape", async () => {
    api.titreEtapeCreate.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/etapeCreate', etapeInfo)

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour une étape', async () => {
    api.titreEtapeUpdate.mockResolvedValue(etapeInfo)
    await store.dispatch('titre/etapeUpdate', etapeInfo)

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur 404 lors de la mise à jour d'une étape", async () => {
    api.titreEtapeUpdate.mockResolvedValue(null)
    await store.dispatch('titre/etapeUpdate', etapeInfo)

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur de l'api lors de la mise à jour d'une étape", async () => {
    api.titreEtapeUpdate.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titre/etapeUpdate', etapeInfo)

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime une étape', async () => {
    const apiMock = api.titreEtapeDelete.mockResolvedValue(etapeId)
    await store.dispatch('titre/etapeDelete', etapeId)

    expect(apiMock).toHaveBeenCalledWith({ id: etapeId })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur 404 lors de la suppression d'une étape", async () => {
    const apiMock = api.titreEtapeDelete.mockResolvedValue(null)
    await store.dispatch('titre/etapeDelete', etapeId)

    expect(apiMock).toHaveBeenCalledWith({ id: etapeId })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur de l'api lors de la suppression d'une étape", async () => {
    const apiMock = api.titreEtapeDelete.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titre/etapeDelete', etapeId)

    expect(apiMock).toHaveBeenCalledWith({ id: etapeId })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('ajoute un document', () => {
    const selected = true
    store.dispatch('titre/documentSelect', { documentId, selected })

    expect(store.state.titre.documents).toEqual([documentId])
  })

  test('supprime le document', () => {
    const selected = false
    store.commit('titre/documentSelectionAdd', documentId)
    expect(store.state.titre.documents).toEqual([documentId])
    store.dispatch('titre/documentSelect', { documentId, selected })

    expect(store.state.titre.documents).toEqual([])
  })

  test("met à 0 l'utilisateur courant", () => {
    store.commit('titre/set', titreId)
    store.commit('titre/reset')

    expect(store.state.titre.current).toBeNull()
  })

  test("vérifie que le document n'existe pas ", () => {
    expect(store.getters['titre/documentsTotal']).toEqual(0)
  })

  test('obtient le nombre exacts de documents', () => {
    titre.state = {
      current: {
        démarches: {
          m: [{ documents: [1, 2, 3] }],
          h: [{ documents: '' }],
          w: []
        }
      },
      documents: []
    }
    const store = new Vuex.Store({ modules: { titre } })

    expect(store.getters['titre/documentsTotal']).toEqual(3)
  })

  test('sélectionne des documents', () => {
    store.commit('titre/documentSelectionAdd', 12)

    expect(store.getters['titre/documentSelected'](12)).toBeDefined()
  })
})
