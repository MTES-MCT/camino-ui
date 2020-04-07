import FiltresTitresDomaines from '../_common/filtres/domaines.vue'
import FiltresTitresStatuts from '../_common/filtres/statuts.vue'

const filtres = {
  titresDomainesIds: {
    name: 'Domaines',
    type: 'checkboxes',
    value: '',
    component: FiltresTitresDomaines
  },
  titresTypesIds: {
    name: 'Types de titre',
    type: 'checkboxes',
    value: ''
  },
  titresStatutsIds: {
    name: 'Statuts de titre',
    type: 'checkboxes',
    value: '',
    component: FiltresTitresStatuts
  },
  typesIds: {
    name: 'Types',
    type: 'checkboxes',
    value: ''
  },
  statutsIds: {
    name: 'Statuts',
    type: 'checkboxes',
    value: '',
    component: FiltresTitresStatuts
  }
}

export default filtres
