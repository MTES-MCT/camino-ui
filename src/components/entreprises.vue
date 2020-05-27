<template>
  <liste
    nom="entreprises"
    :filtres="filtres"
    :colonnes="colonnes"
    :lignes="lignes"
    :elements="entreprises"
    :preferences="preferences"
    :metas="metas"
    :params="params"
    :total="total"
    :loaded="metasLoaded"
    @elements:update="entreprisesUpdate"
    @preferences:update="preferencesUpdate"
  >
    <button
      v-if="permissionsCheck(['super', 'admin', 'editeur'])"
      slot="addButton"
      class="btn rnd-xs py-s px-m full-x flex mb-s h5"
      @click="addPopupOpen"
    >
      <span class="mt-xxs">Ajouter une entreprise</span>
      <i class="icon-24 icon-plus flex-right" />
    </button>

    <Downloads
      v-if="entreprises.length"
      slot="downloads"
      :formats="['csv', 'xlsx', 'ods']"
      section="entreprises"
      class="flex-right full-x"
    />
  </liste>
</template>

<script>
import Vue from 'vue'
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
      metasLoaded: false,
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

  created() {
    Vue.nextTick(() => {
      this.metasLoaded = true
    })
  },

  methods: {
    async entreprisesUpdate() {
      if (this.metasLoaded) {
        await this.$store.dispatch(`entreprises/get`)
      }
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
