import titresDemarches from './titres-demarches'
import { createApp } from 'vue'
import { createStore } from 'vuex'

jest.mock('../api/titres-demarches', () => ({
  demarchesMetas: jest.fn(),
  demarches: jest.fn()
}))

console.info = jest.fn()

describe('liste des demarches', () => {
  let store

  beforeEach(() => {
    titresDemarches.state = {
      metas: {
        types: [],
        statuts: [],
        etapesTypes: [],
        titresTypes: [],
        titresDomaines: [],
        titresStatuts: []
      },
      definitions: [
        { id: 'typesIds', type: 'strings', values: [] },
        { id: 'statutsIds', type: 'strings', values: [] },
        { id: 'etapesInclues', type: 'objects', values: [] },
        { id: 'etapesExclues', type: 'objects', values: [] },
        { id: 'titresDomainesIds', type: 'strings', values: [] },
        { id: 'titresTypesIds', type: 'strings', values: [] },
        { id: 'titresStatutsIds', type: 'strings', values: [] }
      ],
      useUrl: true
    }

    store = createStore({
      modules: { titresDemarches }
    })

    const app = createApp({})
    app.use(store)
  })

  test('enregistre les métas', () => {
    const demarchesTypes = [{ id: 'oct', nom: 'octroi' }]
    const demarchesStatuts = [
      { id: 'abs', nom: 'absent', couleur: 'error' },
      { id: 'enc', nom: 'en construction', couleur: 'warning' },
      { id: 'dep', nom: 'déposé', couleur: 'success' },
      { id: 'fer', nom: 'cloturé', couleur: 'neutral' }
    ]
    const domaines = [
      { id: 'm', nom: 'minéraux et métaux' },
      { id: 'w', nom: 'granulats marins' }
    ]
    const statuts = [
      { id: 'val', nom: 'valide', couleur: 'success' },
      { id: 'ech', nom: 'échu', couleur: 'neutral' }
    ]
    const types = [
      { id: 'cx', nom: 'concession', exploitation: true },
      { id: 'pr', nom: 'permis exclusif de recherches', exploitation: false }
    ]
    const etapesTypes = [{ id: 'dpu', nom: 'publication au Jorf' }]

    store.commit('titresDemarches/metasSet', {
      demarchesTypes,
      demarchesStatuts,
      domaines,
      statuts,
      types,
      etapesTypes,
      truc: {}
    })

    expect(store.state.titresDemarches.metas).toEqual({
      types: demarchesTypes,
      statuts: demarchesStatuts,
      titresDomaines: domaines,
      titresTypes: types,
      titresStatuts: statuts,
      etapesTypes
    })

    expect(store.state.titresDemarches.definitions).toEqual([
      { values: ['oct'], id: 'typesIds', type: 'strings' },
      {
        values: ['abs', 'enc', 'dep', 'fer'],
        id: 'statutsIds',
        type: 'strings'
      },
      { values: ['dpu'], id: 'etapesInclues', type: 'objects' },
      { values: ['dpu'], id: 'etapesExclues', type: 'objects' },
      { values: ['m', 'w'], id: 'titresDomainesIds', type: 'strings' },
      { values: ['cx', 'pr'], id: 'titresTypesIds', type: 'strings' },
      { values: ['val', 'ech'], id: 'titresStatutsIds', type: 'strings' }
    ])
  })
})
