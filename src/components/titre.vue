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

      <TitreDemarches
        v-if="titre.demarches"
        :demarches="titre.demarches"
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
import TitreOutils from './titre/outils.vue'
import TitreRepertoire from './titre/repertoire.vue'
import TitreDemarches from './titre/demarches.vue'
import TitreTerritoires from './titre/territoires.vue'

export default {
  components: {
    Loader,
    Card,
    TitreHeader,
    TitreMap,
    TitreOutils,
    TitreRepertoire,
    TitreDemarches,
    TitreTerritoires
  },

  computed: {
    titre() {
      return this.$store.state.titre.current
    },
    loaded() {
      return !!this.titre
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
    }
  }
}
</script>
