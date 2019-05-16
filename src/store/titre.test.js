import titre from './titre'
import * as api from '../api'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../router', () => [])

jest.mock('../api', () => ({
  titre: jest.fn(),
  titreUpdate: jest.fn(),
  titreRemove: jest.fn(),
  titreDemarcheUpdate: jest.fn(),
  titreDemarcheRemove: jest.fn(),
  titreEtapeUpdate: jest.fn(),
  titreEtapeRemove: jest.fn()
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

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(titreId)
    expect(store.state.titre.current).toEqual(titreInfo)
  })

  test("retourne une erreur si l'api retourne null", async () => {
    const apiMock = api.titre.mockResolvedValue(null)
    await store.dispatch('titre/get', titreId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(titreId)
    expect(store.state.titre.current).toEqual(null)
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si de l'api ne répond pas", async () => {
    const apiMock = api.titre.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titre/get', titreId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(titreId)
    expect(store.state.titre.current).toEqual(null)
    expect(actions.apiError).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalled()
  })

  test('recharge le titre affiché', async () => {
    store.state.titre.current = titreInfo
    api.titre.mockResolvedValue(titreInfo)
    await store.dispatch('titre/reload')

    expect(actions.messageAdd).toHaveBeenCalled()
    expect(console.log).not.toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur", async () => {
    store.state.titre.current = titreInfo
    const actionGet = jest.fn().mockRejectedValue(new Error("echec de l'api"))
    titre.actions.get = actionGet
    store = new Vuex.Store({ modules: { titre }, actions, mutations })
    await store.dispatch('titre/reload')

    expect(console.log).toHaveBeenCalled()
  })

  test('crée un titre', async () => {
    const creation = true
    const apiMock = api.titreUpdate.mockResolvedValue(titreInfo)
    await store.dispatch('titre/titreUpdate', { titre: titreInfo, creation })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ titre: titreInfo })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test('met à jour un titre', async () => {
    const creation = false
    const actionReload = jest.fn()
    titre.actions.reload = actionReload
    store = new Vuex.Store({ modules: { titre }, actions, mutations })
    const apiMock = api.titreUpdate.mockResolvedValue(titreInfo)
    await store.dispatch('titre/titreUpdate', { titre: titreInfo, creation })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ titre: titreInfo })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actionReload).toHaveBeenCalled()
  })

  test("retourne une erreur 404 si l'API retourne null lors de la mise à jour", async () => {
    const creation = true
    const apiMock = api.titreUpdate.mockResolvedValue(null)
    await store.dispatch('titre/titreUpdate', { titre: titreInfo, creation })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ titre: titreInfo })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la mise à jour", async () => {
    const creation = true
    const apiMock = api.titreUpdate.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/titreUpdate', { titre: titreInfo, creation })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ titre: titreInfo })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime un titre', async () => {
    const apiMock = api.titreRemove.mockResolvedValue(true)
    await store.dispatch('titre/titreRemove', titreId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: titreId })
  })

  test("retourne une erreur 404 si l'API retourne null lors de la suppression d'un titre", async () => {
    const apiMock = api.titreRemove.mockResolvedValue(null)
    await store.dispatch('titre/titreRemove', titreId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: titreId })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API si l'API retourne une erreur lors de la suppression d'un titre", async () => {
    const apiMock = api.titreRemove.mockRejectedValue(
      new Error("error de l'api")
    )
    await store.dispatch('titre/titreRemove', titreId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: titreId })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour une démarche', async () => {
    const apiMock = api.titreDemarcheUpdate.mockResolvedValue(demarcheInfo)
    await store.dispatch('titre/demarcheUpdate', demarcheInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ demarche: demarcheInfo })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur 404 lors de l'update d'une démarche", async () => {
    const apiMock = api.titreDemarcheUpdate.mockResolvedValue(null)
    await store.dispatch('titre/demarcheUpdate', demarcheInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ demarche: demarcheInfo })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur de l'api lors de l'update d'une démarche", async () => {
    const apiMock = api.titreDemarcheUpdate.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titre/demarcheUpdate', demarcheInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ demarche: demarcheInfo })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime une démarche', async () => {
    const apiMock = api.titreDemarcheRemove.mockResolvedValue(demarcheId)
    await store.dispatch('titre/demarcheRemove', demarcheId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: demarcheId })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur 404 lors de la suppression d'une démarche", async () => {
    const apiMock = api.titreDemarcheRemove.mockResolvedValue(null)
    await store.dispatch('titre/demarcheRemove', demarcheId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: demarcheId })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur de l'api lors de la suppression d'une démarche", async () => {
    const apiMock = api.titreDemarcheRemove.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titre/demarcheRemove', demarcheId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: demarcheId })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour une étape', async () => {
    const apiMock = api.titreEtapeUpdate.mockResolvedValue(etapeInfo)
    await store.dispatch('titre/etapeUpdate', etapeInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ etape: etapeInfo })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur 404 lors de l'update d'une étape", async () => {
    const apiMock = api.titreEtapeUpdate.mockResolvedValue(null)
    await store.dispatch('titre/etapeUpdate', etapeInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ etape: etapeInfo })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur de l'api lors de l'update d'une étape", async () => {
    const apiMock = api.titreEtapeUpdate.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titre/etapeUpdate', etapeInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ etape: etapeInfo })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime une étape', async () => {
    const apiMock = api.titreEtapeRemove.mockResolvedValue(etapeId)
    await store.dispatch('titre/etapeRemove', etapeId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: etapeId })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur 404 lors de la suppression d'une étape", async () => {
    const apiMock = api.titreEtapeRemove.mockResolvedValue(null)
    await store.dispatch('titre/etapeRemove', etapeId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: etapeId })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur de l'api lors de la suppression d'une étape", async () => {
    const apiMock = api.titreEtapeRemove.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titre/etapeRemove', etapeId)

    expect(apiMock).toHaveBeenCalled()
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
