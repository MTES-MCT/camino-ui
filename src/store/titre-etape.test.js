import titreEtape from './titre-etape'
import * as api from '../api/titres-etapes'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/titres-etapes', () => ({
  titreEtapeMetas: jest.fn(),
  etapeCreer: jest.fn(),
  etapeModifier: jest.fn(),
  etapeSupprimer: jest.fn()
}))

console.info = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)

describe('étapes', () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    titreEtape.state = {
      current: null,
      metas: {
        etapesTypes: [],
        devises: [],
        unites: [],
        geoSystemes: [],
        substances: [],
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
      modules: {
        titreEtape,
        titre: { namespaced: true, mutations: { open: jest.fn() } }
      }
    })
  })

  test('récupère les métas pour éditer une étape', async () => {
    const apiMock = api.titreEtapeMetas.mockResolvedValue({
      etapesTypes: [
        { id: 'w', nom: 'granulats' },
        { id: 'c', nom: 'carrières' }
      ],
      geoSystemes: [
        { id: 'ifr', nom: 'Ifremer' },
        { id: 'dge', nom: 'DGEC' }
      ],
      entreprises: { elements: [{ id: 'ent-1', nom: '1' }] },
      etapeEntreprises: { elements: [{ id: 'ent-2', nom: '2' }] }
    })

    await store.dispatch('titreEtape/metasGet', { etape: {} })

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titreEtape.metas).toEqual({
      etapesTypes: [
        { id: 'w', nom: 'granulats' },
        { id: 'c', nom: 'carrières' }
      ],
      geoSystemes: [
        { id: 'ifr', nom: 'Ifremer' },
        { id: 'dge', nom: 'DGEC' }
      ],
      unites: [],
      devises: [],
      substances: [],
      entreprises: [
        { id: 'ent-1', nom: '1' },
        { id: 'ent-2', nom: '2' }
      ]
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.titreEtapeMetas.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titreEtape/metasGet', { etape: {} })

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour une étape', async () => {
    api.etapeCreer.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('titreEtape/add', { id: 14, nom: 'champs' })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création d'une étape", async () => {
    api.etapeCreer.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titreEtape/add', { id: 14, nom: 'champs' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour une étape', async () => {
    api.etapeModifier.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('titreEtape/update', { id: 14, nom: 'champs' })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la mise à jour d'une étape", async () => {
    api.etapeModifier.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titreEtape/update', { id: 14, nom: 'champs' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime une étape', async () => {
    const apiMock = api.etapeSupprimer.mockResolvedValue(14)
    await store.dispatch('titreEtape/remove', 14)

    expect(apiMock).toHaveBeenCalledWith({ id: 14 })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la suppression d'une étape", async () => {
    const apiMock = api.etapeSupprimer.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titreEtape/remove', 14)

    expect(apiMock).toHaveBeenCalledWith({ id: 14 })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })
})
