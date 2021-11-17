import document from './document'
import * as api from '../api/documents'
import * as upload from '../api/_upload'
import { createApp } from 'vue'
import { createStore } from 'vuex'

jest.mock('../api/documents', () => ({
  documentMetas: jest.fn(),
  documentCreer: jest.fn(),
  documentModifier: jest.fn(),
  documentSupprimer: jest.fn()
}))

jest.mock('../api/_upload', () => ({
  uploadCall: jest.fn()
}))

console.info = jest.fn()

describe('documents', () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    jest.resetAllMocks()

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
    let document = {
      nom: 'champs',
      typeId: 1,
      fichier: true,
      fichierNouveau: new Blob(),
      nomTemporaire: null
    }
    const apiMock = api.documentCreer.mockResolvedValue({
      nom: 'champs'
    })

    await store.dispatch('document/upsert', {
      document,
      route: { name: 'titre', id: 'titre-id', section: 'etapes' }
    })
    expect(upload.uploadCall).toHaveBeenCalled()
    const sentDocument = { ...document }
    delete sentDocument.fichierNouveau
    expect(apiMock).toHaveBeenCalledWith({ document: sentDocument })

    jest.resetAllMocks()

    await store.dispatch('document/upsert', {
      document,
      route: 'something'
    })
    expect(upload.uploadCall).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ document: sentDocument })

    jest.resetAllMocks()

    document = {
      nom: 'champs',
      typeId: 1,
      fichier: true,
      nomTemporaire: null
    }
    await store.dispatch('document/upsert', {
      document,
      route: { name: 'titre', id: 'titre-id', section: 'travaux' }
    })
    expect(upload.uploadCall).not.toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ document })
  })

  test("retourne une erreur si l'API retourne une erreur lors de l'ajout d'un document", async () => {
    api.documentCreer.mockRejectedValueOnce(() => new Error('erreur api'))
    await store.dispatch('document/upsert', {
      document: { nom: 'champs', fichierNouveau: new Blob() }
    })

    expect(upload.uploadCall).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour un document', async () => {
    let document = {
      nom: 'champs',
      id: 14,
      typeId: 1,
      fichier: true,
      fichierNouveau: new Blob(),
      nomTemporaire: null
    }
    const apiMock = api.documentModifier.mockResolvedValue({
      id: 14,
      nom: 'champs'
    })

    await store.dispatch('document/upsert', {
      document,
      route: { name: 'titre', id: 'titre-id', section: 'etapes' }
    })
    expect(upload.uploadCall).toHaveBeenCalled()
    let sentDocument = { ...document }
    delete sentDocument.fichierNouveau
    delete sentDocument.typeId
    expect(apiMock).toHaveBeenCalledWith({ document: sentDocument })

    jest.resetAllMocks()

    await store.dispatch('document/upsert', {
      document,
      route: 'something'
    })
    expect(upload.uploadCall).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ document: sentDocument })

    jest.resetAllMocks()

    document = {
      nom: 'champs',
      id: 14,
      typeId: 1,
      fichier: true,
      nomTemporaire: null
    }
    await store.dispatch('document/upsert', {
      document,
      route: { name: 'titre', id: 'titre-id', section: 'travaux' }
    })
    expect(upload.uploadCall).not.toHaveBeenCalled()
    sentDocument = { ...document }
    delete sentDocument.typeId
    expect(apiMock).toHaveBeenCalledWith({ document: sentDocument })
  })

  test('ajoute un nouveau document si c’est un document temporaire', async () => {
    const document = {
      nom: 'champs',
      typeId: 1,
      fichier: true,
      fichierNouveau: new Blob(),
      nomTemporaire: null
    }
    const apiMock = api.documentCreer.mockResolvedValue({
      id: 14,
      nom: 'champs'
    })

    await store.dispatch('document/upsert', {
      document,
      route: { name: 'titre', id: 'titre-id' }
    })
    expect(upload.uploadCall).toHaveBeenCalled()
    const sentDocument = { ...document }
    delete sentDocument.fichierNouveau
    expect(apiMock).toHaveBeenCalledWith({ document: sentDocument })
  })

  test('applique une action au lieu d’être redirigé', async () => {
    api.documentCreer.mockImplementationOnce(async () => {
      await store.dispatch('document/refreshAfterUpsert', {
        action: { name: 'test' }
      })
    })

    await store.dispatch('document/upsert', {
      document: { id: 14, nom: 'champs', typeId: 1 },
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
