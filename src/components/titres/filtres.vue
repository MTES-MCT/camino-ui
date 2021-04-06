<template>
  <Filtres
    :filtres="filtres"
    :initialized="initialized"
    :metas="metas"
    :params="params"
    @params-update="paramsFiltresUpdate"
    @toggle="filtresToggle"
  />
</template>

<script>
import Filtres from '../_common/filtres.vue'
import filtres from './filtres.js'

export default {
  components: { Filtres },

  props: {
    initialized: { type: Boolean, required: true }
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

    params() {
      return this.$store.state.titres.params.filtres
    },

    params() {
      return this.$store.state.titres.params
    }
  },

  methods: {
    paramsFiltresUpdate(params) {
      this.$store.dispatch('titres/paramsSet', {
        section: 'filtres',
        params
      })

      this.$store.dispatch('titres/paramsSet', {
        section: 'table',
        params: { page: 1 }
      })

      this.paramsEventTrack(params)
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
