import titreDemarche from './titre-demarche'
import * as api from '../api/titres-demarches'
import { createApp } from 'vue'
import { createStore } from 'vuex'

jest.mock('../api/titres-demarches', () => ({
  demarcheMetas: jest.fn(),
  demarcheCreer: jest.fn(),
  demarcheModifier: jest.fn(),
  demarcheSupprimer: jest.fn()
}))

console.info = jest.fn()

describe('démarche', () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    titreDemarche.state = {
      metas: {
        types: []
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
      apiError: jest.fn(),
      popupLoad: jest.fn(),
      popupMessagesRemove: jest.fn(),
      popupClose: jest.fn(),
      popupMessageAdd: jest.fn()
    }

    store = createStore({ actions, mutations, modules: { titreDemarche } })

    const app = createApp({})
    app.use(store)
  })

  test('récupère les métas pour éditer une démarche', async () => {
    const apiMock = api.demarcheMetas.mockReturnValueOnce({
      demarchesTypes: [
        { id: 'w', nom: 'granulats' },
        { id: 'c', nom: 'carrières' }
      ]
    })

    await store.dispatch('titreDemarche/init', { etape: {} })

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titreDemarche.metas.types).toEqual([
      { id: 'w', nom: 'granulats' },
      { id: 'c', nom: 'carrières' }
    ])
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.demarcheMetas.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titreDemarche/init', { etape: {} })

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('crée une démarche', async () => {
    api.demarcheCreer.mockResolvedValue({ id: 52, nom: 'val' })
    await store.dispatch('titreDemarche/add', { id: 52, nom: 'val' })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création d'une démarche", async () => {
    api.demarcheCreer.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titreDemarche/add', { id: 52, nom: 'val' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour une démarche', async () => {
    api.demarcheModifier.mockResolvedValue({ id: 52, nom: 'val' })
    await store.dispatch('titreDemarche/update', { id: 52, nom: 'val' })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la mise à jour d'une démarche", async () => {
    api.demarcheModifier.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titreDemarche/update', { id: 52, nom: 'val' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime une démarche', async () => {
    api.demarcheSupprimer.mockResolvedValue(52)
    await store.dispatch('titreDemarche/remove', 52)

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la suppression d'une démarche", async () => {
    api.demarcheSupprimer.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titreDemarche/remove', 52)

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })
})
