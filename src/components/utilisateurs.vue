<template>
  <liste
    v-if="visible"
    nom="utilisateurs"
    :filtres="filtres"
    :colonnes="colonnes"
    :lignes="lignes"
    :elements="utilisateurs"
    :preferences="preferences"
    :metas="metas"
    :params="params"
    :total="total"
    :loaded="metasLoaded"
    @elements:update="utilisateursUpdate"
    @preferences:update="preferencesUpdate"
  >
    <button
      v-if="permissionsCheck(['super', 'admin'])"
      slot="addButton"
      class="btn rnd-xs py-s px-m full-x flex mb-s h5"
      @click="addPopupOpen"
    >
      <span class="mt-xxs">Ajouter un utilisateur</span>
      <i class="icon-24 icon-plus flex-right" />
    </button>

    <Downloads
      v-if="utilisateurs.length"
      slot="downloads"
      :formats="['csv', 'xlsx', 'ods']"
      section="utilisateurs"
      class="flex-right full-x"
    />
  </liste>
</template>

<script>
import Liste from './_common/liste.vue'
import Downloads from './_common/downloads.vue'
import UtilisateurEditPopup from './utilisateur/edit-popup.vue'

import filtres from './utilisateurs/filtres'
import {
  utilisateursColonnes,
  utilisateursLignesBuild
} from './utilisateurs/table'

export default {
  name: 'Utilisateurs',

  components: { Liste, Downloads },

  data() {
    return {
      filtres,
      colonnes: utilisateursColonnes,
      metasLoaded: false,
      visible: false
    }
  },

  computed: {
    user() {
      return this.$store.state.user.current
    },

    utilisateurs() {
      return this.$store.state.utilisateurs.list
    },

    total() {
      return this.$store.state.utilisateurs.total
    },

    preferences() {
      return this.$store.state.utilisateurs.preferences
    },

    metas() {
      return this.$store.state.utilisateurs.metas
    },

    params() {
      return this.$store.state.utilisateurs.params
    },

    lignes() {
      return utilisateursLignesBuild(this.utilisateurs)
    }
  },

  watch: {
    user: 'metasGet'
  },

  async created() {
    await this.metasGet()
  },

  methods: {
    async metasGet() {
      if (
        !this.user ||
        !this.user.sections ||
        !this.user.sections.utilisateurs
      ) {
        await this.$store.dispatch('pageError')
      } else {
        this.visible = true
        await this.$store.dispatch(`utilisateurs/metasGet`)
        if (!this.metasLoaded) {
          this.metasLoaded = true
        }
      }
    },

    async utilisateursUpdate() {
      if (this.metasLoaded) {
        await this.$store.dispatch(`utilisateurs/get`)
      }
    },

    async preferencesUpdate(options) {
      await this.$store.dispatch(`utilisateurs/preferencesSet`, options)
    },

    addPopupOpen() {
      this.$store.commit('popupOpen', {
        component: UtilisateurEditPopup,
        props: {
          utilisateur: {
            permissionId: 'defaut',
            entreprises: [],
            administrations: []
          },
          action: 'create'
        }
      })
    }
  }
}
</script>
