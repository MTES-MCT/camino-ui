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
              v-if="tabId === 'activites' && titre.activites.filter(e => e.statut.couleur === 'error' || e.statut.couleur === 'warning').length"
              :color="'bg-error'"
              class="mb--xs"
            >
              {{ titre.activites && titre.activites.filter(e => e.statut.couleur === 'error' || e.statut.couleur === 'warning').length }}
            </Pill>
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
import Pill from './ui/pill.vue'
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
    Pill,
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
      tabs: { demarches: { nom: 'Titre' }, activites: { nom: 'Activités' } }
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
      const tabsActives = Object.keys(this.tabs).reduce(
        (tabs, tabId) =>
          this.titre && this.titre[tabId].length
            ? Object.assign(tabs, { [tabId]: this.tabs[tabId] })
            : tabs,
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
    }
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
