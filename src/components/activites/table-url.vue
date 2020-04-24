<template>
  <div>
    <Url
      :params="params"
      :values="preferences"
      @params:update="preferencesUpdate"
    />
    <Table
      :activites="activites"
      @activites:update="activitesUpdate"
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
    activites: { type: Array, required: true }
  },

  computed: {
    preferences() {
      return this.$store.state.titresActivites.preferences.table
    },

    params() {
      const paramsIds = Object.keys(this.preferences)

      return this.$store.state.titresActivites.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})
    }
  },

  methods: {
    activitesUpdate() {
      this.$emit('activites:update')
    },

    preferencesUpdate(params) {
      this.$store.dispatch('titresActivites/preferencesSet', {
        section: 'table',
        params
      })
    }
  }
}
</script>
