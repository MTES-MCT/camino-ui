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
import List from '../_ui/list.vue'
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
          id: 'titre',
          name: 'Titre'
        },
        {
          id: 'titulaires',
          name: 'Titulaires',
          class: ['min-width-10']
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
          periode: { value: activite.periode.nom },
          statut: {
            component: Statut,
            props: {
              color: `bg-${activite.statut.couleur}`,
              nom: activite.statut.nom,
              mini: true
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
    }
  }
}
</script>
