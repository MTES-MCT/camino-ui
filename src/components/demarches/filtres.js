import FiltresTitresDomaines from '../_common/filtres/domaines.vue'
import FiltresTitresStatuts from '../_common/filtres/statuts.vue'
import FiltresEtapes from './filtres-custom-etapes.vue'

// supprime les clés dont les valeurs sont vides
// et les objets vides
const etapesClean = value => {
  if (!value) return null

  const etapes = value.reduce((etapes, etape) => {
    // si le type d'étape n'est pas renseigné
    // alors on ignore l'étape en entier
    if (!etape.typeId) return etapes

    etape = Object.keys(etape)
      .sort()
      .reduce((o, k) => {
        if (etape[k] !== '') {
          o[k] = etape[k]
        }

        return o
      }, {})

    if (Object.keys(etape).length) {
      etapes.push(etape)
    }

    return etapes
  }, [])

  return etapes.length ? etapes : null
}

const filtres = [
  {
    id: 'titresDomainesIds',
    name: 'Domaines',
    type: 'checkboxes',
    value: [],
    elements: [],
    component: FiltresTitresDomaines
  },
  {
    id: 'titresTypesIds',
    name: 'Types de titre',
    type: 'checkboxes',
    value: [],
    elements: []
  },
  {
    id: 'titresStatutsIds',
    name: 'Statuts de titre',
    type: 'checkboxes',
    value: [],
    elements: [],
    component: FiltresTitresStatuts
  },
  { id: 'typesIds', name: 'Types', type: 'checkboxes', value: [] },
  {
    id: 'statutsIds',
    name: 'Statuts',
    type: 'checkboxes',
    value: [],
    elements: [],
    component: FiltresTitresStatuts
  },
  { id: 'noms', type: 'input', value: '', name: 'Noms', placeholder: '…' },
  {
    id: 'entreprises',
    type: 'input',
    value: '',
    name: 'Entreprises',
    placeholder: 'Nom ou siret'
  },
  {
    id: 'substances',
    type: 'input',
    value: '',
    name: 'Substances',
    placeholder: 'Or, Argent, Ag, …'
  },
  {
    id: 'references',
    type: 'input',
    value: '',
    name: 'Références',
    placeholder: 'Référence DGEC, DEAL, DEB, BRGM, Ifremer, …'
  },
  {
    id: 'territoires',
    type: 'input',
    value: '',
    name: 'Territoires',
    placeholder: 'Commune, département, région, …'
  },
  {
    id: 'etapesInclues',
    name: "Types d'étapes incluses",
    type: 'custom',
    value: [],
    elements: [],
    component: FiltresEtapes,
    clean: etapesClean
  },
  {
    id: 'etapesExclues',
    name: "Types d'étapes exclues",
    type: 'custom',
    value: [],
    elements: [],
    component: FiltresEtapes,
    clean: etapesClean
  }
]

export default filtres
