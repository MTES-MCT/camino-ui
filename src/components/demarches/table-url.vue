<template>
  <div>
    <Url
      :params="params"
      :values="preferences"
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
    },

    params() {
      const paramsIds = Object.keys(this.preferences)

      return this.$store.state.titresDemarches.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})
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
