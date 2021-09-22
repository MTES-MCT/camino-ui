import document from './document'
import * as api from '../api/documents'
import { createApp } from 'vue'
import { createStore } from 'vuex'

jest.mock('../api/documents', () => ({
  documentMetas: jest.fn(),
  documentCreer: jest.fn(),
  documentModifier: jest.fn(),
  documentSupprimer: jest.fn()
}))

jest.mock('../api/_client')

jest.useFakeTimers()

console.info = jest.fn()

describe('documents', () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    document.state = {
      metas: { documentsTypes: [] },
      preferences: { types: [] }
    }

    actions = {
      pageError: jest.fn(),
      apiError: jest.fn(),
      reload: jest.fn(),
      messageAdd: jest.fn(),
      test: jest.fn()
    }

    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      apiError: jest.fn(),
      popupLoad: jest.fn(),
      popupMessagesRemove: jest.fn(),
      popupClose: jest.fn(),
      popupMessageAdd: jest.fn(),
      fileLoad: jest.fn()
    }

    store = createStore({
      actions,
      mutations,
      modules: {
        document,
        titre: {
          namespaced: true,
          mutations: { open: jest.fn() }
        }
      }
    })

    const app = createApp({})
    app.use(store)
  })

  test('récupère les métas pour éditer un document', async () => {
    const apiMock = api.documentMetas.mockResolvedValueOnce({
      documentsTypes: [
        { id: 'arr', nom: 'Arrêté' },
        { id: 'avi', nom: 'Avis' }
      ]
    })

    await store.dispatch('document/init')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.document.metas.documentsTypes).toEqual([
      { id: 'arr', nom: 'Arrêté' },
      { id: 'avi', nom: 'Avis' }
    ])
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.documentMetas.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('document/init')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('ajoute un document', async () => {
    api.documentCreer.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('document/upsert', {
      document: { id: 14, nom: 'champs' },
      route: { name: 'titre', id: 'titre-id', section: 'etapes' }
    })

    expect(mutations.popupClose).toHaveBeenCalled()

    await store.dispatch('document/upsert', {
      document: { id: 14, nom: 'champs' },
      route: { name: 'titre', id: 'titre-id', section: 'travaux' }
    })

    expect(mutations.popupClose).toHaveBeenCalled()

    await store.dispatch('document/upsert', {
      document: { id: 14, nom: 'champs' }
    })

    expect(mutations.popupClose).toHaveBeenCalled()

    await store.dispatch('document/upsert', {
      document: { id: 14, nom: 'champs' },
      route: 'something'
    })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de l'ajout d'un document", async () => {
    api.documentCreer.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('document/upsert', {
      document: { nom: 'champs' }
    })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour un document', async () => {
    api.documentModifier.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('document/upsert', {
      document: { id: 14, nom: 'champs' },
      route: { name: 'titre', id: 'titre-id' }
    })
    jest.runAllTimers()

    expect(mutations.popupClose).toHaveBeenCalled()
    await store.dispatch('document/upsert', {
      document: { id: 14, nom: 'champs' }
    })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test('ajoute un nouveau document si c’est un document temporaire', async () => {
    const apiMock = api.documentCreer.mockResolvedValue({
      id: 14,
      nom: 'champs'
    })
    await store.dispatch('document/upsert', {
      document: { id: 14, nom: 'champs', typeId: 14 },
      route: { name: 'titre', id: 'titre-id' }
    })

    expect(apiMock).toHaveBeenCalledWith({
      document: { nom: 'champs', typeId: 14 }
    })
  })

  test('applique une action au lieu d’être redirigé', async () => {
    await store.dispatch('document/upsert', {
      document: { id: 14, nom: 'champs', typeId: 14 },
      action: { name: 'test' }
    })

    expect(actions.test).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la mise à jour d'un document", async () => {
    api.documentModifier.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('document/upsert', {
      document: { id: 14, nom: 'champs' }
    })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime un document', async () => {
    const apiMock = api.documentSupprimer.mockResolvedValue(true)
    await store.dispatch('document/remove', {
      id: 62,
      route: { name: 'titre', id: 'titre-id' }
    })

    expect(apiMock).toHaveBeenCalledWith({ id: 62 })
    expect(mutations.popupClose).toHaveBeenCalled()
    await store.dispatch('document/remove', {
      id: 62
    })

    expect(apiMock).toHaveBeenCalledWith({ id: 62 })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la suppression d'un document", async () => {
    const apiMock = api.documentSupprimer.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('document/remove', { id: 62 })

    expect(apiMock).toHaveBeenCalledWith({ id: 62 })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })
})
