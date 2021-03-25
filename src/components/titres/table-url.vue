<template>
  <div class="table-view">
    <Url
      :params="preferences"
      :values="params"
      @params-update="preferencesUpdate"
      @loaded="$emit('loaded')"
    />
    <Table :titres="titres" :total="total" />
  </div>
</template>

<script>
import Url from '../_ui/url.vue'
import Table from './table-pagination.vue'

export default {
  components: {
    Url,
    Table
  },

  props: {
    titres: { type: Array, required: true },
    total: { type: Number, required: true }
  },

  emits: ['loaded'],

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
