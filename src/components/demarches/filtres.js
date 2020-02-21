import FiltresTitresDomaines from '../titres/filtres/domaines.vue'
import FiltresTitresStatuts from '../titres/filtres/statuts.vue'

const filtres = [
  {
    name: 'Domaines miniers',
    id: 'titresDomaines',
    type: 'checkboxes',
    values: [],
    component: FiltresTitresDomaines
  },
  {
    name: 'Types de titres',
    id: 'titresTypes',
    type: 'checkboxes',
    values: []
  },
  {
    name: 'Statuts des titres',
    id: 'titresStatuts',
    type: 'checkboxes',
    values: [],
    component: FiltresTitresStatuts
  },
  {
    name: 'Types des démarches',
    id: 'types',
    type: 'checkboxes',
    values: []
  },
  {
    name: 'Statuts des démarches',
    id: 'statuts',
    type: 'checkboxes',
    values: [],
    component: FiltresTitresStatuts
  }
]

export default filtres
