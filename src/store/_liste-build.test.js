import { listeActionsBuild, listeMutations } from './_liste-build.js'
import { createApp } from 'vue'
import { createStore } from 'vuex'

console.info = jest.fn()

const listeElementsGet = jest.fn()
const listeMetasGet = jest.fn()

describe('listes', () => {
  let store
  let actions
  let mutations
  let route
  const liste = { namespaced: true }

  liste.actions = listeActionsBuild(
    'elements',
    'élements',
    listeElementsGet,
    listeMetasGet
  )

  liste.mutations = Object.assign({}, listeMutations, {
    metasSet(state, metas) {
      state.metas.types = metas

      const definition = state.definitions.find(p => p.id === 'typesIds')
      definition.elements = metas.map(e => e.id)
    }
  })

  beforeEach(() => {
    liste.state = {
      elements: null,
      metas: {
        types: []
      },
      definitions: [
        { id: 'page', type: 'number', min: 0 },
        { id: 'intervalle', type: 'number', min: 10, max: 500 },
        {
          id: 'colonne',
          type: 'string',
          elements: ['nom', 'type', 'abreviation']
        },
        { id: 'ordre', type: 'string', elements: ['asc', 'desc'] },
        { id: 'typesIds', type: 'strings', elements: [] }
      ],
      params: {
        table: { page: 1, intervalle: 200, ordre: 'asc', colonne: null },
        filtres: { typesIds: [] }
      },
      initialized: false
    }

    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn()
    }

    actions = {
      apiError: jest.fn(),
      messageAdd: jest.fn(),
      urlQueryUpdate: jest.fn()
    }

    route = {
      namespaced: true,
      state: { query: {} }
    }

    // eslint-disable-next-line vue/one-component-per-file
    const app = createApp({})

    store = createStore({
      modules: { liste, route },
      mutations,
      actions
    })

    app.use(store)
  })

  test('initialise une liste', async () => {
    const types = [
      { id: 'ope', nom: 'Opérateur' },
      { id: 'dea', nom: 'Déal' }
    ]
    const apiMetasMock = listeMetasGet.mockResolvedValue(types)

    const apiMock = listeElementsGet.mockResolvedValue({
      elements: [{ id: 'el-1', nom: 'élement 1' }],
      total: 1
    })

    await store.dispatch('liste/init')

    expect(apiMetasMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalled()
    expect(store.state.liste.metas).toEqual({ types })
    expect(
      store.state.liste.definitions.find(d => d.id === 'typesIds')
    ).toEqual({ id: 'typesIds', type: 'strings', elements: ['ope', 'dea'] })
    expect(store.state.liste.initialized).toBeTruthy()
    expect(store.state.liste.elements).toEqual([
      { id: 'el-1', nom: 'élement 1' }
    ])

    await store.dispatch('liste/init')

    store.commit('liste/reset')
    expect(store.state.liste.initialized).toBeFalsy()
    expect(store.state.liste.elements).toEqual([])
  })

  test("retourne une erreur si l'api renvoit une erreur", async () => {
    const apiMetasMock = listeMetasGet.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('liste/init')

    expect(apiMetasMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalledTimes(1)
    expect(store.state.liste.initialized).toBeFalsy()

    store.state.liste.initialized = true
    const apiMock = listeElementsGet.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('liste/get')

    expect(apiMock).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalledTimes(2)
  })

  test('modifie les paramètres de filtre', async () => {
    const apiMock = listeElementsGet.mockResolvedValue({
      elements: [{ id: 'el-1', nom: 'élement 1' }],
      total: 1
    })

    store.state.liste.params.table.page = 2

    await store.dispatch('liste/paramsSet', {
      section: 'filtres',
      params: { typesIds: ['dea'] }
    })

    expect(apiMock).not.toHaveBeenCalled()
    expect(store.state.liste.params.filtres.typesIds).toEqual(['dea'])

    store.state.liste.initialized = true

    await store.dispatch('liste/paramsSet', {
      section: 'table',
      params: { ordre: 'desc' },
      pageReset: true
    })

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.liste.params.table).toEqual({
      page: 1,
      intervalle: 200,
      ordre: 'desc',
      colonne: null
    })
    expect(store.state.liste.elements).toEqual([
      { id: 'el-1', nom: 'élement 1' }
    ])
  })

  test("met à jour la liste si les paramètres d'url changent", async () => {
    const apiMock = listeElementsGet.mockResolvedValue({
      elements: [{ id: 'el-1', nom: 'élement 1' }],
      total: 1
    })

    await store.dispatch('liste/routeUpdate')

    expect(apiMock).not.toHaveBeenCalled()
    expect(store.state.liste.elements).toBeNull()

    store.state.route.query.page = '4'
    store.state.route.query.typesIds = 'ope'
    store.state.liste.initialized = true
    await store.dispatch('liste/routeUpdate')

    expect(apiMock).toHaveBeenCalled()

    expect(store.state.liste.elements).toEqual([
      { id: 'el-1', nom: 'élement 1' }
    ])
  })
})

describe('listes sans metas', () => {
  let store
  let actions
  let mutations
  let route
  const liste = { namespaced: true }

  liste.actions = listeActionsBuild('elements', 'élements', listeElementsGet)

  liste.mutations = Object.assign({}, listeMutations)

  beforeEach(() => {
    liste.state = {
      element: null,
      definitions: [
        { id: 'page', type: 'number', min: 0 },
        { id: 'intervalle', type: 'number', min: 10, max: 500 },
        {
          id: 'colonne',
          type: 'string',
          elements: ['nom', 'type', 'abreviation']
        }
      ],
      params: {
        table: { page: 1, intervalle: 200, ordre: 'asc', colonne: null }
      },
      initialized: false
    }

    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn()
    }

    actions = {
      apiError: jest.fn(),
      messageAdd: jest.fn(),
      urlQueryUpdate: jest.fn()
    }

    route = {
      state: {
        query: {}
      }
    }

    // eslint-disable-next-line vue/one-component-per-file
    const app = createApp({})

    store = createStore({
      modules: { liste, route },
      mutations,
      actions
    })

    app.use(store)
  })

  test('initialise une liste sans metas', async () => {
    const apiMock = listeElementsGet.mockResolvedValue({
      elements: [{ id: 'el-1', nom: 'élement 1' }],
      total: 1
    })

    await store.dispatch('liste/init')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.liste.initialized).toBeTruthy()
    expect(store.state.liste.elements).toEqual([
      { id: 'el-1', nom: 'élement 1' }
    ])
  })
})
