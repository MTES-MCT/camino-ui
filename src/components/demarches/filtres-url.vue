<template>
  <div>
    <Url
      :values="values"
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
    values() {
      const {
        types,
        statuts,
        titresDomaines,
        titresTypes,
        titresStatuts
      } = this.$store.state.titresDemarches.metas

      return {
        typesIds: { type: 'array', values: types.map(({ id }) => id) },
        statutsIds: { type: 'array', values: statuts.map(({ id }) => id) },
        titresDomainesIds: {
          type: 'array',
          values: titresDomaines.map(({ id }) => id)
        },
        titresTypesIds: {
          type: 'array',
          values: titresTypes.map(({ id }) => id)
        },
        titresStatutsIds: {
          type: 'array',
          values: titresStatuts.map(({ id }) => id)
        }
      }
    }
  },

  methods: {
    demarchesUpdate() {
      this.$emit('demarches:update')
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
