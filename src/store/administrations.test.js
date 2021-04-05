import { createApp } from 'vue'
import { createStore } from 'vuex'
import administrations from './administrations'

jest.mock('../api/administrations', () => ({
  administrations: jest.fn(),
  administrationsMetas: jest.fn()
}))

console.info = jest.fn()

describe("liste d'administrations", () => {
  let store

  beforeEach(() => {
    administrations.state = {
      metas: { types: [] },
      definitions: [{ id: 'typesIds', type: 'strings', values: [] }]
    }

    store = createStore({
      modules: { administrations }
    })

    const app = createApp({})
    app.use(store)
  })

  test('enregistre les métas', () => {
    store.commit('administrations/metasSet', [
      { id: 'ope', nom: 'opérateurs' },
      { id: 'dea', nom: 'déal' }
    ])

    expect(store.state.administrations.metas).toEqual({
      types: [
        { id: 'ope', nom: 'opérateurs' },
        { id: 'dea', nom: 'déal' }
      ]
    })

    expect(store.state.administrations.definitions).toEqual([
      { id: 'typesIds', type: 'strings', values: ['ope', 'dea'] }
    ])
  })
})
