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
import Statut from '../_common/statut.vue'

export default {
  name: 'ActivitesTable',

  components: {
    Table
  },

  props: {
    activites: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      colonnes: [
        {
          id: 'type',
          name: 'Type'
        },
        {
          id: 'titre',
          name: 'Titre'
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
          name: 'Statut'
        }
      ]
    }
  },

  computed: {
    elements() {
      return this.activites.map(activite => {
        const columns = {
          type: { value: activite.type.nom },
          annee: { value: activite.annee },
          periode: { value: activite.periode.nom },
          statut: {
            component: Statut,
            props: {
              color: `bg-${activite.statut.couleur}`,
              nom: activite.statut.nom,
              mini: true
            },
            value: activite.statut.nom
          },
          titre: { value: activite.titre.nom }
        }

        return {
          id: activite.id,
          link: { name: 'activite', params: { id: activite.id } },
          columns
        }
      })
    }
  }
}
</script>
