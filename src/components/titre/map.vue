<template>
  <div>
    <LeafletMap
      ref="map"
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayers"
      :marker-layers="markerLayers"
      :bounds="bounds"
      class="map map-detail mb-s"
    />
    <MapWarningBrgm
      :zoom="zoom"
      :tiles-id="tilesId"
    />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-2 mb">
        <div class="flex">
          <button
            class="btn-border pill px-m py-s"
            @click="center"
          >
            Centrer
          </button>
        </div>
      </div>
      <div class="tablet-blob-1-2">
        <LeafletTilesSelector
          :tiles="tiles"
          :tiles-id="tilesId"
          @tiles-id-set="tilesIdSelect"
        />
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import LeafletMap from '../leaflet/map.vue'
import LeafletTilesSelector from '../leaflet/tiles-selector.vue'
import MapWarningBrgm from '../leaflet/warning-brgm.vue'

export default {
  components: {
    MapWarningBrgm,
    LeafletMap,
    LeafletTilesSelector
  },

  props: {
    geojson: {
      type: Object,
      default: () => {}
    },
    points: {
      type: Array,
      default: () => []
    },
    domaineId: {
      type: String,
      default: 'm'
    }
  },

  data() {
    return {
      map: null,
      geojsonLayers: [
        L.geoJSON(this.geojson, {
          style: {
            fillOpacity: 0.75,
            weight: 1,
            color: 'white',
            className: `svg-fill-domaine-${this.domaineId}`
          }
        })
      ],
      zoom: 0,
      markerLayers: []
    }
  },

  computed: {
    bounds() {
      return this.geojsonLayers[0].getBounds()
    },

    tilesLayer() {
      const tiles = this.$store.getters['user/tilesActive']
      return tiles.type === 'wms'
        ? L.tileLayer.wms(tiles.url, {
            layers: tiles.layers,
            format: 'image/png',
            attribution: tiles.attribution
          })
        : L.tileLayer(tiles.url, {
            attribution: tiles.attribution
          })
    },

    tiles() {
      return this.$store.state.map.tiles
    },

    tilesId() {
      return this.$store.state.user.preferences.carte.tilesId
    }
  },

  created() {
    this.markersInit()
  },

  mounted() {
    this.center()
  },

  methods: {
    markersInit() {
      this.points.forEach(point => {
        if (!point.nom) return

        const icon = L.divIcon({
          className: `h6 mono border-bg color-text py-xs px-s inline-block leaflet-marker-camino cap pill bg-bg`,
          html: `${point.nom}`,
          iconSize: null,
          iconAnchor: [15.5, 38]
        })
        const titleMarker = L.marker(
          [point.coordonnees.y, point.coordonnees.x],
          { icon }
        )

        this.markerLayers.push(titleMarker)
      })
    },

    tilesIdSelect(tuileNom) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'carte.tilesId',
        value: tuileNom
      })
    },

    zoomGet(zoom) {
      this.zoom = zoom
    },

    center() {
      this.$refs.map.fitBounds(this.bounds)
    }
  }
}
</script>
