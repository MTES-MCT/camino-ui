import { markRaw } from '@vue/reactivity'

import FiltresDomaines from '../_common/filtres/domaines.vue'
import FiltresStatuts from '../_common/filtres/statuts.vue'
import FiltresTypes from '../_common/filtres/types.vue'

import { elementsFormat } from '../../utils/index'
import { titres, titresRechercher } from '@/api/titres'

const filtres = [
  {
    id: 'titresIds',
    type: 'autocomplete',
    value: [],
    elements: [],
    name: 'Noms',
    lazy: true,
    search: value => titresRechercher({ noms: value, intervalle: 10 }),
    load: value => titres({ titresIds: value })
  },
  {
    id: 'entreprisesIds',
    type: 'autocomplete',
    value: [],
    name: 'Entreprises',
    elementsFormat
  },
  {
    id: 'substancesLegalesIds',
    type: 'autocomplete',
    value: [],
    name: 'Substances',
    elementsFormat
  },
  {
    id: 'references',
    type: 'input',
    value: '',
    name: 'Références',
    placeholder: 'Référence DGEC, DEAL, DEB, BRGM, Ifremer, …'
  },
  {
    id: 'territoires',
    type: 'input',
    value: '',
    name: 'Territoires',
    placeholder: 'Commune, département, région, …'
  },
  {
    id: 'domainesIds',
    name: 'Domaines',
    type: 'checkboxes',
    value: [],
    elements: [],
    component: markRaw(FiltresDomaines),
    elementsFormat
  },
  {
    id: 'typesIds',
    name: 'Types',
    type: 'checkboxes',
    value: [],
    elements: [],
    component: markRaw(FiltresTypes),
    elementsFormat
  },
  {
    id: 'statutsIds',
    name: 'Statuts',
    type: 'checkboxes',
    value: [],
    elements: [],
    component: markRaw(FiltresStatuts),
    elementsFormat
  }
]

export default filtres
