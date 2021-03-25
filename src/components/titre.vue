<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <div v-if="titre.doublonTitreId" class="p-m bg-warning color-bg mb">
      Ce titre est un doublon. Le titre déjà existant est :
      <a class="color-bg" :href="`/titres/${titre.doublonTitreId}`">{{
        titre.doublonTitreId
      }}</a
      >.
    </div>

    <TitreHeader :titre="titre" @titre-event-track="eventTrack" />

    <TitreInfos :titre="titre" class="mb" />

    <div v-if="titre.geojsonMultiPolygon && titre.points">
      <div class="tablet-blobs tablet-flex-direction-reverse">
        <div class="tablet-blob-1-2 flex mb-s">
          <TitreDownloadCsv
            v-if="titre.points.length"
            :titre="titre"
            class="mr-s flex-right"
          />
          <TitreDownloadGeojson v-if="titre.points.length" :titre="titre" />
        </div>

        <div class="tablet-blob-1-2 flex">
          <div
            v-for="tab in geoTabs"
            :key="tab.id"
            class="mr-xs"
            :class="{ active: geoTabActiveId === tab.id }"
          >
            <button
              v-if="geoTabActiveId !== tab.id"
              class="p-m btn-tab rnd-t-s"
              @click="geoTabToggle(tab.id)"
            >
              <i :class="`icon-${tab.icon}`" class="icon-24" />
            </button>
            <div v-else class="p-m span-tab rnd-t-s">
              <i :class="`icon-${tab.icon}`" class="icon-24" />
            </div>
          </div>
        </div>
      </div>

      <div class="line-neutral width-full" />

      <TitreMap
        v-if="titre.geojsonMultiPolygon && geoTabActiveId === 'carte'"
        :geojson="titre.geojsonMultiPolygon"
        :points="titre.points"
        :domaine-id="titre.domaine.id"
        :type-id="titre.type.type.id"
        @titre-event-track="eventTrack"
      />

      <div
        v-if="titre.points && geoTabActiveId === 'points'"
        class="points width-full bg-alt"
      >
        <div class="container bg-bg py">
          <TitrePoints :points="titre.points" />
        </div>
      </div>

      <div class="line width-full mb" />
    </div>

    <TitreTerritoires
      :pays="titre.pays"
      :forets="titre.forets"
      :surface="titre.surface"
    />

    <div class="line width-full mb-xl" />

    <TitreRepertoire
      :titulaires="titre.titulaires"
      :amodiataires="titre.amodiataires"
      :administrations="titre.administrations"
      @titre-event-track="eventTrack"
    />

    <div v-if="tabs.length > 1">
      <div class="flex">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="mr-xs"
          :class="{ active: tabActiveId === tab.id }"
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
      <div class="line-neutral width-full mb" />
    </div>

    <TitreDemarches
      v-if="tabActiveId === 'demarches'"
      :demarches="titre.demarches"
      @titre-event-track="eventTrack"
    />

    <TitreActivitesList
      v-if="titre.activites.length && tabActiveId === 'activites'"
      :activites="titre.activites"
      :titre-id="titre.id"
    />

    <TitreTravaux
      v-if="tabActiveId === 'travaux'"
      :travaux="titre.travaux"
      @titre-event-track="eventTrack"
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
import TitreTravaux from './titre/travaux.vue'
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
    TitreDownloadGeojson,
    TitreTravaux
  },

  data() {
    return {
      tabActiveId: 'demarches',
      geoTabActiveId: 'carte',
      geoTabs: [
        { id: 'carte', nom: 'Carte', icon: 'globe' },
        { id: 'points', nom: 'Points', icon: 'list' }
      ],
      show: false
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
    },

    tabs() {
      const tabs = [{ id: 'demarches', nom: 'Droits miniers' }]

      if (this.titre?.activites?.length) {
        tabs.push({ id: 'activites', nom: 'Activités' })
      }

      if (this.titre?.travaux?.length || this.titre?.travauxCreation) {
        tabs.push({ id: 'travaux', nom: 'Travaux' })
      }

      return tabs
    }
  },

  watch: {
    tabs: function (tabs) {
      const tabsActivesIds = tabs.map(({ id }) => id)

      if (!tabsActivesIds.includes(this.tabActiveId)) {
        this.tabActiveId = tabsActivesIds[0]
      }
    },
    $route: 'get',

    user: 'get'
  },

  async created() {
    await this.get()
  },

  beforeUnmount() {
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

      this.tabActiveId = tabId
    },

    geoTabToggle(tabId) {
      this.eventTrack({
        categorie: 'titre-sections',
        action: `titre-vue${tabId}_consulter`,
        nom: this.$store.state.titre.current.id
      })

      this.geoTabActiveId = tabId
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    }
  }
}
</script>
