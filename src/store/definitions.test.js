import * as api from '../api/definitions'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '.'

jest.mock('../api/definitions', () => ({
  definitions: jest.fn()
}))
console.info = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)

describe('définitions du glossaire', () => {
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
      },
      {
        id: 'sca',
        nom: 'Substance de carrières',
        table: null,
        description: 'description sca',
        elements: null,
        couleur: null
      },
      {
        id: 'scx',
        nom: 'Substances connexes',
        table: null,
        description: 'description scx',
        elements: null,
        couleur: null
      },
      {
        id: 'smi',
        nom: 'Substance de mine',
        table: null,
        description: 'description smi',
        elements: null,
        couleur: null
      },
      {
        id: 'spr',
        nom: 'Substances principales',
        table: null,
        description: 'description spr',
        elements: null,
        couleur: null
      },
      {
        id: 'std',
        nom: 'Statuts de démarche',
        table: 'demarches_statuts',
        description: 'description std',
        elements: [
          {
            id: 'acc',
            nom: 'accepté',
            table: null,
            description: null,
            elements: null,
            couleur: null
          }
        ],
        couleur: null
      },
      {
        id: 'ste',
        nom: "Statuts d'étapes",
        table: 'etapes_statuts',
        description: null,
        elements: [
          {
            id: 'enc',
            nom: 'en cours',
            table: null,
            description: 'description enc',
            elements: null,
            couleur: null
          }
        ],
        couleur: null
      },
      {
        id: 'stt',
        nom: 'Statuts',
        table: 'titres_statuts',
        description: 'description stt',
        elements: [
          {
            id: 'dmi',
            nom: 'demande initiale',
            table: null,
            description: 'description dmi',
            elements: null,
            couleur: 'warning'
          }
        ],
        couleur: null
      },
      {
        id: 'tim',
        nom: 'Titre minier',
        table: null,
        description: 'description tim',
        elements: null,
        couleur: null
      },
      {
        id: 'tyd',
        nom: 'Types de démarche',
        table: 'demarches_types',
        description: null,
        elements: [
          {
            id: 'oct',
            nom: 'octroi',
            table: null,
            description: 'description oct',
            elements: null,
            couleur: null
          }
        ],
        couleur: null
      },
      {
        id: 'tye',
        nom: "Type d'étapes",
        table: null,
        description: null,
        elements: [
          {
            id: 'anf',
            nom: 'avis de mise en concurrence au JORF',
            table: 'etapes_types',
            description: 'description anf',
            elements: null,
            couleur: null
          }
        ],
        couleur: null
      },
      {
        id: 'tyt',
        nom: 'Types',
        table: 'titres_types_types',
        description: 'description tyt',
        elements: [
          {
            id: 'ax',
            nom: "autorisation d'exploitation",
            table: null,
            description: 'description ax',
            elements: null,
            couleur: null
          }
        ],
        couleur: null
      }
    ]

    const apiMock = api.definitions.mockResolvedValueOnce(response)

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
  })
})
