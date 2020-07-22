import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as api from '../api/entreprises'
import entreprise from './entreprise'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../router', () => ({
  push: () => {},
  replace: () => {}
}))

jest.mock('../api/entreprises', () => ({
  entreprise: jest.fn(),
  entrepriseCreer: jest.fn(),
  entrepriseModifier: jest.fn()
}))

console.info = jest.fn()

describe("état de l'entreprise sélectionnée", () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    entreprise.state = { current: null }
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
      modules: { entreprise },
      mutations,
      actions
    })
  })

  test("obtient les données d'un entreprise", async () => {
    const apiMock = api.entreprise.mockResolvedValue({ id: 71, nom: 'toto' })
    await store.dispatch('entreprise/get', 71)

    expect(apiMock).toHaveBeenCalledWith({ id: 71 })
    expect(store.state.entreprise.current).toEqual({ id: 71, nom: 'toto' })
  })

  test("retourne une erreur de l'api dans l'obtention de l'entreprise", async () => {
    const apiMock = api.entreprise.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('entreprise/get', 71)

    expect(apiMock).toHaveBeenCalledWith({ id: 71 })
    expect(console.info).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test("supprime les données d'entreprise", () => {
    store.commit('entreprise/set', { id: 71, nom: 'toto' })
    store.commit('entreprise/reset')

    expect(store.state.entreprise.current).toBeNull()
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
})
