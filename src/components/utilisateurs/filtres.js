import FiltresAdministrations from './filtres-custom-administrations.vue'
import FiltresEntreprises from './filtres-custom-entreprises.vue'

// supprime les clés dont les valeurs sont vides
// et les objets vides
const administrationsClean = value => {
  if (!value) return null

  const administrations = value.reduce((administrations, administration) => {
    // si l'id de l'administration n'est pas renseigné
    // alors on ignore
    if (!administration.administrationId) return administrations

    administration = Object.keys(administration)
      .sort()
      .reduce((o, k) => {
        if (administration[k] !== '') {
          o[k] = administration[k]
        }

        return o
      }, {})

    if (Object.keys(administration).length) {
      administrations.push(administration)
    }

    return administrations
  }, [])

  return administrations.length ? administrations : null
}

const entreprisesClean = value => {
  if (!value) return null

  const entreprises = value.reduce((entreprises, entreprise) => {
    // si l'id de l'entreprise n'est pas renseigné
    // alors on ignore
    if (!entreprise.entrepriseId) return entreprises

    entreprise = Object.keys(entreprise)
      .sort()
      .reduce((o, k) => {
        if (entreprise[k] !== '') {
          o[k] = entreprise[k]
        }

        return o
      }, {})

    if (Object.keys(entreprise).length) {
      entreprises.push(entreprise)
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
    id: 'administrationFiltreIds',
    name: 'Administrations',
    type: 'custom',
    value: [],
    elements: [],
    component: FiltresAdministrations,
    clean: administrationsClean
  },
  {
    id: 'entrepriseFiltreIds',
    name: 'Entreprises',
    type: 'custom',
    value: [],
    elements: [],
    component: FiltresEntreprises,
    clean: entreprisesClean
  }
]

export default filtres
