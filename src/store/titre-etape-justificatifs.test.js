import titreEtapeJustificatifs from './titre-etape-justificatifs'
import * as api from '../api/titres-etapes'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/titres-etapes', () => ({
  etapeJustificatifsModifier: jest.fn(),
  etapeEntreprises: jest.fn()
}))

console.info = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)

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

    store = new Vuex.Store({
      actions,
      mutations,
      modules: { titreEtapeJustificatifs }
    })
  })

  test('récupère les métas pour lier un justificatif', async () => {
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

    await store.dispatch(
      'titreEtapeJustificatifs/metasGet',
      'titre-etape-id-01'
    )

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

    await store.dispatch('titreEtapeJustificatifs/metasGet', { etape: {} })

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('lie des justificatifs avec une étape', async () => {
    api.etapeJustificatifsModifier.mockResolvedValue({
      id: 'titre-id',
      nom: 'Nom du titre'
    })
    await store.dispatch('titreEtapeJustificatifs/update', {
      id: 'etape-id',
      documentsIds: ['document-id-01'],
      context: { name: 'titres', id: 'titre-id-01' }
    })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une null lors de la liaison d'un justificatif", async () => {
    api.etapeJustificatifsModifier.mockResolvedValue(null)
    await store.dispatch('titreEtapeJustificatifs/update', {
      id: 'etape-id',
      documentsIds: ['document-id-01'],
      context: { name: 'titres', id: 'titre-id-01' }
    })

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la liaison d'un justificatif", async () => {
    api.etapeJustificatifsModifier.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titreEtapeJustificatifs/update', {
      id: 'etape-id',
      documentsIds: ['document-id-01'],
      context: { name: 'titres', id: 'titre-id-01' }
    })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })
})
