import FiltresDomaines from '../_common/filtres/domaines.vue'
import FiltresStatuts from '../_common/filtres/statuts.vue'
import FiltresTypes from '../_common/filtres/types.vue'

import { elementsFormat } from '../../utils/index'

const filtres = [
  { id: 'noms', type: 'input', value: '', name: 'Noms', placeholder: '…' },
  {
    id: 'entreprises',
    type: 'input',
    value: '',
    name: 'Entreprises',
    placeholder: 'Nom ou siret'
  },
  {
    id: 'substances',
    type: 'input',
    value: '',
    name: 'Substances',
    placeholder: 'Or, Argent, Ag, …'
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
    component: FiltresDomaines,
    elementsFormat
  },
  {
    id: 'typesIds',
    name: 'Types',
    type: 'checkboxes',
    value: [],
    elements: [],
    component: FiltresTypes,
    elementsFormat
  },
  {
    id: 'statutsIds',
    name: 'Statuts',
    type: 'checkboxes',
    value: [],
    elements: [],
    component: FiltresStatuts,
    elementsFormat
  }
]

export default filtres
