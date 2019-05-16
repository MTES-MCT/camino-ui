import entreprises from './entreprises'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

test('ajoute les entreprises en les triant', () => {
  const entreprisesListe = [
    { nom: 'Petite Souris' },
    'Koala',
    { nom: 'Monstres & Cie' },
    { nom: 'Canard' }
  ]
  entreprises.state = { current: null, list: [] }
  const store = new Vuex.Store({ modules: { entreprises } })
  store.commit('entreprises/set', entreprisesListe)

  expect(store.state.entreprises.list).toEqual([
    { nom: 'Petite Souris' },
    'Koala',
    { nom: 'Canard' },
    { nom: 'Monstres & Cie' }
  ])
})
