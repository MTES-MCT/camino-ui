import List from '../_ui/list.vue'
import Statut from '../_common/statut.vue'

const activitesColonnes = [
  {
    id: 'titre',
    name: 'Titre'
  },
  {
    id: 'titulaires',
    name: 'Titulaires',
    class: ['min-width-10']
  },
  {
    id: 'annee',
    name: 'Année'
  },
  {
    id: 'periode',
    name: 'Période'
  },
  {
    id: 'statut',
    name: 'Statut',
    class: ['min-width-5']
  }
]

const activitesLignesBuild = activites =>
  activites.map(activite => {
    const columns = {
      titre: { value: activite.titre.nom },
      titulaires: {
        component: List,
        props: {
          elements: activite.titre.titulaires.map(({ nom }) => nom),
          mini: true
        },
        class: 'mb--xs',
        value: activite.titre.titulaires.map(({ nom }) => nom).join(', ')
      },
      annee: { value: activite.annee },
      periode: { value: activite.periode.nom },
      statut: {
        component: Statut,
        props: {
          color: activite.statut.couleur,
          nom: activite.statut.nom
        },
        value: activite.statut.nom
      }
    }

    return {
      id: activite.id,
      link: { name: 'activite', params: { id: activite.id } },
      columns
    }
  })

export { activitesColonnes, activitesLignesBuild }
