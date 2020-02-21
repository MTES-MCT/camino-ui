<template>
  <Table
    ref="table"
    :elements="elements"
    :columns="colonnes"
    @page:update="$emit('page:update', $event)"
    @range:update="$emit('range:update', $event)"
  />
</template>

<script>
import Table from '../_ui/table.vue'
import Nom from '../_common/nom.vue'
import Statut from '../_common/statut.vue'
import CaminoDomaine from '../_common/domaine.vue'

export default {
  name: 'DemarchesTable',

  components: {
    Table
  },

  props: {
    demarches: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      colonnes: [
        {
          id: 'titre',
          name: 'Titre'
        },
        {
          id: 'domaine',
          name: ''
        },
        {
          id: 'titreType',
          name: 'Type de titre'
        },
        {
          id: 'titreStatut',
          name: 'Statut de titre',
          class: ['nowrap']
        },
        {
          id: 'type',
          name: 'Type'
        },
        {
          id: 'statut',
          name: 'Statut',
          class: ['nowrap']
        }
      ]
    }
  },

  computed: {
    elements() {
      return this.demarches.map(demarche => {
        const columns = {
          titre: { value: demarche.titre.nom },
          domaine: {
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
              color: `bg-${demarche.titre.statut.couleur}`,
              nom: demarche.titre.statut.nom,
              mini: true
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
              color: `bg-${demarche.statut.couleur}`,
              nom: demarche.statut.nom,
              mini: true
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
    }
  }
}
</script>
