<template>
  <div>
    <Url
      :params="preferences"
      @params:update="preferencesUpdate"
    />
    <Table :demarches="demarches" />
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
      return this.$store.state.user.preferences.demarches.table
    }
  },

  methods: {
    preferencesUpdate(params) {
      this.$store.dispatch('user/preferencesSet', {
        section: 'demarches.table',
        params
      })
    }
  }
}
</script>
