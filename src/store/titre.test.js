import titre from './titre'
import * as api from '../api/titres'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../router', () => ({
  push: () => {}
}))

jest.mock('../api/titres', () => ({
  metasTitre: jest.fn(),
  titre: jest.fn(),
  titreCreer: jest.fn(),
  titreModifier: jest.fn(),
  titreSupprimer: jest.fn()
}))

console.log = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)

describe('état du titre sélectionné', () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    titre.state = {
      current: null,
      metas: {
        referencesTypes: []
      },
      documents: []
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
      popupMessageAdd: jest.fn()
    }
    store = new Vuex.Store({
      modules: { titre },
      actions,
      mutations
    })
  })

  test('récupère les métas pour éditer un titre', async () => {
    const apiMock = api.metasTitre
      .mockResolvedValueOnce([
        { id: 'ifr', nom: 'Ifremer' },
        { id: 'dge', nom: 'DGEC' }
      ])
      .mockResolvedValueOnce(undefined)

    await store.dispatch('titre/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titre.metas.referencesTypes).toEqual([
      { id: 'ifr', nom: 'Ifremer' },
      { id: 'dge', nom: 'DGEC' }
    ])
    expect(mutations.loadingRemove).toHaveBeenCalled()

    await store.dispatch('titre/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titre.metas.referencesTypes).toEqual([])
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasTitre.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titre/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('obtient le titre en cours', async () => {
    const apiMock = api.titre.mockResolvedValue({ id: 83, nom: 'marne' })
    await store.dispatch('titre/get', 83)

    expect(apiMock).toHaveBeenCalledWith({ id: 83 })
    expect(store.state.titre.current).toEqual({ id: 83, nom: 'marne' })
  })

  test("retourne une erreur si l'api retourne null lors d'une requête sur un titre", async () => {
    const apiMock = api.titre.mockResolvedValue(null)
    await store.dispatch('titre/get', 83)

    expect(apiMock).toHaveBeenCalledWith({ id: 83 })
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

  test('crée un titre', async () => {
    api.titreCreer.mockResolvedValue({ id: 83, nom: 'marne' })
    await store.dispatch('titre/titreAdd', { id: 83, nom: 'marne' })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne null lors de la création d'un titre", async () => {
    api.titreCreer.mockResolvedValue(null)
    await store.dispatch('titre/titreAdd', { id: 83, nom: 'marne' })

    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création dun titre", async () => {
    api.titreCreer.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/titreAdd', { id: 83, nom: 'marne' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour un titre', async () => {
    store = new Vuex.Store({ modules: { titre }, actions, mutations })
    api.titreModifier.mockResolvedValue({ id: 83, nom: 'marne' })
    await store.dispatch('titre/titreUpdate', { id: 83, nom: 'marne' })

    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actions.reload).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la mise à jour d'un titre", async () => {
    api.titreModifier.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/titreUpdate', { id: 83, nom: 'marne' })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime un titre', async () => {
    const apiMock = api.titreSupprimer.mockResolvedValue(true)
    await store.dispatch('titre/titreRemove', 83)

    expect(apiMock).toHaveBeenCalledWith({ id: 83 })
  })

  test("retourne une erreur si l'API retourne null lors de la suppression d'un titre", async () => {
    const apiMock = api.titreSupprimer.mockResolvedValue(null)
    await store.dispatch('titre/titreRemove', 83)

    expect(apiMock).toHaveBeenCalledWith({ id: 83 })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la suppression d'un titre", async () => {
    const apiMock = api.titreSupprimer.mockRejectedValue(
      new Error("error de l'api")
    )
    await store.dispatch('titre/titreRemove', 83)

    expect(apiMock).toHaveBeenCalledWith({ id: 83 })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime le titre courant', () => {
    store.commit('titre/set', 83)
    store.commit('titre/reset')

    expect(store.state.titre.current).toBeNull()
  })
})
