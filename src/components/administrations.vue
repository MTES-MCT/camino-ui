<template>
  <Liste
    nom="administrations"
    :filtres="filtres"
    :colonnes="colonnes"
    :lignes="lignes"
    :elements="administrations"
    :params="params"
    :metas="metas"
    :total="total"
    :initialized="initialized"
    @params-update="paramsUpdate"
  >
    <template v-if="administrations.length" #downloads>
      <Downloads
        :formats="['csv', 'xlsx', 'ods']"
        section="administrations"
        class="flex-right full-x"
      />
    </template>
  </Liste>
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
      return this.$store.state.user.element
    },

    administrations() {
      return this.$store.state.administrations.elements
    },

    total() {
      return this.$store.state.administrations.total
    },

    params() {
      return this.$store.state.administrations.params
    },

    metas() {
      return this.$store.state.administrations.metas
    },

    lignes() {
      return administrationsLignesBuild(this.administrations)
    },

    initialized() {
      return this.$store.state.administrations.initialized
    }
  },

  watch: {
    user: 'init',

    '$route.query': {
      handler: function () {
        this.$store.dispatch('administrations/routeUpdate')
      }
    }
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

    async paramsUpdate(options) {
      await this.$store.dispatch(`administrations/paramsSet`, options)
    }
  }
}
</script>
