<template>
  <div>
    <Url
      :params="preferences"
      :values="values"
      @params:update="preferencesUpdate"
    />
    <Table
      :demarches="demarches"
      @demarches:update="demarchesUpdate"
    />
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
    demarches: { type: Array, required: true }
  },

  data() {
    return {
      values: {
        ordre: { type: 'array', values: ['asc', 'desc'] },
        colonne: {
          type: 'array',
          values: [
            'titreNom',
            'titreDomaine',
            'titreType',
            'titreStatut',
            'type',
            'statut'
          ]
        }
      }
    }
  },

  computed: {
    preferences() {
      return this.$store.state.titresDemarches.preferences.table
    }
  },

  methods: {
    demarchesUpdate() {
      this.$emit('demarches:update')
    },

    preferencesUpdate(params) {
      this.$store.dispatch('titresDemarches/preferencesSet', {
        section: 'table',
        params
      })
    }
  }
}
</script>
