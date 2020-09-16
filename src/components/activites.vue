<template>
  <liste
    v-if="visible"
    nom="activités"
    :filtres="filtres"
    :colonnes="colonnes"
    :lignes="lignes"
    :elements="activites"
    :preferences="preferences"
    :metas="metas"
    :params="params"
    :total="total"
    :loaded="metasLoaded"
    @preferences:update="preferencesUpdate"
    @loaded="activitesLoad"
  >
    <Downloads
      v-if="activites.length"
      slot="downloads"
      :formats="['csv', 'xlsx', 'ods']"
      section="activites"
      class="flex-right full-x"
    />
  </liste>
</template>

<script>
import Liste from './_common/liste.vue'
import Downloads from './_common/downloads.vue'

import filtres from './activites/filtres'
import { activitesColonnes, activitesLignesBuild } from './activites/table'

export default {
  name: 'Activites',

  components: { Liste, Downloads },

  data() {
    return {
      filtres,
      colonnes: activitesColonnes,
      metasLoaded: false,
      urlsLoaded: false,
      visible: false
    }
  },

  computed: {
    user() {
      return this.$store.state.user.current
    },

    activites() {
      return this.$store.state.titresActivites.list
    },

    total() {
      return this.$store.state.titresActivites.total
    },

    preferences() {
      return this.$store.state.titresActivites.preferences
    },

    metas() {
      return this.$store.state.titresActivites.metas
    },

    params() {
      return this.$store.state.titresActivites.params
    },

    lignes() {
      return activitesLignesBuild(this.activites)
    }
  },

  watch: {
    user: 'metasGet',

    preferences: {
      handler: function() {
        this.activitesGet()
      },
      deep: true
    }
  },

  async created() {
    await this.metasGet()
  },

  destroyed() {
    this.$store.commit('titresActivites/set', { elements: [], total: 0 })
  },

  methods: {
    async metasGet() {
      if (!this.user || !this.user.sections || !this.user.sections.activites) {
        await this.$store.dispatch('pageError')
      } else {
        this.visible = true
        await this.$store.dispatch(`titresActivites/metasGet`)
        if (!this.metasLoaded) {
          this.metasLoaded = true
        }
      }
    },

    activitesLoad() {
      this.urlsLoaded = true
      this.activitesGet()
    },

    async activitesGet() {
      if (this.metasLoaded && this.urlsLoaded) {
        await this.$store.dispatch(`titresActivites/get`)
      }
    },

    async preferencesUpdate(options) {
      await this.$store.dispatch(`titresActivites/preferencesSet`, options)
    }
  }
}
</script>
