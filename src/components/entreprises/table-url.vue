<template>
  <div>
    <Url
      :params="params"
      :values="preferences"
      @params:update="preferencesUpdate"
    />
    <Table :entreprises="entreprises" @entreprises:update="entreprisesUpdate" />
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
    entreprises: { type: Array, required: true }
  },

  computed: {
    preferences() {
      return this.$store.state.entreprises.preferences.table
    },

    params() {
      const paramsIds = Object.keys(this.preferences)

      return this.$store.state.entreprises.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})
    }
  },

  methods: {
    entreprisesUpdate() {
      console.log('entreprisesUpdate de table-url')
      this.$emit('entreprises:update')
    },

    preferencesUpdate(params) {
      this.$store.dispatch('entreprises/preferencesSet', {
        section: 'table',
        params
      })
    }
  }
}
</script>
