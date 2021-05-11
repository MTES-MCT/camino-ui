<template>
  <Liste
    nom="entreprises"
    :filtres="filtres"
    :colonnes="colonnes"
    :lignes="lignes"
    :elements="entreprises"
    :params="params"
    :total="total"
    :initialized="true"
    @params-update="paramsUpdate"
  >
    <template v-if="user && user.entreprisesCreation" #addButton>
      <button
        class="btn small rnd-xs py-s px-m full-x flex mb-s"
        @click="addPopupOpen"
      >
        <span class="mt-xxs">Ajouter une entreprise</span>
        <i class="icon-24 icon-plus flex-right" />
      </button>
    </template>

    <template v-if="entreprises.length" #downloads>
      <Downloads
        :formats="['csv', 'xlsx', 'ods']"
        section="entreprises"
        class="flex-right full-x"
      />
    </template>
  </Liste>
</template>

<script>
import Liste from './_common/liste.vue'
import Downloads from './_common/downloads.vue'
import EntrepriseAddPopup from './entreprise/add-popup.vue'

import filtres from './entreprises/filtres'
import {
  entreprisesColonnes,
  entreprisesLignesBuild
} from './entreprises/table'

export default {
  name: 'Entreprises',

  components: { Liste, Downloads },

  data() {
    return {
      filtres,
      colonnes: entreprisesColonnes,
      visible: false
    }
  },

  computed: {
    user() {
      return this.$store.state.user.element
    },

    entreprises() {
      return this.$store.state.entreprises.elements
    },

    total() {
      return this.$store.state.entreprises.total
    },

    params() {
      return this.$store.state.entreprises.params
    },

    lignes() {
      return entreprisesLignesBuild(this.entreprises)
    }
  },

  watch: {
    '$route.query': {
      handler: function () {
        this.$store.dispatch('entreprises/routeUpdate')
      }
    }
  },

  async created() {
    await this.init()
  },

  unmounted() {
    this.$store.commit('entreprises/reset')
  },

  methods: {
    async init() {
      await this.$store.dispatch('entreprises/init')
    },

    async paramsUpdate(options) {
      await this.$store.dispatch(`entreprises/paramsSet`, options)
    },

    addPopupOpen() {
      this.$store.commit('popupOpen', { component: EntrepriseAddPopup })
    }
  }
}
</script>
