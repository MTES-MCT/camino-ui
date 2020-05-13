import FiltresAdministrations from './filtres-custom-administrations.vue'
import FiltresEntreprises from './filtres-custom-entreprises.vue'

// supprime les clés dont les valeurs sont vides
// et les objets vides
const administrationsClean = value => {
  if (!value) return null

  const administrations = value.reduce((administrations, administration) => {
    if (administration.administrationId !== '') {
      administrations.push(administration.administrationId)
    }

    return administrations
  }, [])

  return administrations.length ? administrations : null
}

const entreprisesClean = value => {
  if (!value) return null

  const entreprises = value.reduce((entreprises, entreprise) => {
    if (entreprise.entrepriseId !== '') {
      entreprises.push(entreprise.entrepriseId)
    }

    return entreprises
  }, [])

  return entreprises.length ? entreprises : null
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
    placeholder: 'prenom.nom@domaine.fr, onf, gouv, ...'
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
    clean: administrationsClean
  },
  {
    id: 'entrepriseIds',
    name: 'Entreprises',
    type: 'custom',
    value: [],
    elements: [],
    component: FiltresEntreprises,
    clean: entreprisesClean
  }
]

export default filtres
