<template>
  <div>
    <Url
      :values="valeurs"
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
      return this.$store.state.titresDemarches.preferences.filtres
    },
    valeurs() {
      const {
        types,
        statuts,
        titresDomaines,
        titresTypes,
        titresStatuts
      } = this.$store.state.titresDemarches.metas

      return {
        typesIds: types.map(({ id }) => id),
        statutsIds: statuts.map(({ id }) => id),
        titresDomainesIds: titresDomaines.map(({ id }) => id),
        titresTypesIds: titresTypes.map(({ id }) => id),
        titresStatutsIds: titresStatuts.map(({ id }) => id)
      }
    }
  },

  methods: {
    demarchesUpdate(params) {
      this.$emit('demarches:update', params)
    },

    preferencesUpdate(params) {
      this.$store.dispatch('titresDemarches/preferencesSet', {
        section: 'filtres',
        params
      })
    }
  }
}
</script>
