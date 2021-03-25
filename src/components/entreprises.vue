<template>
  <Liste
    nom="entreprises"
    :filtres="filtres"
    :colonnes="colonnes"
    :lignes="lignes"
    :elements="entreprises"
    :preferences="preferences"
    :metas="metas"
    :params="params"
    :total="total"
    :metas-loaded="true"
    @preferences-update="preferencesUpdate"
    @url-load="urlLoad"
  >
    <template v-if="user && user.entreprisesCreation" #addButton>
      <button
        class="btn rnd-xs py-s px-m full-x flex mb-s h5"
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
      return this.$store.state.user.current
    },

    entreprises() {
      return this.$store.state.entreprises.list
    },

    total() {
      return this.$store.state.entreprises.total
    },

    preferences() {
      return this.$store.state.entreprises.preferences
    },

    metas() {
      return this.$store.state.entreprises.metas
    },

    params() {
      return this.$store.state.entreprises.params
    },

    lignes() {
      return entreprisesLignesBuild(this.entreprises)
    }
  },

  unmounted() {
    this.$store.commit('entreprises/reset')
  },

  methods: {
    urlLoad() {
      console.log('urlLoad')
      this.$store.dispatch('entreprises/urlLoad')
    },

    async preferencesUpdate(options) {
      await this.$store.dispatch(`entreprises/preferencesSet`, options)
    },

    addPopupOpen() {
      this.$store.commit('popupOpen', { component: EntrepriseAddPopup })
    }
  }
}
</script>
