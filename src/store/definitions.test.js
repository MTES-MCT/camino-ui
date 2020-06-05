import definitions from './definitions'
import * as api from '../api/definitions'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/definitions', () => ({
  definitions: jest.fn()
}))
console.info = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)

describe('définitions du glossaire', () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    definitions.state = {}

    actions = {
      pageError: jest.fn(),
      apiError: jest.fn(),
      messageAdd: jest.fn()
    }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupMessagesRemove: jest.fn(),
      popupMessageAdd: jest.fn(),
      popupClose: jest.fn()
    }

    store = new Vuex.Store({
      modules: { definitions },
      mutations,
      actions
    })
  })

  test('récupère les définitions', async () => {
    const response = [
      {
        id: 'aum',
        nom: 'Autorisation minière',
        table: null,
        description: 'description aum',
        elements: null,
        couleur: null
      },
      {
        id: 'dom',
        nom: 'Domaines miniers',
        table: 'domaines',
        description: 'description dom',
        elements: [
          {
            id: 'm',
            nom: 'minéraux et métaux',
            table: null,
            description: 'description m',
            elements: null,
            couleur: null
          }
        ],
        couleur: null
      }
    ]

    const apiMock = api.definitions.mockResolvedValue(response)

    await store.dispatch('definitions/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.definitions.list).toEqual(response)
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.definitions.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('definitions/get')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur 404 si l'api retourne null", async () => {
    const apiMock = api.definitions.mockResolvedValue(null)
    await store.dispatch('definitions/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.definitions.list).toEqual(null)
  })
})
