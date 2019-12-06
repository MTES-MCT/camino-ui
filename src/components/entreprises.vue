<template>
  <Card>
    <div class="flex">
      <h1>Entreprises</h1>

      <button
        v-if="permissionsCheck(['super', 'admin', 'editeur'])"
        class="btn-border rnd-xs py-s px-m mb flex-right"
        @click="addPopupOpen"
      >
        <i class="icon-24 icon-plus" />
      </button>
    </div>

    <Loader v-if="!loaded" />
    <EntreprisesTable
      v-else
      :entreprises="entreprises"
    />
  </Card>
</template>

<script>
import Card from './_ui/card.vue'
import Loader from './_ui/loader.vue'
import EntreprisesTable from './entreprises/table.vue'
import EntrepriseAddPopup from './entreprise/add-popup.vue'

export default {
  name: 'Entreprises',

  components: {
    Loader,
    Card,
    EntreprisesTable
  },

  data() {
    return {
      filtersOpened: false
    }
  },

  computed: {
    entreprises() {
      return this.$store.state.entreprises.list
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.entreprises
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
      await this.$store.dispatch('entreprises/get')
    },

    addPopupOpen() {
      this.$store.commit('popupOpen', {
        component: EntrepriseAddPopup
      })
    }
  }
}
</script>
