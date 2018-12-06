<template>
  <Card>
    <div class="flex">
      <h2 class="mt-s">
        Utilisateurs
      </h2>

      <button
        class="btn-border rnd-xs p-s mb flex-right"
        @click="addPopupOpen"
      >
        <i class="icon-24 icon-24-plus" />
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
import EditPopup from './utilisateur/edit-popup.vue'

export default {
  name: 'Utilisateurs',

  components: {
    Loader,
    Card,
    UtilisateursTable
  },

  data () {
    return {
      filtersOpened: false
    }
  },

  computed: {
    utilisateurs () {
      return this.$store.state.utilisateurs.list
    },
    loaded () {
      return !!this.utilisateurs
    }
  },

  created () {
    this.get()
  },

  methods: {
    get () {
      this.$store.dispatch('utilisateurs/get')
    },
    addPopupOpen () {
      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          utilisateur: { permission: { id: 'defaut' } },
          creation: true
        }
      })
    }
  }
}
</script>
