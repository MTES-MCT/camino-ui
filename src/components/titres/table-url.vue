<template>
  <div>
    <Url
      :params="preferences"
      :values="values"
      @params:update="preferencesUpdate"
    />
    <Table :titres="titres" />
  </div>
</template>

<script>
import Url from '../_ui/url.vue'
import Table from './table.vue'

export default {
  components: {
    Url,
    Table
  },

  props: {
    titres: { type: Array, required: true }
  },

  data() {
    return {
      values: {
        ordre: { type: 'array', values: ['asc', 'desc'] },
        colonne: {
          type: 'array',
          values: ['nom', 'domaine', 'type', 'statut', 'activitesTotal']
        }
      }
    }
  },

  computed: {
    preferences() {
      return this.$store.state.titres.preferences.table
    }
  },

  methods: {
    preferencesUpdate(params) {
      this.$store.dispatch('titres/preferencesSet', {
        section: 'table',
        params
      })
    }
  }
}
</script>
