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
          id: 'type',
          name: 'Type'
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
      return this.demarches.map(demarche => {
        const columns = {
          titre: { value: demarche.titre.nom },
          type: { value: demarche.type.nom },
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
