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
  titreEtapeDelete: jest.fn(),
  titreDocumentCreate: jest.fn(),
  titreDocumentUpdate: jest.fn(),
  titreDocumentDelete: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe('état du titre sélectionné', () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
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
    const apiMock = api.titre.mockResolvedValue({ id: 83, nom: 'marne' })
    await store.dispatch('titre/get', 83)

    expect(apiMock).toHaveBeenCalledWith(83)
    expect(store.state.titre.current).toEqual({ id: 83, nom: 'marne' })
  })

  test("retourne une erreur si l'api retourne null lors d'une requête sur un titre", async () => {
    const apiMock = api.titre.mockResolvedValue(null)
    await store.dispatch('titre/get', 83)

    expect(apiMock).toHaveBeenCalledWith(83)
    expect(store.state.titre.current).toEqual(null)
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si de l'api ne répond pas lors d'une requête sur un titre", async () => {
    api.titre.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titre/get', 83)

    expect(store.state.titre.current).toEqual(null)
    expect(actions.apiError).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalled()
  })

  test('recharge le titre affiché', async () => {
    store.state.titre.current = { id: 83, nom: 'marne' }
    await store.dispatch('titre/reload', { id: 'id-test', idOld: 'id-tost' })

    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("ne recharge pas le titre affiché si l'id n'a pas changé", async () => {
    store.state.titre.current = { id: 83, nom: 'marne' }
    await store.dispatch('titre/reload', { id: 'id-test', idOld: 'id-test' })

    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test('crée un titre', async () => {
    api.titreCreate.mockResolvedValue({ id: 83, nom: 'marne' })
    await store.dispatch('titre/titreCreate', { id: 83, nom: 'marne' })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne null lors de la création d'un titre", async () => {
    api.titreCreate.mockResolvedValue(null)
    await store.dispatch('titre/titreCreate', { id: 83, nom: 'marne' })

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création dun titre", async () => {
    api.titreCreate.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/titreCreate', { id: 83, nom: 'marne' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour un titre', async () => {
    const actionReload = jest.fn()
    titre.actions.reload = actionReload
    store = new Vuex.Store({ modules: { titre }, actions, mutations })
    api.titreUpdate.mockResolvedValue({ id: 83, nom: 'marne' })
    await store.dispatch('titre/titreUpdate', { id: 83, nom: 'marne' })

    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actionReload).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne null lors de la mise à jour d'un titre", async () => {
    api.titreUpdate.mockResolvedValue(null)
    await store.dispatch('titre/titreUpdate', { id: 83, nom: 'marne' })

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la mise à jour d'un titre", async () => {
    api.titreUpdate.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/titreUpdate', { id: 83, nom: 'marne' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime un titre', async () => {
    const apiMock = api.titreDelete.mockResolvedValue(true)
    await store.dispatch('titre/titreDelete', 83)

    expect(apiMock).toHaveBeenCalledWith({ id: 83 })
  })

  test("retourne une erreur si l'API retourne null lors de la suppression d'un titre", async () => {
    const apiMock = api.titreDelete.mockResolvedValue(null)
    await store.dispatch('titre/titreDelete', 83)

    expect(apiMock).toHaveBeenCalledWith({ id: 83 })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la suppression d'un titre", async () => {
    const apiMock = api.titreDelete.mockRejectedValue(
      new Error("error de l'api")
    )
    await store.dispatch('titre/titreDelete', 83)

    expect(apiMock).toHaveBeenCalledWith({ id: 83 })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('crée une démarche', async () => {
    api.titreDemarcheCreate.mockResolvedValue({ id: 52, nom: 'val' })
    await store.dispatch('titre/demarcheCreate', { id: 52, nom: 'val' })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une null lors de la création d'une démarche", async () => {
    api.titreDemarcheCreate.mockResolvedValue(null)
    await store.dispatch('titre/demarcheCreate', { id: 52, nom: 'val' })

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création d'une démarche", async () => {
    api.titreDemarcheCreate.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/demarcheCreate', { id: 52, nom: 'val' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour une démarche', async () => {
    api.titreDemarcheUpdate.mockResolvedValue({ id: 52, nom: 'val' })
    await store.dispatch('titre/demarcheUpdate', { id: 52, nom: 'val' })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une null lors de la mise à jour d'une démarche", async () => {
    api.titreDemarcheUpdate.mockResolvedValue(null)
    await store.dispatch('titre/demarcheUpdate', { id: 52, nom: 'val' })

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la mise à jour d'une démarche", async () => {
    api.titreDemarcheUpdate.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titre/demarcheUpdate', { id: 52, nom: 'val' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime une démarche', async () => {
    api.titreDemarcheDelete.mockResolvedValue(52)
    await store.dispatch('titre/demarcheDelete', 52)

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une null lors de la suppression d'une démarche", async () => {
    api.titreDemarcheDelete.mockResolvedValue(null)
    await store.dispatch('titre/demarcheDelete', 52)

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la suppression d'une démarche", async () => {
    api.titreDemarcheDelete.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titre/demarcheDelete', 52)

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour une étape', async () => {
    api.titreEtapeCreate.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('titre/etapeCreate', { id: 14, nom: 'champs' })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une null lors de la création d'une étape", async () => {
    api.titreEtapeCreate.mockResolvedValue(null)
    await store.dispatch('titre/etapeCreate', { id: 14, nom: 'champs' })

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création d'une étape", async () => {
    api.titreEtapeCreate.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/etapeCreate', { id: 14, nom: 'champs' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour une étape', async () => {
    api.titreEtapeUpdate.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('titre/etapeUpdate', { id: 14, nom: 'champs' })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une null lors de la mise à jour d'une étape", async () => {
    api.titreEtapeUpdate.mockResolvedValue(null)
    await store.dispatch('titre/etapeUpdate', { id: 14, nom: 'champs' })

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la mise à jour d'une étape", async () => {
    api.titreEtapeUpdate.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titre/etapeUpdate', { id: 14, nom: 'champs' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime une étape', async () => {
    const apiMock = api.titreEtapeDelete.mockResolvedValue(14)
    await store.dispatch('titre/etapeDelete', 14)

    expect(apiMock).toHaveBeenCalledWith({ id: 14 })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une null lors de la suppression d'une étape", async () => {
    const apiMock = api.titreEtapeDelete.mockResolvedValue(null)
    await store.dispatch('titre/etapeDelete', 14)

    expect(apiMock).toHaveBeenCalledWith({ id: 14 })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la suppression d'une étape", async () => {
    const apiMock = api.titreEtapeDelete.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titre/etapeDelete', 14)

    expect(apiMock).toHaveBeenCalledWith({ id: 14 })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour un document', async () => {
    api.titreDocumentCreate.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('titre/documentCreate', { id: 14, nom: 'champs' })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une null lors de la création d'un document", async () => {
    api.titreDocumentCreate.mockResolvedValue(null)
    await store.dispatch('titre/documentCreate', { id: 14, nom: 'champs' })

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création d'un document", async () => {
    api.titreDocumentCreate.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/documentCreate', { id: 14, nom: 'champs' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour un document', async () => {
    api.titreDocumentUpdate.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('titre/documentUpdate', { id: 14, nom: 'champs' })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une null lors de la mise à jour d'un document", async () => {
    api.titreDocumentUpdate.mockResolvedValue(null)
    await store.dispatch('titre/documentUpdate', { id: 14, nom: 'champs' })

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la mise à jour d'un document", async () => {
    api.titreDocumentUpdate.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titre/documentUpdate', { id: 14, nom: 'champs' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime un document', async () => {
    const apiMock = api.titreDocumentDelete.mockResolvedValue(62)
    await store.dispatch('titre/documentDelete', 62)

    expect(apiMock).toHaveBeenCalledWith({ id: 62 })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une null lors de la suppression d'un document", async () => {
    const apiMock = api.titreDocumentDelete.mockResolvedValue(null)
    await store.dispatch('titre/documentDelete', 62)

    expect(apiMock).toHaveBeenCalledWith({ id: 62 })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la suppression d'un document", async () => {
    const apiMock = api.titreDocumentDelete.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titre/documentDelete', 62)

    expect(apiMock).toHaveBeenCalledWith({ id: 62 })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime le titre courant', () => {
    store.commit('titre/set', 83)
    store.commit('titre/reset')

    expect(store.state.titre.current).toBeNull()
  })
})
