import { createLocalVue } from '@vue/test-utils'

import substances from './substances'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

test('ajoute des substances', async () => {
  substances.state = { list: [] }
  const values = ['165', '6513', '21']
  const store = new Vuex.Store({ modules: { substances } })
  await store.dispatch('substances/set', values)
  expect(store.state.substances.list).toEqual(values)
})
