const elementsFormat = (id, metas) => metas[id.replace(/Ids/g, '')]

const utilisateursFiltres = [
  {
    id: 'nomsPrenoms',
    type: 'input',
    value: '',
    name: 'Noms, Prénoms',
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
    elements: [],
    elementsFormat
  },
  {
    id: 'administrationIds',
    name: 'Administrations',
    type: 'select',
    value: [],
    elements: [],
    buttonAdd: 'Ajouter une administration',
    elementName: 'abreviation',
    elementsFormat
  },
  {
    id: 'entrepriseIds',
    name: 'Entreprises',
    type: 'select',
    value: [],
    elements: [],
    buttonAdd: 'Ajouter une entreprise',
    elementName: 'nom',
    elementsFormat
  }
]

export default utilisateursFiltres
