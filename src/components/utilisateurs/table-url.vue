<template>
  <div>
    <Url
      :params="params"
      :values="preferences"
      @params:update="preferencesUpdate"
    />
    <Table
      :utilisateurs="utilisateurs"
      @utilisateurs:update="utilisateursUpdate"
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
    utilisateurs: { type: Array, required: true }
  },

  computed: {
    preferences() {
      return this.$store.state.utilisateurs.preferences.table
    },

    params() {
      const paramsIds = Object.keys(this.preferences)

      return this.$store.state.utilisateurs.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})
    }
  },

  methods: {
    utilisateursUpdate() {
      this.$emit('utilisateurs:update')
    },

    preferencesUpdate(params) {
      this.$store.dispatch('utilisateurs/preferencesSet', {
        section: 'table',
        params
      })
    }
  }
}
</script>
