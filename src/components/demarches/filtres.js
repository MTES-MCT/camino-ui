import FiltresTitresDomaines from '../_common/filtres/domaines.vue'
import FiltresTitresStatuts from '../_common/filtres/statuts.vue'
import FiltresEtapes from './filtres-custom-etapes.vue'

const elementsFormat = (id, metas) => metas[id.replace(/Ids/g, '')]
const etapesElementsFormat = (id, metas) => metas.etapesTypes

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
    component: FiltresTitresDomaines,
    elementsFormat
  },
  {
    id: 'titresTypesIds',
    name: 'Types de titre',
    type: 'checkboxes',
    value: [],
    elements: [],
    elementsFormat
  },
  {
    id: 'titresStatutsIds',
    name: 'Statuts de titre',
    type: 'checkboxes',
    value: [],
    elements: [],
    component: FiltresTitresStatuts,
    elementsFormat
  },
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
    elementsFormat
  },
  {
    id: 'statutsIds',
    name: 'Statuts',
    type: 'checkboxes',
    value: [],
    elements: [],
    component: FiltresTitresStatuts,
    elementsFormat
  },
  {
    id: 'etapesInclues',
    name: "Types d'étapes incluses",
    type: 'custom',
    value: [],
    elements: [],
    component: FiltresEtapes,
    clean: etapesClean,
    elementsFormat: etapesElementsFormat
  },
  {
    id: 'etapesExclues',
    name: "Types d'étapes exclues",
    type: 'custom',
    value: [],
    elements: [],
    component: FiltresEtapes,
    clean: etapesClean,
    elementsFormat: etapesElementsFormat
  }
]

export default filtres
