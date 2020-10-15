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
    :metas-loaded="metasLoaded"
    @preferences-update="preferencesUpdate"
    @url-load="urlLoad"
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
      v-if="administrations.length"
      slot="downloads"
      :formats="['csv', 'xlsx', 'ods']"
      section="administrations"
      class="flex-right full-x"
    />
  </liste>
</template>

<script>
import Liste from './_common/liste.vue'
import Downloads from './_common/downloads.vue'
import EntrepriseAddPopup from './entreprise/add-popup.vue'

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
      colonnes: administrationsColonnes,
      visible: false
    }
  },

  computed: {
    user() {
      return this.$store.state.user.current
    },

    administrations() {
      return this.$store.state.administrations.list
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

    metasLoaded() {
      return this.$store.state.administrations.loaded.metas
    }
  },

  watch: {
    user: 'metasGet'
  },

  async created() {
    await this.metasGet()
  },

  destroyed() {
    this.$store.commit('administrations/set', { elements: [], total: 0 })
  },

  methods: {
    async metasGet() {
      await this.$store.dispatch('administrations/metasGet')
    },

    urlLoad() {
      this.$store.dispatch('administrations/urlLoad')
    },

    async preferencesUpdate(options) {
      await this.$store.dispatch(`administrations/preferencesSet`, options)
    },

    addPopupOpen() {
      this.$store.commit('popupOpen', { component: EntrepriseAddPopup })
    }
  }
}
</script>
