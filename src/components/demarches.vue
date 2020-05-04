<template>
  <div>
    <div class="pt-s">
      <h1 class="mt-xs mb-m">
        Démarches
      </h1>
    </div>

    <DemarchesFiltres
      v-if="metasLoaded"
      @demarches:update="demarchesUpdate"
    />
    <div
      v-else
      class="py-s px-m mb-s"
    >
      …
    </div>

    <div
      class="tablet-blobs"
    >
      <div class="tablet-blob-1-2 flex">
        <div class="py-m h6 bold">
          {{ resultat }}
        </div>
      </div>
    </div>

    <div class="line" />

    <DemarchesTable
      :demarches="demarches"
      @demarches:update="demarchesUpdate"
    />
  </div>
</template>

<script>
import DemarchesTable from './demarches/table-url.vue'
import DemarchesFiltres from './demarches/filtres-url.vue'

export default {
  name: 'Demarches',

  components: {
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

    resultat() {
      const res =
        this.total > this.demarches.length
          ? `${this.demarches.length} / ${this.total}`
          : this.demarches.length
      return `${res} résultat${this.demarches.length > 1 ? 's' : ''}`
    }
  },

  watch: {
    user: 'metasGet'
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
