import Vue from 'vue'
import PillList from '../_ui/pill-list.vue'
import List from '../_ui/list.vue'
import CaminoDomaine from '../_common/domaine.vue'
import ActivitesPills from '../activites/pills.vue'
import Statut from '../_common/statut.vue'

const colonnes = [
  {
    id: 'nom',
    name: 'Nom',
    class: ['min-width-8']
  },
  {
    name: '',
    id: 'domaine'
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
  }
]

const lignesBuild = (titres, activitesCol) =>
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
          nom: titre.statut.nom,
          mini: true
        },
        value: titre.statut.nom
      },
      substances: {
        component: PillList,
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

export { colonnes, lignesBuild }
