<template>
  <div>
    <LeafletMap
      ref="map"
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayers"
      :marker-layers="markerLayers"
      class="map map-list mb-s"
      @map:update="preferencesUpdate"
    />
    <TitreMapWarningBrgm :zoom="preferences.zoom" :tiles-id="tilesId" />
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <ul class="list-inline">
          <li v-for="z in zones" :key="z.id" class="mr-xs">
            <button
              class="btn-border pill px-m py-s h5"
              @click="mapCenter(z.id)"
            >
              {{ z.name }}
            </button>
          </li>
        </ul>
      </div>
      <div class="desktop-blob-1-2 flex flex-start">
        <button
          class="btn-border pill px-m py-s mb mr-s"
          @click="clustersDisplayToggle"
        >
          <i
            :class="`icon-markers-${clustersDisplay ? 'ungrouped' : 'grouped'}`"
            class="icon-24"
          />
        </button>
        <LeafletTilesSelector
          :tiles="tiles"
          :tiles-id="tilesId"
          class="flex-grow"
          @params:update="tilesUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LeafletMap from '../leaflet/map.vue'
import LeafletTilesSelector from '../leaflet/tiles-selector.vue'
import TitreMapWarningBrgm from '../leaflet/warning-brgm.vue'
import {
  zones,
  clustersBuild,
  layersBuild,
  tilesBuild,
  geojsonBoundsGet
} from './map.js'

export default {
  components: {
    TitreMapWarningBrgm,
    LeafletMap,
    LeafletTilesSelector
  },

  props: {
    titres: { type: Array, required: true }
  },

  data() {
    return {
      zones,
      zoneId: 'fr',
      clustersDisplay: true,
      geojsons: {},
      clusters: [],
      markers: [],
      geojsonLayers: []
    }
  },

  computed: {
    tilesLayer() {
      const tiles = this.$store.getters['user/tilesActive']
      return tilesBuild(tiles)
    },

    markerLayers() {
      return this.clustersDisplay ? this.clusters : this.markers
    },

    zone() {
      return this.zones.find(z => z.id === this.zoneId)
    },

    bounds() {
      return geojsonBoundsGet(this.zone)
    },

    domaines() {
      return this.$store.state.titres.metas.domaines
    },

    tiles() {
      return this.$store.state.user.metas.tiles
    },

    tilesId() {
      return this.$store.state.user.preferences.carte.tilesId
    },

    preferences() {
      return this.$store.state.titres.preferences.carte
    }
  },

  watch: {
    titres: 'titresInit'
  },

  created() {
    this.titresInit()
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      if (this.preferences.zoom && this.preferences.centre) {
        this.$refs.map.positionSet({
          zoom: this.preferences.zoom,
          center: this.preferences.centre.split(',').map(Number)
        })
      } else {
        this.boundsFit()
      }
    },

    titresInit() {
      const clusters = clustersBuild(this.domaines)
      const { geojsons, markers } = layersBuild(this.titres, this.$router)

      this.geojsons = geojsons
      this.markers = markers
      this.markers.forEach(marker => {
        clusters[marker.domaineId].addLayer(marker)
      })

      this.clusters = Object.keys(clusters).map(
        domaineId => clusters[domaineId]
      )

      this.geojsonLayersDisplay()
    },

    preferencesUpdate(params) {
      if (params.center) {
        params.centre = params.center
        delete params.center
      }

      this.$store.dispatch('titres/preferencesSet', {
        section: 'carte',
        params
      })

      this.geojsonLayersDisplay()
    },

    tilesUpdate(params) {
      this.$store.dispatch('user/preferencesSet', {
        section: 'carte',
        params
      })
    },

    mapCenter(zoneId) {
      if (this.zoneId !== zoneId) {
        this.zoneId = zoneId
      }

      this.boundsFit()
    },

    boundsFit() {
      this.$refs.map.fitBounds(this.bounds)
    },

    geojsonLayersDisplay() {
      setTimeout(() => {
        this.geojsonLayers = []
        this.markers.forEach(marker => {
          if (this.$refs.map && this.$refs.map.hasLayer(marker)) {
            this.geojsonLayers.push(this.geojsons[marker.id])
          }
        })
      }, 500)
    },

    clustersDisplayToggle() {
      this.clustersDisplay = !this.clustersDisplay
      this.geojsonLayersDisplay()
    }
  }
}
</script>
