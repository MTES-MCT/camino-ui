const utilisateursFiltres = [
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
    type: 'select',
    value: [],
    elements: [],
    buttonAdd: 'Ajouter une administration',
    elementName: 'abreviation'
  },
  {
    id: 'entrepriseIds',
    name: 'Entreprises',
    type: 'select',
    value: [],
    elements: [],
    buttonAdd: 'Ajouter une entreprise',
    elementName: 'nom'
  }
]

export default utilisateursFiltres
