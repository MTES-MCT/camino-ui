<template>
  <div>
    <Loader v-if="!loaded" />
    <Card v-else>
      <TitreHeader :titre="titre" />

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
              v-for="(tab, tabId) in geoTabs"
              :key="tabId"
              class="mr-xs"
              :class="{ active: geoTabActive === tabId}"
            >
              <button
                v-if="geoTabActive !== tabId"
                class="p-m btn-tab rnd-t-xs"
                @click="geoTabToggle(tabId)"
              >
                <i
                  :class="`icon-${tab.icon}`"
                  class="icon-24"
                />
              </button>
              <div
                v-else
                class="p-m span-tab rnd-t-xs"
              >
                <i
                  :class="`icon-${tab.icon}`"
                  class="icon-24"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="card-border" />

        <TitreMap
          v-if="titre.geojsonMultiPolygon && geoTabActive === 'carte'"
          :geojson="titre.geojsonMultiPolygon"
          :points="titre.points"
          :domaine-id="titre.domaine.id"
        />

        <TitrePoints
          v-if="titre.points && geoTabActive === 'points'"
          :points="titre.points"
        />

        <div class="card-border mb" />
      </div>

      <TitreTerritoires
        :pays="titre.pays"
        :surface="titre.surface"
        :volume="titre.volume"
        :volume-unite="titre.volumeUnite && titre.volumeUnite.nom"
      />

      <TitreRepertoire
        :titulaires="titre.titulaires"
        :amodiataires="titre.amodiataires"
        :administrations="titre.administrations"
      />

      <div
        v-if="titre.demarches.length && titre.activites.length"
        class="flex"
      >
        <div
          v-for="(tab, tabId) in tabsActives"
          :key="tabId"
          class="mr-xs"
          :class="{ active: tabActive === tabId}"
        >
          <button
            class="p-m btn-tab rnd-t-xs"
            @click="tabToggle(tabId)"
          >
            {{ tab.nom }}
            <Pill
              v-if="tabId === 'activites' && titre.activitesAbsentes"
              :color="'bg-error'"
              class="mb--xs mr-xs"
            >
              {{ titre.activites && titre.activitesAbsentes }}
            </Pill>
            <Pill
              v-if="tabId === 'activites' && titre.activitesEnConstruction"
              :color="'bg-warning'"
              class="mb--xs mr-xs"
            >
              {{ titre.activites && titre.activitesEnConstruction }}
            </Pill>
          </button>
        </div>
        <div class="card-border" />
      </div>

      <TitreDemarches
        v-if="tabActive === 'demarches'"
        :demarches="titre.demarches"
      />

      <TitreActivites
        v-if="titre.activites.length && tabActive === 'activites'"
        :activites="titre.activites"
      />

      <TitreOutils />
    </Card>
  </div>
</template>

<script>
import Loader from './ui/loader.vue'
import Card from './ui/card.vue'
import Pill from './ui/pill.vue'
import TitreHeader from './titre/header.vue'
import TitreMap from './titre/map.vue'
import TitreTerritoires from './titre/territoires.vue'
import TitreRepertoire from './titre/repertoire.vue'
import TitreDemarches from './titre/demarches.vue'
import TitreActivites from './titre/activites.vue'
import TitreOutils from './titre/outils.vue'
import TitrePoints from './titre/points.vue'
import TitreDownloadCsv from './titre/download-csv.vue'
import TitreDownloadGeojson from './titre/download-geojson.vue'

export default {
  components: {
    Loader,
    Card,
    Pill,
    TitreHeader,
    TitreMap,
    TitreTerritoires,
    TitreRepertoire,
    TitreDemarches,
    TitreActivites,
    TitreOutils,
    TitrePoints,
    TitreDownloadCsv,
    TitreDownloadGeojson
  },

  data() {
    return {
      tabActive: 'demarches',
      geoTabActive: 'carte',
      tabs: {
        demarches: { nom: 'Droits miniers' },
        activites: { nom: 'Activités' }
      },
      geoTabs: {
        carte: { nom: 'Carte', icon: 'globe' },
        points: { nom: 'Points', icon: 'list' }
      }
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

    tabsActives() {
      const tabsActives = Object.keys(this.tabs).reduce(
        (tabs, tabId) => Object.assign(tabs, { [tabId]: this.tabs[tabId] }),
        {}
      )

      return tabsActives
    }
  },

  watch: {
    $route: 'get',

    tabsActives: function(tabsActivesNew) {
      const tabsActivesIds = Object.keys(tabsActivesNew)
      if (!tabsActivesIds.find(tabId => tabId === this.tabActive)) {
        this.tabActive = tabsActivesIds[0]
      }
    },

    user: 'get'
  },

  created() {
    this.get()
  },

  beforeDestroy() {
    this.$store.commit('titre/reset')
  },

  methods: {
    get() {
      this.$store.dispatch('titre/get', this.$route.params.id)
    },

    tabToggle(tabId) {
      this.tabActive = tabId
    },

    geoTabToggle(tabId) {
      this.geoTabActive = tabId
    }
  }
}
</script>
