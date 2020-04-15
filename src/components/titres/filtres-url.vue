<template>
  <div>
    <Url
      :params="preferences"
      :values="values"
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
    values() {
      const { types, statuts, domaines } = this.$store.state.titres.metas

      return {
        typesIds: { type: 'array', values: types.map(({ id }) => id) },
        statutsIds: { type: 'array', values: statuts.map(({ id }) => id) },
        domainesIds: { type: 'array', values: domaines.map(({ id }) => id) }
      }
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
