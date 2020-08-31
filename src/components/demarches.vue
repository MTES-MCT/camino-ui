<template>
  <liste
    nom="démarches"
    :filtres="filtres"
    :colonnes="colonnes"
    :lignes="lignes"
    :elements="demarches"
    :preferences="preferences"
    :metas="metas"
    :params="params"
    :total="total"
    :loaded="metasLoaded"
    @preferences:update="preferencesUpdate"
    @preferencesFiltres:reset="preferencesFiltresReset"
    @loaded="demarchesLoad"
  >
    <Downloads
      v-if="demarches.length"
      slot="downloads"
      :formats="['csv', 'xlsx', 'ods']"
      section="demarches"
      class="flex-right full-x"
    />
  </liste>
</template>

<script>
import Liste from './_common/liste.vue'
import Downloads from './_common/downloads.vue'

import filtres from './demarches/filtres'

import { demarchesColonnes, demarchesLignesBuild } from './demarches/table'

export default {
  name: 'Demarches',

  components: { Liste, Downloads },

  data() {
    return {
      colonnes: demarchesColonnes,
      metasLoaded: false,
      urlsLoaded: false,
      visible: false,
      filtres
    }
  },

  computed: {
    user() {
      return this.$store.state.user.current
    },

    demarches() {
      return this.$store.state.titresDemarches.list
    },

    total() {
      return this.$store.state.titresDemarches.total
    },

    preferences() {
      return this.$store.state.titresDemarches.preferences
    },

    metas() {
      return this.$store.state.titresDemarches.metas
    },

    params() {
      return this.$store.state.titresDemarches.params
    },

    lignes() {
      return demarchesLignesBuild(this.demarches)
    }
  },

  watch: {
    user: 'metasGet',

    preferences: {
      handler: function() {
        this.demarchesGet()
      },
      deep: true
    }
  },

  async created() {
    await this.metasGet()
  },

  destroyed() {
    this.$store.commit('titresDemarches/set', { elements: [], total: 0 })
  },

  methods: {
    async metasGet() {
      await this.$store.dispatch('titresDemarches/metasGet')
      if (!this.metasLoaded) {
        this.metasLoaded = true
      }
    },

    demarchesLoad() {
      this.urlsLoaded = true
      this.demarchesGet()
    },

    async demarchesGet() {
      if (this.metasLoaded && this.urlsLoaded) {
        await this.$store.dispatch('titresDemarches/get')
      }
    },

    async preferencesUpdate(options) {
      await this.$store.dispatch('titresDemarches/preferencesSet', options)

      if (options.section === 'filtres') {
        this.eventTrack(options.params)
      }
    },

    preferencesFiltresReset() {
      this.$store.dispatch('titresDemarches/preferencesFiltresReset')
    },

    eventTrack(params) {
      if (this.$matomo) {
        this.params.forEach(({ type, id }) => {
          let values = []
          if (type === 'string' && params[id]) {
            values = params[id].split(' ').map(p => p.replace("'", ' '))
          } else if (type === 'strings' && params[id]) {
            values = params[id]
          } else if (type === 'objects' && params[id]) {
            values = params[id].map(e => e.typeId)
          }
          values.forEach(value => {
            this.$matomo.trackEvent(
              'demarches-filtres',
              `demarches-filtres-${id}`,
              value
            )
            this.$matomo.trackSiteSearch(value, id)
          })
        })
      }
    }
  }
}
</script>
