import FiltresDomaines from '../_common/filtres/domaines.vue'
import FiltresTypes from '../_common/filtres/types.vue'
import FiltresStatuts from '../_common/filtres/statuts.vue'

const filtres = {
  noms: {
    type: 'input',
    value: '',
    name: 'Noms',
    placeholder: '…'
  },
  entreprises: {
    type: 'input',
    value: '',
    name: 'Entreprises',
    placeholder: 'Nom ou siret'
  },
  substances: {
    type: 'input',
    value: '',
    name: 'Substances',
    placeholder: 'Or, Argent, Ag, …'
  },
  references: {
    type: 'input',
    value: '',
    name: 'Références',
    placeholder: 'Référence DGEC, DEAL, DEB, BRGM, Ifremer, …'
  },
  territoires: {
    type: 'input',
    value: '',
    name: 'Territoires',
    placeholder: 'Commune, département, région, …'
  },
  domainesIds: {
    name: 'Domaines',
    type: 'checkboxes',
    value: '',
    component: FiltresDomaines
  },
  typesIds: {
    name: 'Types',
    type: 'checkboxes',
    value: '',
    component: FiltresTypes
  },
  statutsIds: {
    name: 'Statuts',
    type: 'checkboxes',
    value: '',
    component: FiltresStatuts
  }
}

export default filtres
