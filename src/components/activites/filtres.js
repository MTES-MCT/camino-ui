const filtres = [
  {
    id: 'titresNoms',
    type: 'input',
    value: '',
    name: 'Noms de titre',
    placeholder: '…'
  },
  {
    id: 'titresEntreprises',
    type: 'input',
    value: '',
    name: 'Entreprises',
    placeholder: 'Nom ou siret'
  },
  {
    id: 'titresSubstances',
    type: 'input',
    value: '',
    name: 'Substances',
    placeholder: 'Or, Argent, Ag, …'
  },
  {
    id: 'titresReferences',
    type: 'input',
    value: '',
    name: 'Références',
    placeholder: 'Référence DGEC, DEAL, DEB, BRGM, Ifremer, …'
  },
  {
    id: 'titresTerritoires',
    type: 'input',
    value: '',
    name: 'Territoires',
    placeholder: 'Commune, département, région, …'
  },
  {
    id: 'typesIds',
    name: 'Types',
    type: 'checkboxes',
    value: [],
    elements: []
  },
  {
    id: 'annees',
    name: 'Années',
    type: 'select',
    value: [],
    elements: [],
    elementName: 'nom',
    buttonAdd: 'Ajouter une année',
    isNumber: true
  }
]

export default filtres
