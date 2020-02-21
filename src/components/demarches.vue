<template>
  <Loader v-if="!loaded" />
  <Card
    v-else
  >
    <div class="flex">
      <h1>Démarches</h1>
    </div>

    <DemarchesFiltres />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-2 flex">
        <div class="py-m">
          {{ demarches.length }} résultat{{ demarches.length > 1 ? 's' : '' }}
        </div>
      </div>
    </div>

    <div class="card-border" />

    <DemarchesTable
      :demarches="demarches"
    />
  </Card>
</template>

<script>
import Card from './_ui/card.vue'
import Loader from './_ui/loader.vue'
import DemarchesTable from './demarches/table.vue'
import DemarchesFiltres from './demarches/filtres.vue'

export default {
  name: 'Demarches',

  components: {
    Loader,
    Card,
    DemarchesTable,
    DemarchesFiltres
  },

  computed: {
    demarches() {
      return this.$store.state.demarches.list
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.demarches
    },

    filtresLoaded() {
      return this.$store.state.user.demarchesFiltresLoaded
    },

    userLoaded() {
      return this.$store.state.user.loaded
    }
  },

  watch: {
    user: 'metasGet',

    userLoaded: 'metasGet',

    filtresLoaded: 'get'
  },

  created() {
    if (this.userLoaded) {
      this.get()
    }
  },

  methods: {
    async get() {
      await this.$store.dispatch('demarches/get')
    },

    async metasGet() {
      await this.$store.dispatch('metas/demarchesGet')
    }
  }
}
</script>
