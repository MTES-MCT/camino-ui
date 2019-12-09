import metas from './metas'
import * as api from '../api/metas'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/metas', () => ({
  metasInit: jest.fn(),
  metasTitre: jest.fn(),
  metasTitres: jest.fn(),
  metasTitreEtape: jest.fn(),
  metasTitreDemarche: jest.fn(),
  metasUtilisateur: jest.fn(),
  metasDocument: jest.fn(),
  metasActivites: jest.fn()
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
      titres: {
        domaines: [],
        types: [],
        statuts: []
      },

      titre: {
        referencesTypes: []
      },

      demarche: {
        titreDemarchesTypes: []
      },

      etape: {
        demarcheEtapesTypes: [],
        devises: [],
        unites: [],
        geoSystemes: [],
        substances: [],
        entreprises: []
      },

      document: {
        documentsTypes: []
      },

      utilisateur: {
        permissions: [],
        entreprises: [],
        administrations: []
      },

      activites: {
        activitesTypes: []
      },

      utilisateurDomaines: [],

      version: null,
      /* global npmVersion */
      versionUi: `${npmVersion}`
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
    expect(store.state.metas.version).toEqual('1.1.1')
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
    expect(store.state.metas.version).toBeNull()
  })

  test('récupère les métas pour éditer un titre', async () => {
    const apiMock = api.metasTitre.mockResolvedValue([
      { id: 'ifr', nom: 'Ifremer' },
      { id: 'dge', nom: 'DGEC' }
    ])

    await store.dispatch('metas/titreGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.metas.titre.referencesTypes).toEqual([
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
    expect(store.state.metas.titres.domaines).toEqual([
      { id: 'c', nom: 'carrières' },
      { id: 'w', nom: 'granulats' }
    ])
    expect(store.state.metas.titres.types).toEqual([
      { id: 'dge', nom: 'DGEC' },
      { id: 'ifr', nom: 'Ifremer' }
    ])
    expect(mutations.loadingRemove).toHaveBeenCalled()
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

  test('récupère les métas pour éditer une démarche', async () => {
    const apiMock = api.metasTitreDemarche.mockResolvedValue([
      { id: 'w', nom: 'granulats' },
      { id: 'c', nom: 'carrières' }
    ])

    await store.dispatch('metas/titreDemarcheGet', { etape: {} })

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.metas.demarche.titreDemarchesTypes).toEqual([
      { id: 'c', nom: 'carrières' },
      { id: 'w', nom: 'granulats' }
    ])
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasTitreDemarche.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('metas/titreDemarcheGet', { etape: {} })

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('récupère les métas pour éditer une étape', async () => {
    const apiMock = api.metasTitreEtape.mockResolvedValue({
      demarcheEtapesTypes: [
        { id: 'w', nom: 'granulats' },
        { id: 'c', nom: 'carrières' }
      ],
      geoSystemes: [
        { id: 'ifr', nom: 'Ifremer' },
        { id: 'dge', nom: 'DGEC' }
      ],
      truc: null
    })

    await store.dispatch('metas/titreEtapeGet', { etape: {} })

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.metas.etape.demarcheEtapesTypes).toEqual([
      { id: 'c', nom: 'carrières' },
      { id: 'w', nom: 'granulats' }
    ])
    expect(store.state.metas.etape.geoSystemes).toEqual([
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
    const apiMock = api.metasDocument.mockResolvedValue({
      documentsTypes: [
        { id: 'arr', nom: 'Arrêté' },
        { id: 'avi', nom: 'Avis' }
      ]
    })

    await store.dispatch('metas/titreEtapeDocumentGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.metas.document.documentsTypes).toEqual({
      documentsTypes: [
        { id: 'arr', nom: 'Arrêté' },
        { id: 'avi', nom: 'Avis' }
      ]
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasDocument.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('metas/titreEtapeDocumentGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('récupère les métas pour éditer un utilisateur', async () => {
    const apiMock = api.metasUtilisateur.mockResolvedValue({
      permissions: [
        { id: 'w', nom: 'granulats' },
        { id: 'c', nom: 'carrières' }
      ]
    })

    await store.dispatch('metas/utilisateurGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.metas.utilisateur.permissions).toEqual([
      { id: 'c', nom: 'carrières' },
      { id: 'w', nom: 'granulats' }
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

  test('récupère les métas pour afficher les activités', async () => {
    const apiMock = api.metasActivites.mockResolvedValue([
      { id: 'grp', nom: "rapport trimestriel d'activité" }
    ])

    await store.dispatch('metas/activitesGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.metas.activites.activitesTypes).toEqual([
      { id: 'grp', nom: "rapport trimestriel d'activité" }
    ])
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasActivites.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('metas/activitesGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api répond null", async () => {
    const apiMock = api.metasUtilisateur.mockResolvedValue(null)

    await store.dispatch('metas/utilisateurGet')

    expect(apiMock).toHaveBeenCalled()
  })
})
