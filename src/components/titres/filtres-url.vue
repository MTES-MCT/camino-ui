<template>
  <div>
    <Url
      v-if="metasLoaded"
      :values="filtresUrlValues"
      :params="preferences"
      @params:update="preferencesFiltresUpdate"
      @loaded="$emit('loaded')"
    />

    <Filtres
      :filtres="filtres"
      :loaded="metasLoaded"
      :metas="metas"
      :preferences="preferences"
      @preferences:update="preferencesFiltresUpdateAndPageReset"
      @toggle="filtresToggle"
    />
  </div>
</template>

<script>
import Url from '../_ui/url.vue'
import Filtres from '../_common/filtres.vue'

import filtres from './filtres.js'

export default {
  components: { Url, Filtres },

  props: {
    metasLoaded: { type: Boolean, required: true }
  },

  data() {
    return {
      filtres
    }
  },

  computed: {
    metas() {
      return {
        domaines: this.$store.state.titres.metas.domaines,
        types: this.$store.state.titres.metas.types,
        statuts: this.$store.state.titres.metas.statuts
      }
    },

    preferences() {
      return this.$store.state.titres.preferences.filtres
    },

    filtresUrlValues() {
      const paramsIds = Object.keys(this.preferences)

      return this.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})
    },

    params() {
      return this.$store.state.titres.params
    }
  },

  methods: {
    preferencesFiltresUpdateAndPageReset(params) {
      this.preferencesFiltresUpdate(params)
      this.$store.dispatch('titres/preferencesSet', {
        section: 'filtres',
        params: { page: 1 }
      })

      this.preferencesMapIni()
    },

    preferencesFiltresUpdate(params) {
      this.$store.dispatch('titres/preferencesSet', {
        section: 'filtres',
        params
      })

      this.paramsEventTrack(params)
    },

    // Enregistre le zoom et le centre initaux dans les preferences avec les valeurs courantes
    preferencesMapIni() {
      const zoomIni = this.$store.state.titres.preferences.carte.zoom
      const centreIni = this.$store.state.titres.preferences.carte.centre
      this.$store.dispatch('titres/preferencesSet', {
        section: 'carte',
        params: { zoomIni, centreIni }
      })
    },

    paramsEventTrack(params) {
      if (this.$matomo) {
        if (params) {
          this.params.forEach(({ type, id }) => {
            let values = []
            if (type === 'string' && params[id]) {
              values = params[id].split(' ').map(p => p.replace("'", ' '))
            } else if (type === 'strings' && params[id]) {
              values = params[id]
            }
            values.forEach(value => {
              this.$matomo.trackEvent(
                'titres-filtres',
                `titres-filtres-${id}`,
                value
              )
              this.$matomo.trackSiteSearch(value, id)
            })
          })
        } else {
          this.$matomo.trackEvent('titres', 'filtres', 'filtres-titres')
        }
      }
    },

    filtresToggle(opened) {
      if (opened) {
        this.paramsEventTrack()
      }
    }
  }
}
</script>
