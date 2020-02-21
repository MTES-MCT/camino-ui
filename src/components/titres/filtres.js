import FiltresDomaines from './filtres/domaines.vue'
import FiltresStatuts from './filtres/statuts.vue'

const filtres = [
  { name: 'Types', id: 'types', type: 'checkboxes', values: [] },
  {
    name: 'Domaines',
    id: 'domaines',
    type: 'checkboxes',
    values: [],
    component: FiltresDomaines
  },
  {
    name: 'Statuts',
    id: 'statuts',
    type: 'checkboxes',
    values: [],
    component: FiltresStatuts
  },
  {
    id: 'noms',
    type: 'input',
    values: [],
    name: 'Nom',
    placeholder: '…'
  },
  {
    id: 'entreprises',
    type: 'input',
    values: [],
    name: 'Entreprises',
    placeholder: 'Nom ou siret'
  },
  {
    id: 'substances',
    type: 'input',
    values: [],
    name: 'Substances',
    placeholder: 'Or, Argent, Ag, …'
  },
  {
    id: 'references',
    type: 'input',
    values: [],
    name: 'Références',
    placeholder: 'Référence DGEC, DEAL, DEB, BRGM, Ifremer, …'
  },
  {
    id: 'territoires',
    type: 'input',
    values: [],
    name: 'Territoires',
    placeholder: 'Commune, département, région, …'
  }
]

export default filtres
