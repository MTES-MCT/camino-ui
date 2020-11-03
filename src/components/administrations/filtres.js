import { elementsFormat } from '../../utils/index'

const filtres = [
  {
    id: 'noms',
    type: 'input',
    value: '',
    name: 'Nom',
    placeholder: `Nom de l'administration`
  },
  {
    id: 'typesIds',
    name: 'Types',
    type: 'checkboxes',
    value: [],
    elements: [],
    elementsFormat
  }
]

export default filtres
