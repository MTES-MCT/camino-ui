<template>
  <liste
    :nom="nom"
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
        :params="{ travaux: travaux }"
        class="flex-right full-x"
      />
    </template>
  </liste>
</template>

<script>
import Liste from '../_common/liste.vue'
import Downloads from '../_common/downloads.vue'
import paramsEventTrack from '../../utils/matomo-tracker.js'

import { demarchesColonnes, demarchesLignesBuild } from './table'
import filtres from './filtres'

export default {
  name: 'Demarches',

  components: { Liste, Downloads },

  props: {
    travaux: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      colonnes: demarchesColonnes,
      filtres
    }
  },

  computed: {
    nom() {
      return this.travaux ? 'travaux' : 'demarches'
    },
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
      await this.$store.dispatch('titresDemarches/init', {
        travaux: this.travaux
      })
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
