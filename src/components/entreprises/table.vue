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
import Table from '../ui/table.vue'

export default {
  name: 'Entreprises',

  components: {
    Table
  },

  props: {
    entreprises: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      colonnes: [
        {
          id: 'nom',
          name: 'Nom'
        },
        {
          id: 'siren',
          name: 'Siren'
        }
      ]
    }
  },

  computed: {
    elements() {
      return this.entreprises.map(entreprise => {
        const columns = {
          nom: { value: entreprise.nom },
          siren: {
            value: entreprise.legalEtranger || entreprise.legalSiren || '–'
          }
        }

        return {
          id: entreprise.id,
          link: { name: 'entreprise', params: { id: entreprise.id } },
          columns
        }
      })
    }
  }
}
</script>
