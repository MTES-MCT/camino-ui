<template>
  <Card>
    <div class="flex">
      <h1>Démarches</h1>
    </div>

    <div
      v-if="!metasLoaded"
      class="py-s px-m mb-s"
    >
      …
    </div>
    <DemarchesFiltres
      v-else
      @demarches:update="demarchesUpdate"
    />

    <div
      class="tablet-blobs"
    >
      <div class="tablet-blob-1-2 flex">
        <div class="py-m h6 bold">
          {{ resultat }}
        </div>
      </div>
    </div>

    <div class="card-border" />

    <DemarchesTable
      :demarches="demarches"
      @demarches:update="demarchesUpdate"
    />
  </Card>
</template>

<script>
import Card from './_ui/card.vue'
import DemarchesTable from './demarches/table-url.vue'
import DemarchesFiltres from './demarches/filtres-url.vue'

export default {
  name: 'Demarches',

  components: {
    Card,
    DemarchesTable,
    DemarchesFiltres
  },

  data() {
    return {
      metasLoaded: false
    }
  },

  computed: {
    demarches() {
      return this.$store.state.titresDemarches.list
    },

    total() {
      return this.$store.state.titresDemarches.total
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.demarches
    },

    userLoaded() {
      return this.$store.state.user.loaded
    },

    resultat() {
      const res =
        this.total > this.demarches.length
          ? `${this.demarches.length} / ${this.total}`
          : this.demarches.length
      return `${res} résultat${this.demarches.length > 1 ? 's' : ''}`
    }
  },

  watch: {
    user: 'metasGet',
    userLoaded: 'metasGet'
  },

  async created() {
    await this.metasGet()
  },

  methods: {
    async demarchesUpdate() {
      await this.$store.dispatch('titresDemarches/get')
    },

    async metasGet() {
      await this.$store.dispatch('titresDemarches/metasGet')
      if (!this.metasLoaded) {
        this.metasLoaded = true
      }
    }
  }
}
</script>
