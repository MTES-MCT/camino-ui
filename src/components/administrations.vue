<template>
  <liste
    nom="administrations"
    :filtres="filtres"
    :colonnes="colonnes"
    :lignes="lignes"
    :elements="administrations"
    :preferences="preferences"
    :metas="metas"
    :params="params"
    :total="total"
    :initialized="initialized"
    @preferences-update="preferencesUpdate"
  >
    <template v-if="administrations.length" #downloads>
      <Downloads
        :formats="['csv', 'xlsx', 'ods']"
        section="administrations"
        class="flex-right full-x"
      />
    </template>
  </liste>
</template>

<script>
import Liste from './_common/liste.vue'
import Downloads from './_common/downloads.vue'

import filtres from './administrations/filtres'
import {
  administrationsColonnes,
  administrationsLignesBuild
} from './administrations/table'

export default {
  name: 'Administrations',

  components: { Liste, Downloads },

  data() {
    return {
      filtres,
      colonnes: administrationsColonnes
    }
  },

  computed: {
    user() {
      return this.$store.state.user.current
    },

    administrations() {
      return this.$store.state.administrations.elements
    },

    total() {
      return this.$store.state.administrations.total
    },

    preferences() {
      return this.$store.state.administrations.preferences
    },

    metas() {
      return this.$store.state.administrations.metas
    },

    params() {
      return this.$store.state.administrations.params
    },

    lignes() {
      return administrationsLignesBuild(this.administrations)
    },

    initialized() {
      return this.$store.state.administrations.initialized
    }
  },

  watch: {
    user: 'init'
  },

  async created() {
    await this.init()
  },

  unmounted() {
    this.$store.commit('administrations/reset')
  },

  methods: {
    async init() {
      await this.$store.dispatch('administrations/init')
    },

    async preferencesUpdate(options) {
      await this.$store.dispatch(`administrations/preferencesSet`, options)
    }
  }
}
</script>
