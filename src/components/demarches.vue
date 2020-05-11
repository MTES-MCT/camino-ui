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
      class="tablet-blobs tablet-flex-direction-reverse"
    >
      <div class="tablet-blob-1-3 flex mb-s">
        <Downloads
          v-if="demarches.length"
          :formats="['csv', 'xlsx', 'ods']"
          section="demarches"
          class="flex-right full-x"
        />
      </div>
      <div class="tablet-blob-2-3 flex">
        <div class="py-m h6 bold mb-xs">
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
import Downloads from './_common/downloads.vue'

export default {
  name: 'Demarches',

  components: {
    DemarchesTable,
    DemarchesFiltres,
    Downloads
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
    this.eventTrack()
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
    },

    eventTrack(id = null) {
      if (this.$matomo) {
        if (id) {
          this.$matomo.trackEvent('page-demarches', 'accès-page-demarches', id)
        } else {
          this.$matomo.trackEvent('page-demarches', 'accès-page-demarches')
        }
      }
    }
  }
}
</script>
