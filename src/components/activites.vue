<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <div class="pt-s">
      <h1 class="mt-xs mb-m">
        Activités
      </h1>
    </div>

    <ActivitesFiltres
      v-if="metasLoaded"
      @activites:update="activitesUpdate"
    />
    <div
      v-else
      class="py-s px-m mb-s"
    >
      …
    </div>

    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-2 flex mb-s">
        <ActivitesDownloadCsv
          v-if="activites.length && activiteType"
          :activites="activites"
          :activite-type-sections="activiteType.sections"
          class="mr-s flex-right"
        />
      </div>

      <div class="tablet-blob-1-2 flex">
        <div class="py-m h6 bold">
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
import ActivitesDownloadCsv from './activites/download-csv.vue'

export default {
  name: 'Activites',

  components: {
    Loader,
    ActivitesFiltres,
    ActivitesTable,
    ActivitesDownloadCsv
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

    activiteType() {
      if (this.typesIds && this.typesIds.length && this.typesIds.length === 1) {
        return this.activitesTypes.find(({ id }) => id === this.typesIds[0])
      } else {
        return false
      }
      // TODO : en raison des sections, ne gère les téléchargements csv que pour un type d'activités sélectionnés
      // return this.activitesTypes.find(({ id }) => id === this.typeId)
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
      await this.$store.dispatch('titresActivites/metasGet')
      if (!this.metasLoaded) {
        this.metasLoaded = true
      }
    }
  }
}
</script>
