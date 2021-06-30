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
import paramsEventTrack from '../../utils/matomo-tracker.js'

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

    definitions() {
      return this.$store.state.titres.definitions
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
      paramsEventTrack(
        params,
        this.definitions,
        this.$matomo,
        'titres',
        'filtres'
      )
    },

    filtresToggle(opened) {
      if (opened) {
        this.paramsEventTrack()
      }
    }
  }
}
</script>
