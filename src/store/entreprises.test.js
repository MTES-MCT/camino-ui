import entreprises from './entreprises'
import * as Vue from 'vue'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

test('ajoute les entreprises en les triant', () => {
  const entreprisesListe = [
    { nom: 'Koala' },
    { nom: 'Petite Souris' },
    { nom: 'Monstres & Cie' }
  ]
  entreprises.state = { current: null, list: [] }
  const store = new Vuex.Store({ modules: { entreprises } })
  store.commit('entreprises/set', entreprisesListe)

  expect(store.state.entreprises.list).toEqual([
    { nom: 'Koala' },
    { nom: 'Monstres & Cie' },
    { nom: 'Petite Souris' }
  ])
})
