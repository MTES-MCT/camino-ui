<template>
  <div>
    <Url
      :params="preferences"
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

  computed: {
    preferences() {
      return this.$store.state.titresDemarches.preferences.table
    }
  },

  methods: {
    demarchesUpdate(params) {
      this.$emit('demarches:update', params)
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
