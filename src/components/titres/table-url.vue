<template>
  <div>
    <Url
      :params="params"
      :values="preferences"
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

  computed: {
    preferences() {
      return this.$store.state.titres.preferences.table
    },

    params() {
      const paramsIds = Object.keys(this.preferences)

      return this.$store.state.titres.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})
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
