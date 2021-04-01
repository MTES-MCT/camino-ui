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
    :initialized="initialized"
    @preferences-update="preferencesUpdate"
  >
    <template v-if="user.utilisateursCreation" #addButton>
      <button
        class="btn rnd-xs py-s px-m full-x flex mb-s h5"
        @click="addPopupOpen"
      >
        <span class="mt-xxs">Ajouter un utilisateur</span>
        <i class="icon-24 icon-plus flex-right" />
      </button>
    </template>

    <template v-if="utilisateurs.length" #downloads>
      <Downloads
        :formats="['csv', 'xlsx', 'ods']"
        section="utilisateurs"
        class="flex-right full-x"
      />
    </template>
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
      visible: false
    }
  },

  computed: {
    user() {
      return this.$store.state.user.element
    },

    utilisateurs() {
      return this.$store.state.utilisateurs.elements
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
    },

    initialized() {
      return this.$store.state.utilisateurs.initialized
    }
  },

  watch: {
    user: 'init'
  },

  async created() {
    await this.init()
  },

  unmounted() {
    this.$store.commit('utilisateurs/reset')
  },

  methods: {
    async init() {
      if (
        !this.user ||
        !this.user.sections ||
        !this.user.sections.utilisateurs
      ) {
        await this.$store.dispatch('pageError')
      } else {
        this.visible = true
        await this.$store.dispatch('utilisateurs/init')
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
