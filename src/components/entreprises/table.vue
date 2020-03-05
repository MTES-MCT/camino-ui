<template>
  <Table
    ref="table"
    :rows="lignes"
    :columns="colonnes"
    :params="params"
    @params:update="preferencesUpdate"
  />
</template>

<script>
import Table from '../_ui/table.vue'

export default {
  name: 'EntreprisesTable',

  components: {
    Table
  },

  props: {
    entreprises: {
      type: Array,
      required: true
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
      ],
      preferences: {
        intervalle: 200,
        page: 1,
        ordre: 'asc',
        colonne: 'nom'
      }
    }
  },

  computed: {
    params() {
      return Object.keys(this.preferences).reduce((params, id) => {
        if (id === 'intervalle') {
          params.range = this.preferences.intervalle
        } else if (id === 'ordre') {
          params.order = this.preferences.ordre
        } else if (id === 'colonne') {
          params.column = this.preferences.colonne
        } else {
          params[id] = this.preferences[id]
        }

        return params
      }, {})
    },
    lignes() {
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
  },

  methods: {
    preferencesUpdate(params) {
      if (params.range) {
        params.intervalle = params.range
        delete params.range
      }

      if (params.column) {
        params.colonne = params.column
        delete params.column
      }

      if (params.order) {
        params.ordre = params.order
        delete params.order
      }

      Object.keys(params).forEach(id => {
        this.preferences[id] = params[id]
      })
    }
  }
}
</script>
