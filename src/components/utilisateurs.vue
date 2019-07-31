<template>
  <Card>
    <div class="flex">
      <h1>Utilisateurs</h1>

      <button
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
import Card from './ui/card.vue'
import Loader from './ui/loader.vue'
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
    get() {
      this.$store.dispatch('utilisateurs/get')
    },
    addPopupOpen() {
      this.$store.commit('popupOpen', {
        component: UtilisateurEditPopup,
        props: {
          utilisateur: { permission: { id: 'defaut' }, entreprisesIds: [] },
          action: 'create'
        }
      })
    }
  }
}
</script>
