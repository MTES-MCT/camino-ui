<template>
  
  <loader v-if="!loaded" />
  <card v-else>
    <div class="flex">
      <h2 class="mt-s">Utilisateurs</h2>
    </div>

    <utilisateurs-table :utilisateurs="utilisateurs" />
  </card>
</template>

<script>
import Card from './ui/card.vue'
import Loader from './ui/loader.vue'
import UtilisateursTable from './utilisateurs/table.vue'

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
    }
  },

}
</script>
