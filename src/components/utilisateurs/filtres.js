const filtres = [
  { id: 'noms', type: 'input', value: '', name: 'Noms', placeholder: 'Noms' },
  {
    id: 'prenoms',
    type: 'input',
    value: '',
    name: 'Prénoms',
    placeholder: 'Prénoms'
  },
  {
    id: 'email',
    type: 'input',
    value: '',
    name: 'Emails',
    placeholder: 'Email'
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
    type: 'checkboxes',
    value: [],
    elements: []
  },
  {
    id: 'entrepriseIds',
    name: 'Entreprises',
    type: 'checkboxes',
    value: [],
    elements: []
  }
]

export default filtres
