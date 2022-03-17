import { markRaw } from '@vue/reactivity'
import TagList from '../_ui/tag-list.vue'
import List from '../_ui/list.vue'
import CaminoDomaine from '../_common/domaine.vue'
import TitreNom from '../_common/titre-nom.vue'
import TitreTypeTypeNom from '../_common/titre-type-type-nom.vue'
import CoordonneesIcone from '../_common/coordonnees-icone.vue'
import ActivitesPills from '../activites/pills.vue'
import Statut from '../_common/statut.vue'

const titresColonnes = [
  {
    id: 'nom',
    name: 'Nom',
    class: ['min-width-8']
  },
  {
    id: 'domaine',
    name: ''
  },
  {
    id: 'type',
    name: 'Type',
    class: ['min-width-8']
  },
  {
    id: 'statut',
    name: 'Statut',
    class: ['nowrap', 'min-width-5']
  },
  {
    id: 'activites',
    name: 'Activités',
    class: ['min-width-5']
  },
  {
    id: 'substances',
    name: 'Substances',
    class: ['min-width-6']
  },
  {
    id: 'coordonnees',
    name: 'Carte'
  },
  {
    id: 'titulaires',
    name: 'Titulaires',
    class: ['min-width-10']
  },
  {
    id: 'regions',
    name: 'Régions',
    class: ['min-width-8']
  },
  {
    id: 'departements',
    name: 'Départements',
    class: ['min-width-8']
  },
  {
    id: 'references',
    name: 'Références',
    class: ['min-width-8']
  }
]

const titresLignesBuild = (titres, activitesCol, ordre = 'asc') =>
  titres.map(titre => {
    const regions = titre.pays?.reduce(
      (acc, pay) => acc.concat(pay.regions?.map(({ nom }) => nom)),
      []
    )
    const departements = titre.pays?.reduce(
      (pays, pay) =>
        pays.concat(
          pay.regions?.reduce(
            (regions, region) =>
              regions.concat(region.departements?.map(({ nom }) => nom)),
            []
          )
        ),
      []
    )
    const references = titre.references?.map(
      ref => `${ref.type.nom} : ${ref.nom}`
    )
    const columns = {
      nom: {
        component: markRaw(TitreNom),
        props: { nom: titre.nom },
        value: titre.nom
      },
      domaine: {
        component: markRaw(CaminoDomaine),
        props: { domaineId: titre.domaine.id },
        value: titre.domaine.id
      },
      coordonnees: {
        component: markRaw(CoordonneesIcone),
        props: { coordonnees: titre.coordonnees },
        value: titre.coordonnees ? '·' : ''
      },
      type: {
        component: markRaw(TitreTypeTypeNom),
        props: { nom: titre.type.type.nom },
        value: titre.type.type.nom
      },
      statut: {
        component: markRaw(Statut),
        props: {
          color: titre.statut.couleur,
          nom: titre.statut.nom
        },
        value: titre.statut.nom
      },
      substances: {
        component: markRaw(TagList),
        props: { elements: titre.substances?.map(s => s.nom) },
        class: 'mb--xs',
        value: titre.substances?.map(s => s.nom).join(', ')
      },
      titulaires: {
        component: markRaw(List),
        props: {
          elements: titre.titulaires?.map(({ nom }) => nom),
          mini: true
        },
        class: 'mb--xs',
        value: titre.titulaires?.map(({ nom }) => nom).join(', ')
      },
      regions: {
        component: markRaw(List),
        props: {
          elements: regions,
          mini: true
        },
        class: 'mb--xs',
        value: regions
      },
      departements: {
        component: markRaw(List),
        props: {
          elements: departements,
          mini: true
        },
        class: 'mb--xs',
        value: departements
      },
      references: {
        component: List,
        props: {
          elements: references,
          mini: true
        },
        class: 'mb--xs',
        value: references
      }
    }

    if (activitesCol) {
      columns.activites = {
        component: markRaw(ActivitesPills),
        props: {
          activitesAbsentes: titre.activitesAbsentes,
          activitesEnConstruction: titre.activitesEnConstruction
        },
        value: titre.activitesAbsentes + titre.activitesEnConstruction
      }
    }

    return {
      id: titre.id,
      link: { name: 'titre', params: { id: titre.slug } },
      columns
    }
  })

export { titresColonnes, titresLignesBuild }
