<template>
  <div>
    <Url
      :params="preferences"
      :values="values"
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

  data() {
    return {
      values: {
        zoom: { type: 'number', min: 4, max: 18 },
        centre: { type: 'tuple' }
      }
    }
  },

  computed: {
    preferences() {
      return this.$store.state.titres.preferences.carteUrl
    }
  },

  methods: {
    preferencesUpdate(params) {
      this.$store.dispatch('titres/preferencesSet', {
        section: 'carteUrl',
        params
      })
    }
  }
}
</script>
