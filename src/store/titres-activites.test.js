import titresActivites from './titres-activites'
import { createApp } from 'vue'
import { createStore } from 'vuex'

jest.mock('../api/titres-activites', () => ({
  activites: jest.fn()
}))

jest.mock('../api/metas-activites', () => ({
  activitesMetas: jest.fn()
}))

console.info = jest.fn()

describe("état d'une activité", () => {
  let store

  beforeEach(() => {
    titresActivites.state = {
      metas: {
        types: [],
        annees: [],
        statuts: [],
        titresDomaines: [],
        titresTypes: [],
        titresStatuts: []
      },
      definitions: [
        { id: 'typesIds', type: 'strings', values: [] },
        { id: 'statutsIds', type: 'strings', values: [] },
        { id: 'annees', type: 'numbers', values: [] },
        { id: 'titresTypesIds', type: 'strings', values: [] },
        { id: 'titresDomainesIds', type: 'strings', values: [] },
        { id: 'titresStatutsIds', type: 'strings', values: [] }
      ]
    }

    store = createStore({
      modules: { titresActivites }
    })

    const app = createApp({})
    app.use(store)
  })

  test('enregistre les métas', () => {
    const activitesTypes = [
      { id: 'grp', nom: "rapport trimestriel d'activité" }
    ]
    const activitesAnnees = [2020, 2019]
    const activitesStatuts = [
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

    store.commit('titresActivites/metasSet', {
      activitesTypes,
      activitesAnnees,
      activitesStatuts,
      domaines,
      statuts,
      types,
      truc: {}
    })

    expect(store.state.titresActivites.metas).toEqual({
      types: activitesTypes,
      annees: [
        { id: 2020, nom: 2020 },
        { id: 2019, nom: 2019 }
      ],
      statuts: activitesStatuts,
      titresDomaines: domaines,
      titresTypes: types,
      titresStatuts: statuts
    })

    expect(store.state.titresActivites.definitions).toEqual([
      { id: 'typesIds', type: 'strings', values: ['grp'] },
      {
        id: 'statutsIds',
        type: 'strings',
        values: ['abs', 'enc', 'dep', 'fer']
      },
      { id: 'annees', type: 'numbers', values: [2020, 2019] },
      { id: 'titresTypesIds', type: 'strings', values: ['cx', 'pr'] },
      { id: 'titresDomainesIds', type: 'strings', values: ['m', 'w'] },
      { id: 'titresStatutsIds', type: 'strings', values: ['val', 'ech'] }
    ])
  })
})
