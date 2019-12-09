<template>
  <Loader v-if="!loaded" />
  <Card
    v-else
  >
    <div class="flex">
      <h1>Activités</h1>
    </div>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-2 mb-s">
        <h6>Type</h6>

        <select
          v-model="activiteTypeId"
          class="p-s"
          @change="get"
        >
          <option
            v-for="at in activitesTypes"
            :key="at.id"
            :value="at.id"
            :disabled="activitesTypes.length < 1"
          >
            {{ at.nom }}
          </option>
        </select>
      </div>
      <div class="tablet-blob-1-2 mb-s">
        <h6>Année</h6>

        <select
          v-model="anneeId"
          class="p-s"
          @change="get"
        >
          <option
            v-for="annee in annees"
            :key="annee"
            :value="annee"
            :disabled="activitesTypes.length < 1"
          >
            {{ annee }}
          </option>
        </select>
      </div>
    </div>


    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-2 flex mb-s">
        <ActivitesDownloadCsv
          v-if="activites.length"
          :activites="activites"
          :activite-type-sections="activiteType.sections"
          class="mr-s flex-right"
        />
      </div>

      <div class="tablet-blob-1-2 flex">
        <div class="py-m">
          {{ activites.length }} résultat{{ activites.length > 1 ? 's' : '' }}
        </div>
      </div>
    </div>

    <div class="card-border" />

    <ActivitesTable
      :activites="activites"
    />
  </Card>
</template>

<script>
import Card from './_ui/card.vue'
import Loader from './_ui/loader.vue'
import ActivitesTable from './activites/table.vue'
import ActivitesDownloadCsv from './activites/download-csv.vue'

export default {
  name: 'Activites',

  components: {
    Loader,
    Card,
    ActivitesTable,
    ActivitesDownloadCsv
  },

  data() {
    return {
      activiteTypeId: null,
      annees: [2017, 2018, 2019],
      anneeId: null
    }
  },

  computed: {
    activites() {
      return this.$store.state.activites.list
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.activites
    },

    userLoaded() {
      return this.$store.state.user.loaded
    },

    activitesTypes() {
      return this.$store.state.metas.activites.activitesTypes
    },

    activiteType() {
      return this.activitesTypes.find(({ id }) => id === this.activiteTypeId)
    }
  },

  watch: {
    user: 'metasGet',

    userLoaded: 'metasGet',

    activitesTypes: 'activiteTypeIdUpdate'
  },

  created() {
    if (this.userLoaded) {
      this.metasGet()
    }
  },

  methods: {
    async metasGet() {
      await this.$store.dispatch('metas/activitesGet')
    },

    async get() {
      await this.$store.dispatch('activites/get', {
        annee: this.anneeId,
        typeId: this.activiteTypeId
      })
    },

    activiteTypeIdUpdate() {
      if (
        this.activitesTypes.length === 1 ||
        !this.activitesTypes.map(({ id }) => id).includes(this.activiteTypeId)
      ) {
        this.activiteTypeId = this.activitesTypes[0].id
      }
    }
  }
}
</script>
