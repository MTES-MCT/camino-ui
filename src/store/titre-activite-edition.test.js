import titreActiviteEdition from './titre-activite-edition'
import * as api from '../api/titres-activites'
import { createApp } from 'vue'
import { createStore } from 'vuex'

import router from '../router'

jest.mock('../router', () => ({
  back: jest.fn()
}))

jest.mock('../api/titres-activites', () => ({
  activiteModifier: jest.fn(),
  activite: jest.fn()
}))
console.info = jest.fn()

describe("état d'une activité", () => {
  let store
  let mutations
  let actions

  beforeEach(() => {
    titreActiviteEdition.state = { element: null }

    actions = {
      reload: jest.fn(),
      messageAdd: jest.fn(),
      pageError: jest.fn(),
      apiError: jest.fn()
    }

    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn()
    }

    store = createStore({
      modules: {
        titreActiviteEdition,
        titre: {
          namespaced: true,
          state: { element: { id: 5 } },
          mutations: {}
        }
      },
      mutations,
      actions
    })

    const app = createApp({})
    app.use(store)
  })

  test('enregistre une activité sur un titre', async () => {
    const apiMock = api.activiteModifier.mockResolvedValue({
      statut: { id: 'enc' }
    })

    await store.dispatch('titreActiviteEdition/update', {
      id: 27,
      contenu: [],
      statut: { id: 'enc' },
      documents: [
        { id: 'toto', desc: 'desc', type: { id: 'aaa' } },
        { id: 'titi', type: { id: 'titi' } }
      ]
    })

    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      activite: {
        id: 27,
        contenu: [],
        documentIds: ['toto']
      }
    })

    expect(router.back).toHaveBeenCalled()
  })

  test("erreur dans l'api lors de l'enregistrement d'une activité", async () => {
    const apiMock = api.activiteModifier.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('titreActiviteEdition/update', {
      id: 27,
      contenu: [],
      statut: { id: 'dep' }
    })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      activite: { id: 27, contenu: [], documents: undefined }
    })
    expect(actions.apiError).toHaveBeenCalled()
    expect(actions.messageAdd).not.toHaveBeenCalled()
  })

  test('retourne une activité', async () => {
    api.activite.mockResolvedValue({
      id: 27,
      contenu: [],
      statut: { id: 'dep' },
      sections: []
    })

    await store.dispatch('titreActiviteEdition/init', 27)

    expect(store.state.titreActiviteEdition.element).toEqual({
      id: 27,
      contenu: {},
      sections: [],
      statut: { id: 'dep' }
    })

    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("affiche une page d'erreur si l'id de l'activité retourne null", async () => {
    const apiMock = api.activite.mockResolvedValue(null)
    await store.dispatch('titreActiviteEdition/init', 27)

    expect(apiMock).toHaveBeenCalledWith({ id: 27 })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur de l'api dans l'obtention de l'activité", async () => {
    const apiMock = api.activite.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('titreActiviteEdition/init', 'activite-id')

    expect(apiMock).toHaveBeenCalledWith({ id: 'activite-id' })
    expect(actions.apiError).toHaveBeenCalled()
  })

  test("supprime les données d'activité", () => {
    store.commit('titreActiviteEdition/set', { id: 71, nom: 'toto' })
    store.commit('titreActiviteEdition/reset')

    expect(store.state.titreActiviteEdition.element).toBeNull()
  })

  test('ajoute un nouveau document', async () => {
    const type = { id: 'type-id', optionnel: false }
    store.state.titreActiviteEdition.element = {
      type: { id: 'gpr', documentsTypes: [type] }
    }

    await store.dispatch('titreActiviteEdition/documentAdd', {
      document: { id: 'document-id', type }
    })

    expect(store.state.titreActiviteEdition.element.documents).toHaveLength(1)
    expect(store.state.titreActiviteEdition.element.documents[0].id).toEqual(
      'document-id'
    )
  })

  test('remplace un document existant par un nouveau', async () => {
    const type = { id: 'type-id', optionnel: false }
    store.state.titreActiviteEdition.element = {
      documents: [{ id: 'document-id1' }],
      type: { id: 'gpr', documentsTypes: [type] }
    }

    await store.dispatch('titreActiviteEdition/documentAdd', {
      document: { id: 'document-id2', type },
      idOld: 'document-id1'
    })

    expect(store.state.titreActiviteEdition.element.documents).toHaveLength(1)
    expect(store.state.titreActiviteEdition.element.documents[0].id).toEqual(
      'document-id2'
    )
  })

  test('supprime un document', async () => {
    const type = { id: 'type-id', optionnel: true }
    store.state.titreActiviteEdition.element = {
      documents: [{ id: 'document-id' }],
      type: { id: 'gpr', documentsTypes: [type] }
    }

    await store.dispatch('titreActiviteEdition/documentRemove', {
      id: 'document-id'
    })

    expect(store.state.titreActiviteEdition.element.documents).toHaveLength(0)
  })
})
