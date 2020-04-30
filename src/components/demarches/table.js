import Nom from '../_common/nom.vue'
import Statut from '../_common/statut.vue'
import CaminoDomaine from '../_common/domaine.vue'

const colonnes = [
  { id: 'titreNom', name: 'Titre' },
  { name: '', id: 'domaineId' },
  { id: 'titreType', name: 'Type de titre' },
  {
    id: 'titreStatut',
    name: 'Statut de titre',
    class: ['nowrap', 'min-width-6']
  },
  { id: 'type', name: 'Type' },
  { id: 'statut', name: 'Statut', class: ['nowrap'] }
]

const lignesBuild = demarches =>
  demarches.map(demarche => {
    const columns = {
      titreNom: { value: demarche.titre.nom },
      domaineId: {
        component: CaminoDomaine,
        props: { domaineId: demarche.titre.domaine.id },
        value: demarche.titre.domaine.id
      },
      titreType: {
        component: Nom,
        props: { nom: demarche.titre.type.type.nom },
        value: demarche.titre.type.type.nom
      },
      titreStatut: {
        component: Statut,
        props: {
          color: demarche.titre.statut.couleur,
          nom: demarche.titre.statut.nom
        },
        value: demarche.titre.statut.nom
      },
      type: {
        component: Nom,
        props: { nom: demarche.type.nom },
        value: demarche.type.nom
      },
      statut: {
        component: Statut,
        props: {
          color: demarche.statut.couleur,
          nom: demarche.statut.nom
        },
        value: demarche.statut.nom
      }
    }

    return {
      id: demarche.id,
      link: { name: 'titre', params: { id: demarche.titre.id } },
      columns
    }
  })

export { colonnes, lignesBuild }
