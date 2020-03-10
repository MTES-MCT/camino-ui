<template>
  <div>
    <Url
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
    }
  },

  methods: {
    titresUpdate(params) {
      this.$emit('titres:update', params)
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
