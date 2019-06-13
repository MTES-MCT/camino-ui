<template>
  <Card>
    <div class="flex">
      <h1>Entreprises</h1>
    </div>

    <Loader v-if="!loaded" />
    <EntreprisesTable
      v-else
      :entreprises="entreprises"
    />
  </Card>
</template>

<script>
import Card from './ui/card.vue'
import Loader from './ui/loader.vue'
import EntreprisesTable from './entreprises/table.vue'

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
    get() {
      this.$store.dispatch('entreprises/get')
    }
  }
}
</script>
