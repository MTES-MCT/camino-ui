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
    :initialized="initialized"
    @preferences-update="preferencesUpdate"
  >
    <template v-if="activites.length" #downloads>
      <Downloads
        :formats="['csv', 'xlsx', 'ods']"
        section="activites"
        class="flex-right full-x"
      />
    </template>
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
      return this.$store.state.titresActivites.elements
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

    initialized() {
      return this.$store.state.titresActivites.initialized
    }
  },

  watch: {
    user: 'init'
  },

  async created() {
    await this.init()
  },

  unmounted() {
    this.$store.commit('titresActivites/reset')
  },

  methods: {
    async init() {
      if (!this.user || !this.user.sections || !this.user.sections.activites) {
        await this.$store.dispatch('pageError')
      } else {
        this.visible = true
        await this.$store.dispatch('titresActivites/init')
      }
    },

    async preferencesUpdate(options) {
      await this.$store.dispatch(`titresActivites/preferencesSet`, options)
    }
  }
}
</script>
