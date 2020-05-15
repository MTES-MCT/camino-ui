import FiltresAdministrations from './filtres-custom-administrations.vue'
import FiltresEntreprises from './filtres-custom-entreprises.vue'

// supprime les id vides
const clean = value => {
  if (!value) return null

  value = value.filter(v => v !== '')

  return value.length ? value : null
}

const filtres = [
  {
    id: 'noms',
    type: 'input',
    value: '',
    name: 'Noms',
    placeholder: '...'
  },
  {
    id: 'prenoms',
    type: 'input',
    value: '',
    name: 'Prénoms',
    placeholder: '...'
  },
  {
    id: 'emails',
    type: 'input',
    value: '',
    name: 'Emails',
    placeholder: 'prenom.nom@domaine.fr, ...'
  },
  {
    id: 'permissionIds',
    name: 'Permissions',
    type: 'checkboxes',
    value: [],
    elements: []
  },
  {
    id: 'administrationIds',
    name: 'Administrations',
    type: 'custom',
    value: [],
    elements: [],
    component: FiltresAdministrations,
    clean
  },
  {
    id: 'entrepriseIds',
    name: 'Entreprises',
    type: 'custom',
    value: [],
    elements: [],
    component: FiltresEntreprises,
    clean
  }
]

export default filtres
