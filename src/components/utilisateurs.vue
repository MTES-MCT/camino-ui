<template>
  <div>
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
          <span class="mt-xxs">Ajouter un utilisateur</span>  <i class="icon-24 icon-plus flex-right" />
        </button>
      </div>
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
          {{ utilisateurs.length }}
        </div>
      </div>
    </div>

    <div class="line-neutral" />

    <Loader v-if="!loaded" />
    <UtilisateursTable
      v-else
      :utilisateurs="utilisateurs"
    />
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'
import Downloads from './_common/downloads.vue'
import UtilisateursTable from './utilisateurs/table.vue'
import UtilisateurEditPopup from './utilisateur/edit-popup.vue'

export default {
  name: 'Utilisateurs',

  components: {
    Loader,
    Downloads,
    UtilisateursTable
  },

  data() {
    return {
      filtersOpened: false
    }
  },

  computed: {
    utilisateurs() {
      return this.$store.state.utilisateurs.list
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.utilisateurs
    },

    resultat() {
      return `${this.utilisateurs.length} résultat${
        this.utilisateurs.length > 1 ? 's' : ''
      }`
    }
  },

  watch: {
    user: 'get'
  },

  created() {
    this.get()
  },

  methods: {
    async get() {
      await this.$store.dispatch('utilisateurs/get')
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
