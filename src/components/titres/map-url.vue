<template>
  <div>
    <Url
      :params="preferences"
      @params:update="preferencesUpdate"
    />
    <Map :titres="titres" />
  </div>
</template>

<script>
import Url from '../_ui/url.vue'
import Map from './map.vue'

export default {
  components: {
    Url,
    Map
  },

  props: {
    titres: {
      type: Array,
      required: true
    }
  },

  computed: {
    preferences() {
      return this.$store.state.titres.preferences.carte
    }
  },

  methods: {
    preferencesUpdate(params) {
      this.$store.dispatch('titres/preferencesSet', {
        section: 'carte',
        params
      })
    }
  }
}
</script>
