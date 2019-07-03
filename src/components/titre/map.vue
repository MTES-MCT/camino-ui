<template>
  <div>
    <LeafletMap
      ref="map"
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayers"
      :marker-layers="markerLayers"
      :bounds="bounds"
      class="map map-detail mb"
      @map-zoom="zoomGet"
    />
    <MapWarningBrgm
      :zoom="zoom"
      :tiles-id="tilesId"
    />
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2 mb">
        <div class="flex">
          <button
            class="btn-border pill px-m py-s"
            @click="center"
          >
            Centrer
          </button>

        <!-- <TitreCsvDownload
          :titre="titre"
          class="mr-s"
        /> -->
        </div>
      </div>
      <div class="desktop-blob-1-2">
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
// import TitreCsvDownload from './csv-download.vue'

export default {
  components: {
    MapWarningBrgm,
    LeafletMap,
    LeafletTilesSelector
    // TitreCsvDownload
  },

  props: {
    geojson: {
      type: Object,
      default: () => {}
    },
    points: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      map: null,
      geojsonLayers: [L.geoJSON(this.geojson)],
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
        const icon = L.divIcon({
          className: `h6 mono border-bg color-bg py-xs px-s inline-block leaflet-marker-title cap pill marker-titre`,
          html: `${point.nom}`,
          iconSize: null,
          iconAnchor: [15.5, 38]
        })
        const titleMarker = L.marker(
          [point.coordonnees.y, point.coordonnees.x],
          { icon }
        )

        // let popupRef = ``

        // point.references.forEach(ref => {
        //   popupRef = `${popupRef}<br />${ref.geoSysteme.nom} (EPSG ${
        //     ref.geoSysteme.id
        //   }): x= ${ref.coordonnees.x}, y= ${ref.coordonnees.y}`
        // })
        // if (popupRef.length !== 0)
        //   popupRef = `<h5 class="mb-s">Références:${popupRef}</h5>`

        // titleMarker.bindPopup(`<h5 class="mb-s">
        //   id: ${point.id}
        //   ${point.description ? `<br />description: ${point.description}` : ``}${popupRef}
        //   </h5>`)
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
