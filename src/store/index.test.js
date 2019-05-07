import { actions, mutations, state } from '.index'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as routerApi from '../router'

jest.mock('../router', () => ({ router: [] }))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe('teste les fonctions utilisées dans les autres scripts', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store({ state, actions, mutations })
  })

  test("renvoie une erreur definie de l'api", async () => {
    const error = "test de l'erreur OK"
    await index.dispatch('apiError', error)

    expect(index.state.messages).toEqual([{ type: 'error', value: error }])
  })

  test("renvoie une erreur de connexion indefiniz de l'api", async () => {
    await index.dispatch('apiError')

    expect(index.state.messages).toEqual([
      {
        type: 'error',
        value: `Erreur: impossible de se connecter à l'API (undefined)`
      }
    ])
  })

  test('renvoie une erreur de la page', async () => {
    await index.dispatch('pageError')

    expect(index.state.error).toEqual({
      type: 'error',
      value: `Erreur: page introuvable`
    })
  })
})

describe('teste les fonctions utilisant les autres scripts', () => {
  beforeEach(() => {
    index.state = {
      config: {},
      messages: [],
      popup: { component: null, props: null, messages: [] },
      error: null,
      menu: { component: null },
      loading: [],
      loaded: false
    }
  })
})
