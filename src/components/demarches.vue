<template>
  <liste
    nom="démarches"
    :filtres="filtres"
    :colonnes="colonnes"
    :lignes="lignes"
    :elements="demarches"
    :metas="metas"
    :params="params"
    :total="total"
    :initialized="initialized"
    @params-update="paramsUpdate"
  >
    <template v-if="demarches.length" #downloads>
      <Downloads
        :formats="['csv', 'xlsx', 'ods']"
        section="demarches"
        class="flex-right full-x"
      />
    </template>
  </liste>
</template>

<script>
import Liste from './_common/liste.vue'
import Downloads from './_common/downloads.vue'
import paramsEventTrack from '../utils/matomo.js'
import filtres from './demarches/filtres'

import { demarchesColonnes, demarchesLignesBuild } from './demarches/table'

export default {
  name: 'Demarches',

  components: { Liste, Downloads },

  data() {
    return {
      colonnes: demarchesColonnes,
      filtres
    }
  },

  computed: {
    user() {
      return this.$store.state.user.element
    },

    definitions() {
      return this.$store.state.titresDemarches.definitions
    },

    demarches() {
      return this.$store.state.titresDemarches.elements
    },

    total() {
      return this.$store.state.titresDemarches.total
    },

    metas() {
      return this.$store.state.titresDemarches.metas
    },

    params() {
      return this.$store.state.titresDemarches.params
    },

    lignes() {
      return demarchesLignesBuild(this.demarches)
    },

    initialized() {
      return this.$store.state.titresDemarches.initialized
    }
  },

  watch: {
    user: 'init',

    '$route.query': {
      handler: function () {
        this.$store.dispatch('titresDemarches/routeUpdate')
      }
    }
  },

  async created() {
    await this.init()
  },

  unmounted() {
    this.$store.commit('titresDemarches/reset')
  },

  methods: {
    async init() {
      await this.$store.dispatch('titresDemarches/init')
    },

    async paramsUpdate(options) {
      await this.$store.dispatch(`titresDemarches/paramsSet`, options)

      if (options.section === 'filtres') {
        this.eventTrack(options.params)
      }
    },

    eventTrack(params) {
      paramsEventTrack(
        params,
        this.definitions,
        this.$matomo,
        'demarches',
        'filtres'
      )
    }
  }
}
</script>
