<template>
  <div>
    <Loader v-if="!loaded" />
    <Card v-else>
      <TitreHeader :titre="titre" />

      <TitreMap
        v-if="titre.geojsonMultiPolygon"
        :geojson="titre.geojsonMultiPolygon"
        class="mb"
      />

      <TitreTerritoires
        :pays="titre.pays"
        :surface="titre.surface"
        :volume="titre.volume"
        :volume-unite="titre.volumeUnite && titre.volumeUnite.nom"
      />

      <TitreRepertoire
        class="hide"
        :titulaires="titre.titulaires"
        :amodiataires="titre.amodiataires"
        :administrations="titre.administrations"
      />

      <div
        v-if="titre.demarches.length && titre.activites.length"
        class="flex"
      >
        <div
          v-for="(tabName, tabId) in tabsActives"
          :key="tabId"
          class="mr-xs"
          :class="{ active: tabActive === tabId}"
        >
          <button
            class="p-m btn-tab rnd-s-t"
            @click="tabToggle(tabId)"
          >
            {{ tabName }}
          </button>
        </div>
      </div>

      <TitreDemarches
        v-if="titre.demarches.length && tabActive === 'demarches'"
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
import TitreHeader from './titre/header.vue'
import TitreMap from './titre/map.vue'
import TitreTerritoires from './titre/territoires.vue'
import TitreRepertoire from './titre/repertoire.vue'
import TitreDemarches from './titre/demarches.vue'
import TitreActivites from './titre/activites.vue'
import TitreOutils from './titre/outils.vue'

export default {
  components: {
    Loader,
    Card,
    TitreHeader,
    TitreMap,
    TitreTerritoires,
    TitreRepertoire,
    TitreDemarches,
    TitreActivites,
    TitreOutils
  },

  data() {
    return {
      tabActive: 'demarches',
      tabs: { demarches: 'Démarches', activites: 'Activités' }
    }
  },

  computed: {
    titre() {
      return this.$store.state.titre.current
    },
    loaded() {
      return !!this.titre
    },
    tabsActives() {
      return Object.keys(this.tabs).reduce(
        (tabs, tabId) =>
          this.titre[tabId].length
            ? Object.assign(tabs, { [tabId]: this.tabs[tabId] })
            : tabs,
        {}
      )
    }
  },

  watch: {
    $route: 'get'
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
    }
  }
}
</script>
