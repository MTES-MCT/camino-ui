<template>
  <div>
    <Url
      :params="preferences"
      :values="values"
      @params-update="preferencesUpdate"
      @loaded="$emit('loaded')"
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

  data() {
    return {
      values: {
        zoom: { type: 'number', min: 1, max: 18 },
        centre: { type: 'tuple' }
      }
    }
  },

  computed: {
    preferences() {
      const { zoom, centre } = this.$store.state.titres.preferences.carte

      return { zoom, centre }
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
