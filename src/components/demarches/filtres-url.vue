<template>
  <div>
    <Url
      :params="preferences"
      @params:update="preferencesUpdate"
    />
    <Filtres @demarches:update="demarchesUpdate" />
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
      return this.$store.state.user.preferences.demarches.filtres
    }
  },

  methods: {
    demarchesUpdate(params) {
      this.$emit('demarches:update', params)
    },

    preferencesUpdate(params) {
      this.$store.dispatch('user/preferencesSet', {
        section: 'demarches.filtres',
        params
      })
    }
  }
}
</script>
