<template>
  <div>
    <LeafletMap
      ref="map"
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayers"
      :marker-layers="markerLayers"
      class="map map-list mb-s"
      @update="urlUpdate"
    />
    <TitreMapWarningBrgm
      :zoom="preferencesZoom"
      :tiles-id="tilesId"
    />
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <ul class="list-inline">
          <li
            v-for="z in zones"
            :key="z.id"
            class="mr-xs"
          >
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
          @tiles-id-set="tilesIdSelect"
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
    titres: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      zones: [
        {
          id: 'fr',
          name: 'Métropole',
          type: 'LineString',
          coordinates: [[-5, 41], [10, 51]]
        },
        {
          id: 'gf',
          name: 'Guyane',
          type: 'LineString',
          coordinates: [[-55, 4], [-50, 7]]
        },
        {
          id: 'oi',
          name: 'Océan Indien',
          type: 'LineString',
          coordinates: [[39, -23], [58, -13]]
        },
        {
          id: 'an',
          name: 'Antilles',
          type: 'LineString',
          coordinates: [[-64, 15], [-59, 16]]
        }
      ],
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
      return this.$store.state.metas.domaines
    },

    tiles() {
      return this.$store.state.map.tiles
    },

    tilesId() {
      return this.$store.state.user.preferences.carte.tilesId
    },

    preferencesCentre() {
      return this.$store.state.user.preferences.carte.centre
    },

    preferencesZoom() {
      return this.$store.state.user.preferences.carte.zoom
    }
  },

  watch: {
    titres: 'titresInit',

    $route: function(to, from) {
      if (to.query.zoom && to.query.zoom !== from.query.zoom) {
        this.preferencesZoomSet(Number(to.query.zoom))
      }

      if (to.query.centre && to.query.centre !== from.query.centre) {
        this.preferencesCentreSet(to.query.centre.split(',').map(Number))
      }

      if (
        (to.query.zoom && to.query.zoom !== from.query.zoom) ||
        (to.query.centre && to.query.centre !== from.query.centre)
      ) {
        this.$refs.map.positionSet({
          zoom: this.preferencesZoom,
          center: this.preferencesCentre
        })
      }
    }
  },

  created() {
    this.titresInit()
  },

  mounted() {
    this.init()
  },

  destroyed() {
    const query = Object.assign({}, this.$route.query)

    if (query.zoom || query.centre) {
      if (query.zoom) {
        delete query.zoom
      }

      if (query.centre) {
        delete query.centre
      }

      this.$router.replace({ query })
    }
  },

  methods: {
    init() {
      if (this.$route.query.zoom && this.$route.query.centre) {
        this.preferencesZoomSet(Number(this.$route.query.zoom))
        this.preferencesCentreSet(
          this.$route.query.centre.split(',').map(Number)
        )

        this.$refs.map.positionSet({
          zoom: this.preferencesZoom,
          center: this.preferencesCentre
        })
      } else if (this.preferencesZoom && this.preferencesCentre) {
        this.urlUpdate({
          zoom: this.preferencesZoom,
          center: this.preferencesCentre
        })
      } else {
        this.$refs.map.fitBounds(this.bounds)
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

    mapCenter(zoneId) {
      if (this.zoneId !== zoneId) {
        this.zoneId = zoneId
      }

      this.$refs.map.fitBounds(this.bounds)
    },

    tilesIdSelect(tilesId) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'carte.tilesId',
        value: tilesId
      })
    },

    preferencesZoomSet(zoom) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'carte.zoom',
        value: zoom
      })
      this.geojsonLayersDisplay()
    },

    preferencesCentreSet(centre) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'carte.centre',
        value: centre
      })
    },

    zoomUrlSet(zoom) {
      this.urlParamSet('zoom', zoom)
    },

    urlCentreSet(centreArray) {
      const centre = `${centreArray[0]},${centreArray[1]}`
      if (centre !== this.$route.query.centre) {
        this.urlParamSet('centre', centre)
      }
    },

    urlUpdate({ zoom, center }) {
      const query = Object.assign({}, this.$route.query)

      const centre = `${center[0]},${center[1]}`

      if (zoom && centre) {
        query.zoom = zoom
        query.centre = centre
      } else {
        delete query.zoom
        delete query.centre
      }

      if (this.$route.query.zoom && this.$route.query.centre) {
        this.$router.push({ query })
      } else {
        this.$router.replace({ query })
      }
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
