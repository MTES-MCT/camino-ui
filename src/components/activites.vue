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
    :metas-loaded="metasLoaded"
    @preferences-update="preferencesUpdate"
    @url-load="urlLoad"
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
    },

    metasLoaded() {
      return this.$store.state.titresActivites.loaded.metas
    }
  },

  watch: {
    user: 'metasGet'
  },

  async created() {
    await this.metasGet()
  },

  destroyed() {
    this.$store.commit('titresActivites/reset')
  },

  methods: {
    async metasGet() {
      if (!this.user || !this.user.sections || !this.user.sections.activites) {
        await this.$store.dispatch('pageError')
      } else {
        this.visible = true
        await this.$store.dispatch('titresActivites/metasGet')
      }
    },

    urlLoad() {
      this.$store.dispatch('titresActivites/urlLoad')
    },

    async preferencesUpdate(options) {
      await this.$store.dispatch(`titresActivites/preferencesSet`, options)
    }
  }
}
</script>
