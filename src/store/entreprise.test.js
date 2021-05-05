import { createApp } from 'vue'
import { createStore } from 'vuex'
import * as api from '../api/entreprises'
import entreprise from './entreprise'

jest.mock('../router', () => ({
  push: () => {},
  replace: () => {}
}))

jest.mock('../api/entreprises', () => ({
  entreprise: jest.fn(),
  entrepriseCreer: jest.fn(),
  entrepriseModifier: jest.fn(),
  entreprisePermissionsMetas: jest.fn(),
  entrepriseTitreTypeUpdate: jest.fn()
}))

console.info = jest.fn()

describe("état de l'entreprise sélectionnée", () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    entreprise.state = {
      element: null,
      metas: {
        domaines: []
      }
    }
    actions = {
      pageError: jest.fn(),
      apiError: jest.fn(),
      reload: jest.fn(),
      messageAdd: jest.fn()
    }

    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupLoad: jest.fn(),
      popupMessagesRemove: jest.fn(),
      popupClose: jest.fn(),
      popupMessageAdd: jest.fn(),
      messageAdd: jest.fn()
    }

    store = createStore({
      modules: { entreprise },
      mutations,
      actions
    })

    const app = createApp({})
    app.use(store)
  })

  test('obtient une entreprise', async () => {
    const apiMock = api.entreprise.mockResolvedValue({ id: 71, nom: 'toto' })
    await store.dispatch('entreprise/get', 71)

    expect(apiMock).toHaveBeenCalledWith({ id: 71 })
    expect(store.state.entreprise.element).toEqual({ id: 71, nom: 'toto' })
  })

  test("affiche une page d'erreur si l'id de l'entreprise retourne null", async () => {
    const apiMock = api.entreprise.mockResolvedValue(null)
    await store.dispatch('entreprise/get', 71)

    expect(apiMock).toHaveBeenCalledWith({ id: 71 })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur de l'api dans l'obtention de l'entreprise", async () => {
    const apiMock = api.entreprise.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('entreprise/get', 71)

    expect(apiMock).toHaveBeenCalledWith({ id: 71 })

    expect(actions.apiError).toHaveBeenCalled()
  })

  test("supprime les données d'entreprise", () => {
    store.commit('entreprise/set', { id: 71, nom: 'toto' })
    store.commit('entreprise/reset')

    expect(store.state.entreprise.element).toBeNull()
  })

  test('ajoute une entreprise', async () => {
    const apiMock = api.entrepriseCreer.mockResolvedValue({
      id: 71,
      nom: 'toto'
    })

    await store.dispatch('entreprise/add', {
      legalSiren: '123456789',
      paysId: 'fr'
    })

    expect(apiMock).toHaveBeenCalledWith({
      entreprise: {
        legalSiren: '123456789',
        paysId: 'fr'
      }
    })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de l'ajout d'une entreprise", async () => {
    const apiMock = api.entrepriseCreer.mockRejectedValue(
      new Error('erreur api')
    )
    await store.dispatch('entreprise/add', {
      legalSiren: '123456789',
      paysId: 'fr'
    })

    expect(apiMock).toHaveBeenCalledWith({
      entreprise: {
        legalSiren: '123456789',
        paysId: 'fr'
      }
    })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('modifie une entreprise', async () => {
    const apiMock = api.entrepriseModifier.mockResolvedValue({
      id: 71,
      nom: 'toto'
    })

    await store.dispatch('entreprise/update', {
      legalSiren: '123456789',
      paysId: 'fr'
    })

    expect(apiMock).toHaveBeenCalledWith({
      entreprise: {
        legalSiren: '123456789',
        paysId: 'fr'
      }
    })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la modification d'une entreprise", async () => {
    const apiMock = api.entrepriseModifier.mockRejectedValue(
      new Error('erreur api')
    )
    await store.dispatch('entreprise/update', {
      legalSiren: '123456789',
      paysId: 'fr'
    })

    expect(apiMock).toHaveBeenCalledWith({
      entreprise: {
        legalSiren: '123456789',
        paysId: 'fr'
      }
    })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('récupère les métas pour éditer les permissions', async () => {
    const apiMock = api.entreprisePermissionsMetas.mockResolvedValue([
      { id: 'm', nom: 'minéraux et métaux' }
    ])

    await store.dispatch('entreprise/permissionsInit')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.entreprise.metas).toEqual({
      domaines: [{ id: 'm', nom: 'minéraux et métaux' }]
    })

    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la récupération des métas", async () => {
    const apiMock = api.entreprisePermissionsMetas.mockRejectedValue(
      new Error('erreur api')
    )

    await store.dispatch('entreprise/permissionsInit')

    expect(apiMock).toHaveBeenCalled()

    expect(mutations.messageAdd).toHaveBeenCalled()
  })

  test('modifie les permissions (type de titres)', async () => {
    const apiMock = api.entrepriseTitreTypeUpdate.mockResolvedValue({
      id: 71,
      nom: 'nom admin'
    })

    await store.dispatch('entreprise/titreTypeUpdate', {
      entrepriseId: 'entreprise-id',
      titreTypeId: 'aex',
      titresCreation: true
    })

    expect(apiMock).toHaveBeenCalledWith({
      entrepriseTitreType: {
        entrepriseId: 'entreprise-id',
        titreTypeId: 'aex',
        titresCreation: true
      }
    })

    expect(actions.reload).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la modification des permissions (type de titre)", async () => {
    const apiMock = api.entrepriseTitreTypeUpdate.mockRejectedValue(
      new Error('erreur api')
    )

    await store.dispatch('entreprise/titreTypeUpdate', {
      entrepriseId: 'entreprise-id',
      titreTypeId: 'aex',
      titresCreation: true
    })

    expect(apiMock).toHaveBeenCalledWith({
      entrepriseTitreType: {
        entrepriseId: 'entreprise-id',
        titreTypeId: 'aex',
        titresCreation: true
      }
    })

    expect(actions.reload).not.toHaveBeenCalled()
    expect(mutations.messageAdd).toHaveBeenCalled()
  })
})
