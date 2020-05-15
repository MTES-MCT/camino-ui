<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <div class="desktop-blobs pt-s">
      <div class="desktop-blob-2-3">
        <h1 class="mt-xs mb-m">
          <h1>Utilisateurs</h1>
        </h1>
      </div>

      <div class="desktop-blob-1-3">
        <button
          v-if="permissionsCheck(['super', 'admin'])"
          class="btn rnd-xs py-s px-m full-x flex mb-s h5"
          @click="addPopupOpen"
        >
          <span class="mt-xxs">Ajouter un utilisateur</span>
          <i class="icon-24 icon-plus flex-right" />
        </button>
      </div>
    </div>

    <UtilisateursFiltres
      v-if="metasLoaded"
      @utilisateurs:update="utilisateursUpdate"
    />
    <div
      v-else
      class="py-s px-m mb-s"
    >
      …
    </div>

    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-3 flex mb-s">
        <Downloads
          v-if="utilisateurs.length"
          :formats="['csv', 'xlsx', 'ods']"
          section="utilisateurs"
          class="flex-right full-x"
        />
      </div>

      <div class="tablet-blob-2-3 flex">
        <div class="py-m h6 bold mb-xs">
          {{ resultat }}
        </div>
      </div>
    </div>

    <div class="line" />

    <UtilisateursTable
      :utilisateurs="utilisateurs"
      @utilisateurs:update="utilisateursUpdate"
    />
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'
import Downloads from './_common/downloads.vue'
import UtilisateursFiltres from './utilisateurs/filtres-url.vue'
import UtilisateursTable from './utilisateurs/table-url.vue'
import UtilisateurEditPopup from './utilisateur/edit-popup.vue'

export default {
  name: 'Utilisateurs',

  components: {
    Loader,
    Downloads,
    UtilisateursFiltres,
    UtilisateursTable
  },

  data() {
    return {
      metasLoaded: false
    }
  },

  computed: {
    utilisateurs() {
      return this.$store.state.utilisateurs.list
    },

    total() {
      return this.$store.state.utilisateurs.total
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.utilisateurs
    },

    resultat() {
      const res =
        this.total > this.utilisateurs.length
          ? `${this.utilisateurs.length} / ${this.total}`
          : this.utilisateurs.length
      return `${res} résultat${this.utilisateurs.length > 1 ? 's' : ''}`
    }
  },

  watch: {
    user: 'metasGet'
  },

  created() {
    this.metasGet()
  },

  methods: {
    async utilisateursUpdate() {
      await this.$store.dispatch('utilisateurs/get')
    },

    async metasGet() {
      await this.$store.dispatch('utilisateurs/metasGet')
      if (!this.metasLoaded) {
        this.metasLoaded = true
      }
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
