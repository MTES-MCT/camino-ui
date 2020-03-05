import FiltresTitresDomaines from '../_common/filtres/domaines.vue'
import FiltresTitresStatuts from '../_common/filtres/statuts.vue'

const filtres = {
  titresDomainesIds: {
    name: 'Domaines',
    type: 'checkboxes',
    values: [],
    component: FiltresTitresDomaines
  },
  titresTypesIds: {
    name: 'Types de titre',
    type: 'checkboxes',
    values: []
  },
  titresStatutsIds: {
    name: 'Statuts de titre',
    type: 'checkboxes',
    values: [],
    component: FiltresTitresStatuts
  },
  typesIds: {
    name: 'Types',
    type: 'checkboxes',
    values: []
  },
  statutsIds: {
    name: 'Statuts',
    type: 'checkboxes',
    values: [],
    component: FiltresTitresStatuts
  }
}

export default filtres
