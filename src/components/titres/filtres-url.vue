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
      return this.$store.state.user.preferences.titres.filtres
    }
  },

  methods: {
    titresUpdate(params) {
      this.$emit('titres:update', params)
    },

    preferencesUpdate(params) {
      this.$store.dispatch('user/preferencesSet', {
        section: 'titres.filtres',
        params
      })
    }
  }
}
</script>
