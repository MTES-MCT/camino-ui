<template>
  <Card>
    <div class="flex">
      <h1>Utilisateurs</h1>

      <button
        v-if="permissionsCheck(['super', 'admin'])"
        class="btn-border rnd-xs py-s px-m mb flex-right"
        @click="addPopupOpen"
      >
        <i class="icon-24 icon-plus" />
      </button>
    </div>

    <Loader v-if="!loaded" />
    <UtilisateursTable
      v-else
      :utilisateurs="utilisateurs"
    />
  </Card>
</template>

<script>
import Card from './_ui/card.vue'
import Loader from './_ui/loader.vue'
import UtilisateursTable from './utilisateurs/table.vue'
import UtilisateurEditPopup from './utilisateur/edit-popup.vue'

export default {
  name: 'Utilisateurs',

  components: {
    Loader,
    Card,
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
            entreprisesIds: [],
            administrationsIds: []
          },
          action: 'create'
        }
      })
    }
  }
}
</script>
