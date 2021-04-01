import titreEtapeJustificatifs from './titre-etape-justificatifs'
import * as api from '../api/titres-etapes'
import { createApp } from 'vue'
import { createStore } from 'vuex'

jest.mock('../api/titres-etapes', () => ({
  etapeJustificatifsAssocier: jest.fn(),
  etapeJustificatifDissocier: jest.fn(),
  etapeEntreprises: jest.fn()
}))

console.info = jest.fn()

describe('justificatifs', () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    titreEtapeJustificatifs.state = {
      metas: {
        entreprises: []
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

    store = createStore({
      actions,
      mutations,
      modules: {
        titreEtapeJustificatifs,
        titre: {
          namespaced: true,
          mutations: { open: jest.fn() }
        }
      }
    })

    const app = createApp({})
    app.use(store)
  })

  test('récupère les métas pour associer un justificatif', async () => {
    const apiMock = api.etapeEntreprises.mockReturnValueOnce({
      elements: [
        {
          id: 'entreprise-id-01',
          nom: "Nom de l'entreprise",
          documents: [
            { id: 'entreprise-id-01-document-id-01', nom: 'Nom du document' }
          ]
        }
      ]
    })

    await store.dispatch('titreEtapeJustificatifs/init', 'titre-etape-id-01')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titreEtapeJustificatifs.metas.entreprises).toEqual([
      {
        id: 'entreprise-id-01',
        nom: "Nom de l'entreprise",
        documents: [
          { id: 'entreprise-id-01-document-id-01', nom: 'Nom du document' }
        ]
      }
    ])

    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.etapeEntreprises.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titreEtapeJustificatifs/init', { etape: {} })

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('associe des justificatifs avec une étape', async () => {
    api.etapeJustificatifsAssocier.mockResolvedValue({
      id: 'titre-id',
      nom: 'Nom du titre'
    })
    await store.dispatch('titreEtapeJustificatifs/link', {
      id: 'etape-id',
      documentsIds: ['document-id-01'],
      context: { name: 'titre', id: 'titre-id-01' }
    })

    expect(mutations.popupClose).toHaveBeenCalled()

    await store.dispatch('titreEtapeJustificatifs/link', {
      id: 'etape-id',
      documentsIds: ['document-id-01']
    })

    expect(mutations.popupClose).toHaveBeenCalled()

    await store.dispatch('titreEtapeJustificatifs/link', {
      id: 'etape-id',
      documentsIds: ['document-id-01'],
      context: 'something'
    })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la liaison d'un justificatif", async () => {
    api.etapeJustificatifsAssocier.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titreEtapeJustificatifs/link', {
      id: 'etape-id',
      documentsIds: ['document-id-01'],
      context: { name: 'titres', id: 'titre-id-01' }
    })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test("dissocie un justificatif d'une étape", async () => {
    api.etapeJustificatifDissocier.mockResolvedValue({
      id: 'titre-id',
      nom: 'Nom du titre'
    })
    await store.dispatch('titreEtapeJustificatifs/unlink', {
      id: 'etape-id',
      documentId: 'document-id-01',
      context: { name: 'titres', id: 'titre-id-01' }
    })

    expect(actions.messageAdd).toHaveBeenCalled()

    await store.dispatch('titreEtapeJustificatifs/unlink', {
      id: 'etape-id',
      documentId: 'document-id-01'
    })

    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une null lors de la dissociation d'un justificatif", async () => {
    api.etapeJustificatifDissocier.mockResolvedValue(null)
    await store.dispatch('titreEtapeJustificatifs/unlink', {
      id: 'etape-id',
      documentId: 'document-id-01',
      context: { name: 'titres', id: 'titre-id-01' }
    })

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la dissociation d'un justificatif", async () => {
    api.etapeJustificatifDissocier.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titreEtapeJustificatifs/unlink', {
      id: 'etape-id',
      documentId: 'document-id-01',
      context: { name: 'titres', id: 'titre-id-01' }
    })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })
})
