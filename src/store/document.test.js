import document from './document'
import * as api from '../api/documents'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/documents', () => ({
  metasDocument: jest.fn(),
  documentCreer: jest.fn(),
  documentModifier: jest.fn(),
  documentSupprimer: jest.fn()
}))

console.info = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)

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

    store = new Vuex.Store({ actions, mutations, modules: { document } })
  })

  test('récupère les métas pour éditer un document', async () => {
    const apiMock = api.metasDocument.mockResolvedValueOnce({
      documentsTypes: [
        { id: 'arr', nom: 'Arrêté' },
        { id: 'avi', nom: 'Avis' }
      ]
    })

    await store.dispatch('document/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.document.metas.documentsTypes).toEqual([
      { id: 'arr', nom: 'Arrêté' },
      { id: 'avi', nom: 'Avis' }
    ])
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasDocument.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('document/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour un document', async () => {
    api.documentCreer.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('document/add', { id: 14, nom: 'champs' })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création d'un document", async () => {
    api.documentCreer.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('document/add', { id: 14, nom: 'champs' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour un document', async () => {
    api.documentModifier.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('document/update', { id: 14, nom: 'champs' })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la mise à jour d'un document", async () => {
    api.documentModifier.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('document/update', { id: 14, nom: 'champs' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime un document', async () => {
    const apiMock = api.documentSupprimer.mockResolvedValue(true)
    await store.dispatch('document/remove', { id: 62 })

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
