import administration from './administration'
import { createLocalVue } from '@vue/test-utils'
import * as api from '../api/administrations'
import Vuex from 'vuex'

jest.mock('../api/administrations', () => ({
  administration: jest.fn(),
  metasAdministration: jest.fn(),
  administrationModifier: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.info = jest.fn()

describe("état de l'administration consultée", () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    administration.state = {
      current: null,
      metas: { types: [], regions: [], departements: [] }
    }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupLoad: jest.fn(),
      popupMessagesRemove: jest.fn(),
      popupClose: jest.fn(),
      popupMessageAdd: jest.fn()
    }
    actions = {
      pageError: jest.fn(),
      apiError: jest.fn(),
      reload: jest.fn(),
      messageAdd: jest.fn()
    }
    store = new Vuex.Store({
      modules: { administration },
      mutations,
      actions
    })
  })

  test("obtient les données d'un administration", async () => {
    const administration = { id: 71, nom: 'toto' }
    const apiMock = api.administration.mockResolvedValue(administration)
    await store.dispatch('administration/get', 71)

    expect(apiMock).toHaveBeenCalledWith({ id: 71 })
    expect(store.state.administration.current).toEqual(administration)
  })

  test("retourne une erreur de l'api dans l'obtention de l'administration", async () => {
    const apiMock = api.administration.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('administration/get', 71)

    expect(apiMock).toHaveBeenCalledWith({ id: 71 })
    expect(console.info).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test("supprime les données d'administration", () => {
    store.commit('administration/set', { id: 71, nom: 'toto' })
    store.commit('administration/reset')

    expect(store.state.administration.current).toBeNull()
  })

  test('récupère les métas pour éditer une administration', async () => {
    const apiMock = api.metasAdministration.mockResolvedValue({
      administrationsTypes: [
        { id: 'admin-1', nom: 'Opérateur' },
        { id: 'admin-2', nom: 'Déal' }
      ],
      regions: [
        { id: 1, nom: 'région 1' },
        { id: 2, nom: 'région 2' }
      ],
      departements: [
        { id: 1, nom: 'département 1' },
        { id: 2, nom: 'département 2' }
      ]
    })

    await store.dispatch('administration/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.administration.metas).toEqual({
      types: [
        { id: 'admin-1', nom: 'Opérateur' },
        { id: 'admin-2', nom: 'Déal' }
      ],
      regions: [
        { id: 1, nom: 'région 1' },
        { id: 2, nom: 'région 2' }
      ],
      departements: [
        { id: 1, nom: 'département 1' },
        { id: 2, nom: 'département 2' }
      ]
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la récupération des métas", async () => {
    const apiMock = api.metasAdministration.mockRejectedValue(
      new Error('erreur api')
    )

    await store.dispatch('administration/metasGet')

    expect(apiMock).toHaveBeenCalled()

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('modifie une administration', async () => {
    const apiMock = api.administrationModifier.mockResolvedValue({
      id: 71,
      nom: 'nom admin'
    })

    await store.dispatch('administration/update', { id: 71, nom: 'nom admin' })

    expect(apiMock).toHaveBeenCalledWith({
      administration: { nom: 'nom admin', id: 71 }
    })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la modification d'une administration", async () => {
    const apiMock = api.administrationModifier.mockRejectedValue(
      new Error('erreur api')
    )

    await store.dispatch('administration/update', { id: 71, nom: 'nom admin' })

    expect(apiMock).toHaveBeenCalledWith({
      administration: { nom: 'nom admin', id: 71 }
    })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })
})
