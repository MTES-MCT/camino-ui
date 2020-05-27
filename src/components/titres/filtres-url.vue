<template>
  <div>
    <Url
      :values="params"
      :params="preferences"
      @params:update="preferencesUpdate"
    />
    <Filtres @titres:update="titresUpdate" />
  </div>
</template>

<script>
import Url from '../_ui/url.vue'
import Filtres from './filtres.vue'

export default {
  components: {
    Url,
    Filtres
  },

  computed: {
    preferences() {
      return this.$store.state.titres.preferences.filtres
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
    titresUpdate() {
      this.$emit('titres:update')
    },

    preferencesUpdate(params) {
      this.$store.dispatch('titres/preferencesSet', {
        section: 'filtres',
        params
      })
    }
  }
}
</script>
