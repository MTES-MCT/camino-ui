import FiltresTitresDomaines from '../_common/filtres/domaines.vue'
import FiltresTitresStatuts from '../_common/filtres/statuts.vue'
import FiltresEtapes from './filtres-custom-etapes.vue'

const filtres = [
  {
    id: 'titresDomainesIds',
    name: 'Domaines',
    type: 'checkboxes',
    value: [],
    elements: [],
    component: FiltresTitresDomaines
  },
  {
    id: 'titresTypesIds',
    name: 'Types de titre',
    type: 'checkboxes',
    value: [],
    elements: []
  },
  {
    id: 'titresStatutsIds',
    name: 'Statuts de titre',
    type: 'checkboxes',
    value: [],
    elements: [],
    component: FiltresTitresStatuts
  },
  { id: 'typesIds', name: 'Types', type: 'checkboxes', value: [] },
  {
    id: 'statutsIds',
    name: 'Statuts',
    type: 'checkboxes',
    value: [],
    elements: [],
    component: FiltresTitresStatuts
  },
  {
    id: 'etapesInclues',
    name: "Types d'étapes incluses",
    type: 'custom',
    value: [],
    elements: [],
    component: FiltresEtapes
  },
  {
    id: 'etapesExclues',
    name: "Types d'étapes exclues",
    type: 'custom',
    value: [],
    elements: [],
    component: FiltresEtapes
  }
]

export default filtres
