import metas from './metas'
import * as api from '../api'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api', () => ({
  metasInit: jest.fn(),
  metasTitre: jest.fn(),
  metasTitres: jest.fn(),
  metasTitreEtape: jest.fn(),
  metasUtilisateur: jest.fn(),
  metasTitreEtapeDocument: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe('état de la liste des métas', () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    metas.state = {
      types: [],
      domaines: [],
      statuts: [],
      referencesTypes: [],
      devises: [],
      unites: [],
      geoSystemes: [],
      substances: [],
      entreprises: [],
      administrations: [],
      titresLoaded: false,
      versions: {
        api: null,
        /* global npmVersion */
        ui: `${npmVersion}`
      },
      permissions: []
    }

    actions = {
      apiError: jest.fn()
    }

    mutations = {
      loadingAdd: jest.fn(),
      popupMessageAdd: jest.fn(),
      loadingRemove: jest.fn(),
      apiError: jest.fn()
    }

    store = new Vuex.Store({ actions, mutations, modules: { metas } })
  })

  test("récupère les métas pour initialiser l'application", async () => {
    const apiMock = api.metasInit.mockResolvedValue({
      version: '1.1.1'
    })

    await store.dispatch('metas/init')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.metas.versions.api).toEqual('1.1.1')
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasInit.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('metas/init')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
    expect(store.state.metas.versions.api).toBeNull()
  })

  test('récupère les métas pour éditer un titre', async () => {
    const apiMock = api.metasTitre.mockResolvedValue({
      domaines: [
        { id: 'w', nom: 'granulats' },
        { id: 'c', nom: 'carrières' }
      ],
      referencesTypes: [
        { id: 'ifr', nom: 'Ifremer' },
        { id: 'dge', nom: 'DGEC' }
      ]
    })

    await store.dispatch('metas/titreGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.metas.domaines).toEqual([
      { id: 'c', nom: 'carrières' },
      { id: 'w', nom: 'granulats' }
    ])
    expect(store.state.metas.referencesTypes).toEqual([
      { id: 'dge', nom: 'DGEC' },
      { id: 'ifr', nom: 'Ifremer' }
    ])
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasTitre.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('metas/titreGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('récupère les métas pour visualiser les titres', async () => {
    const apiMock = api.metasTitres.mockResolvedValue({
      domaines: [
        { id: 'w', nom: 'granulats' },
        { id: 'c', nom: 'carrières' }
      ],
      types: [
        { id: 'ifr', nom: 'Ifremer' },
        { id: 'dge', nom: 'DGEC' }
      ]
    })

    await store.dispatch('metas/titresGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.metas.domaines).toEqual([
      { id: 'c', nom: 'carrières' },
      { id: 'w', nom: 'granulats' }
    ])
    expect(store.state.metas.types).toEqual([
      { id: 'dge', nom: 'DGEC' },
      { id: 'ifr', nom: 'Ifremer' }
    ])
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(store.state.metas.titresLoaded).toBeTruthy()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasTitres.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('metas/titresGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
    expect(store.state.metas.titresLoaded).toBeFalsy()
  })

  test('récupère les métas pour éditer une étape', async () => {
    const apiMock = api.metasTitreEtape.mockResolvedValue({
      domaines: [
        { id: 'w', nom: 'granulats' },
        { id: 'c', nom: 'carrières' }
      ],
      referencesTypes: [
        { id: 'ifr', nom: 'Ifremer' },
        { id: 'dge', nom: 'DGEC' }
      ],
      truc: null
    })

    await store.dispatch('metas/titreEtapeGet', { etape: {} })

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.metas.domaines).toEqual([
      { id: 'c', nom: 'carrières' },
      { id: 'w', nom: 'granulats' }
    ])
    expect(store.state.metas.referencesTypes).toEqual([
      { id: 'dge', nom: 'DGEC' },
      { id: 'ifr', nom: 'Ifremer' }
    ])
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasTitreEtape.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('metas/titreEtapeGet', { etape: {} })

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('récupère les métas pour éditer un document', async () => {
    const apiMock = api.metasTitreEtapeDocument.mockResolvedValue({
      documentsTypes: [
        { id: 'ifr', nom: 'Ifremer' },
        { id: 'dge', nom: 'DGEC' }
      ]
    })

    await store.dispatch('metas/titreEtapeDocumentGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.metas.documentsTypes).toEqual([
      { id: 'dge', nom: 'DGEC' },
      { id: 'ifr', nom: 'Ifremer' }
    ])
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasTitreEtapeDocument.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('metas/titreEtapeDocumentGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('récupère les métas pour éditer un utilisateur', async () => {
    const apiMock = api.metasUtilisateur.mockResolvedValue({
      domaines: [
        { id: 'w', nom: 'granulats' },
        { id: 'c', nom: 'carrières' }
      ],
      referencesTypes: [
        { id: 'ifr', nom: 'Ifremer' },
        { id: 'dge', nom: 'DGEC' }
      ]
    })

    await store.dispatch('metas/utilisateurGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.metas.domaines).toEqual([
      { id: 'c', nom: 'carrières' },
      { id: 'w', nom: 'granulats' }
    ])
    expect(store.state.metas.referencesTypes).toEqual([
      { id: 'dge', nom: 'DGEC' },
      { id: 'ifr', nom: 'Ifremer' }
    ])
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasUtilisateur.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('metas/utilisateurGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })
})
