/* eslint-disable vue/one-component-per-file */
import Vue from 'vue'
import TagList from '../_ui/tag-list.vue'
import List from '../_ui/list.vue'
import CaminoDomaine from '../_common/domaine.vue'
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
    id: 'coordonnees',
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
    const columns = {
      nom: {
        component: Vue.component('TitreNom', {
          render(h) {
            return h('p', { class: ['bold', 'mb-0'] }, titre.nom)
          }
        }),
        value: titre.nom
      },
      domaine: {
        component: CaminoDomaine,
        props: { domaineId: titre.domaine.id },
        value: titre.domaine.id
      },
      coordonnees: {
        component: CoordonneesIcone,
        props: { coordonnees: titre.coordonnees },
        value: titre.coordonnees ? '·' : ''
      },
      type: {
        component: Vue.component('TitreTypeNom', {
          render(h) {
            return h(
              'p',
              { class: ['h5', 'bold', 'cap-first', 'mb-0'] },
              titre.type.type.nom
            )
          }
        }),
        value: titre.type.type.nom
      },
      statut: {
        component: Statut,
        props: {
          color: titre.statut.couleur,
          nom: titre.statut.nom
        },
        value: titre.statut.nom
      },
      substances: {
        component: TagList,
        props: { elements: titre.substances.map(s => s.nom) },
        class: 'mb--xs',
        value: titre.substances.map(s => s.nom).join(', ')
      },
      titulaires: {
        component: List,
        props: {
          elements: titre.titulaires.map(({ nom }) => nom),
          mini: true
        },
        class: 'mb--xs',
        value: titre.titulaires.map(({ nom }) => nom).join(', ')
      },
      regions: {
        component: List,
        props: {
          elements: titre.pays?.length
            ? titre.pays.flatMap(pay =>
                pay.regions?.length ? pay.regions.map(({ nom }) => nom) : []
              )
            : [],
          mini: true
        },
        class: 'mb--xs'
      },
      departements: {
        component: List,
        props: {
          elements: titre.pays?.length
            ? titre.pays.flatMap(pay =>
                pay.regions?.length
                  ? pay.regions.flatMap(region =>
                      region.departements.map(({ nom }) => nom)
                    )
                  : []
              )
            : [],
          mini: true
        },
        class: 'mb--xs'
      },
      references: {
        component: List,
        props: {
          elements: titre.references.map(ref => `${ref.type.nom} : ${ref.nom}`),
          mini: true
        },
        class: 'mb--xs'
      }
    }

    if (activitesCol) {
      columns.activites = {
        component: ActivitesPills,
        props: {
          activitesAbsentes: titre.activitesAbsentes,
          activitesEnConstruction: titre.activitesEnConstruction
        },
        value: titre.activitesAbsentes + titre.activitesEnConstruction
      }
    }

    return {
      id: titre.id,
      link: { name: 'titre', params: { id: titre.id } },
      columns
    }
  })

export { titresColonnes, titresLignesBuild }
