<template>
  <Loader v-if="!metasLoaded" />
  <div v-else>
    <div class="pt-s">
      <h1 class="mt-xs mb-m">
        Activités
      </h1>
    </div>

    <ActivitesFiltres @activites:update="activitesUpdate" />

    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-3 flex mb-s">
        <Downloads
          v-if="activites.length"
          :formats="['csv', 'xlsx', 'ods']"
          section="activites"
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

    <ActivitesTable
      :activites="activites"
      @activites:update="activitesUpdate"
    />
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'
import ActivitesFiltres from './activites/filtres-url.vue'
import ActivitesTable from './activites/table-url.vue'
import Downloads from './_common/downloads.vue'

export default {
  name: 'Activites',

  components: {
    Loader,
    ActivitesFiltres,
    ActivitesTable,
    Downloads
  },

  data() {
    return {
      metasLoaded: false
    }
  },

  computed: {
    activites() {
      return this.$store.state.titresActivites.list
    },

    total() {
      return this.$store.state.titresActivites.total
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.activites
    },

    activitesTypes() {
      return this.$store.state.titresActivites.metas.types
    },

    typesIds() {
      return this.$store.state.titresActivites.preferences.filtres.typesIds
    },

    resultat() {
      const res =
        this.total > this.activites.length
          ? `${this.activites.length} / ${this.total}`
          : this.activites.length
      return `${res} résultat${this.activites.length > 1 ? 's' : ''}`
    }
  },

  watch: {
    user: 'metasGet'
  },

  async created() {
    await this.metasGet()
  },

  methods: {
    async activitesUpdate() {
      await this.$store.dispatch('titresActivites/get')
    },

    async metasGet() {
      if (!this.user || !this.user.sections || !this.user.sections.activites) {
        await this.$store.dispatch('pageError')
      } else {
        await this.$store.dispatch('titresActivites/metasGet')
      }

      if (!this.metasLoaded) {
        this.metasLoaded = true
      }
    }
  }
}
</script>
