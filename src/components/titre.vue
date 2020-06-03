<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <div
      v-if="titre.doublonTitreId"
      class="p-m bg-warning color-bg mb"
    >
      Ce titre est un doublon. Le titre déjà existant est :
      <a
        class="color-bg"
        :href="`/titres/${titre.doublonTitreId}`"
      >{{ titre.doublonTitreId }}</a>.
    </div>

    <TitreHeader
      :titre="titre"
      @titre:eventTrack="eventTrack"
    />

    <TitreInfos
      :titre="titre"
      class="mb"
    />

    <div v-if="titre.geojsonMultiPolygon && titre.points">
      <div class="tablet-blobs tablet-flex-direction-reverse">
        <div class="tablet-blob-1-2 flex mb-s">
          <TitreDownloadCsv
            v-if="titre.points.length"
            :titre="titre"
            class="mr-s flex-right"
          />
          <TitreDownloadGeojson
            v-if="titre.points.length"
            :titre="titre"
          />
        </div>

        <div class="tablet-blob-1-2 flex">
          <div
            v-for="tab in geoTabs"
            :key="tab.id"
            class="mr-xs"
            :class="{ active: geoTabActive === tab.id }"
          >
            <button
              v-if="geoTabActive !== tab.id"
              class="p-m btn-tab rnd-t-s"
              @click="geoTabToggle(tab.id)"
            >
              <i
                :class="`icon-${tab.icon}`"
                class="icon-24"
              />
            </button>
            <div
              v-else
              class="p-m span-tab rnd-t-s"
            >
              <i
                :class="`icon-${tab.icon}`"
                class="icon-24"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="line-neutral" />

      <TitreMap
        v-if="titre.geojsonMultiPolygon && geoTabActive === 'carte'"
        :geojson="titre.geojsonMultiPolygon"
        :points="titre.points"
        :domaine-id="titre.domaine.id"
        :type-id="titre.type.type.id"
        @titre:eventTrack="eventTrack"
      />

      <TitrePoints
        v-if="titre.points && geoTabActive === 'points'"
        :points="titre.points"
      />

      <div class="line mb" />
    </div>

    <TitreTerritoires
      :pays="titre.pays"
      :surface="titre.surface"
    />

    <div class="line mb-xl" />

    <TitreRepertoire
      :titulaires="titre.titulaires"
      :amodiataires="titre.amodiataires"
      :administrations="titre.administrations"
      @titre:eventTrack="eventTrack"
    />

    <div
      v-if="titre.demarches.length && titre.activites.length"
      class="flex"
    >
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="mr-xs"
        :class="{ active: tabActive === tab.id }"
      >
        <button
          :id="`cmn-titre-tab-${tab.id}`"
          class="p-m btn-tab rnd-t-s"
          @click="tabToggle(tab.id)"
        >
          {{ tab.nom }}
          <ActivitesPills
            v-if="tab.id === 'activites'"
            class="inline-block ml-s"
            :activites-absentes="titre.activitesAbsentes"
            :activites-en-construction="titre.activitesEnConstruction"
          />
        </button>
      </div>
    </div>

    <TitreDemarches
      v-if="tabActive === 'demarches'"
      :demarches="titre.demarches"
      @titre:eventTrack="eventTrack"
    />

    <TitreActivitesList
      v-if="titre.activites.length && tabActive === 'activites'"
      :activites="titre.activites"
    />
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'
import ActivitesPills from './activites/pills.vue'
import TitreHeader from './titre/header.vue'

import TitreInfos from './titre/infos.vue'
import TitreMap from './titre/map.vue'
import TitreTerritoires from './titre/territoires.vue'
import TitreRepertoire from './titre/repertoire.vue'
import TitreDemarches from './titre/demarches.vue'
import TitreActivitesList from './activites/list.vue'
import TitrePoints from './titre/points.vue'
import TitreDownloadCsv from './titre/download-csv.vue'
import TitreDownloadGeojson from './titre/download-geojson.vue'

export default {
  components: {
    Loader,
    ActivitesPills,
    TitreHeader,
    TitreInfos,
    TitreMap,
    TitreTerritoires,
    TitreRepertoire,
    TitreDemarches,
    TitreActivitesList,
    TitrePoints,
    TitreDownloadCsv,
    TitreDownloadGeojson
  },

  data() {
    return {
      tabActive: 'demarches',
      geoTabActive: 'carte',
      tabs: [
        { id: 'demarches', nom: 'Droits miniers' },
        { id: 'activites', nom: 'Activités' }
      ],
      geoTabs: [
        { id: 'carte', nom: 'Carte', icon: 'globe' },
        { id: 'points', nom: 'Points', icon: 'list' }
      ]
    }
  },

  computed: {
    titre() {
      return this.$store.state.titre.current
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.titre
    }
  },

  watch: {
    $route: 'get',

    user: 'get'
  },

  async created() {
    await this.get()
  },

  beforeDestroy() {
    this.$store.commit('titre/reset')
  },

  methods: {
    async get() {
      await this.$store.dispatch('titre/get', this.$route.params.id)
    },

    tabToggle(tabId) {
      this.eventTrack({
        categorie: 'titre-sections',
        action: `titre-${tabId}_consulter`,
        nom: this.$store.state.titre.current.id
      })
      this.tabActive = tabId
    },

    geoTabToggle(tabId) {
      this.eventTrack({
        categorie: 'titre-sections',
        action: `titre-vue${tabId}_consulter`,
        nom: this.$store.state.titre.current.id
      })
      this.geoTabActive = tabId
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    }
  }
}
</script>
