import List from '../_ui/list.vue'

const utilisateursColonnes = [
  {
    id: 'nom',
    name: 'Nom',
    class: ['min-width-6']
  },
  {
    id: 'prenom',
    name: 'Prénom',
    class: ['min-width-6']
  },
  {
    id: 'email',
    name: 'Email'
  },
  {
    id: 'permissions',
    name: 'Permissions',
    class: ['min-width-6']
  },
  {
    id: 'lien',
    name: 'Lien',
    class: ['min-width-6']
  }
]

const utilisateursLignesBuild = utilisateurs =>
  utilisateurs.map(utilisateur => {
    let elements

    if (utilisateur.administrations && utilisateur.administrations.length) {
      elements = utilisateur.administrations.map(({ nom }) => nom)
    } else if (utilisateur.entreprises && utilisateur.entreprises.length) {
      elements = utilisateur.entreprises.map(({ nom }) => nom)
    }

    const lien =
      elements && elements.length
        ? {
            component: List,
            props: {
              elements,
              mini: true
            },
            class: 'mb--xs',
            value: elements.join(', ')
          }
        : { value: '' }

    const columns = {
      prenom: { value: utilisateur.prenom || '–' },
      nom: { value: utilisateur.nom || '–' },
      email: { value: utilisateur.email || '–', class: ['h5'] },
      permissions: {
        value: (utilisateur.permission && utilisateur.permission.nom) || '–',
        class: [
          'bg-neutral',
          'color-bg',
          'pill',
          'py-xs',
          'px-s',
          'small',
          'bold'
        ]
      },
      lien
    }

    return {
      id: utilisateur.id,
      link: { name: 'utilisateur', params: { id: utilisateur.id } },
      columns
    }
  })

export { utilisateursColonnes, utilisateursLignesBuild }
