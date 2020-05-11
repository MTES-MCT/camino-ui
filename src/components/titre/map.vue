<template>
  <div class="bg-alt width-max-padding">
    <MapPattern
      :domaines-ids="[domaineId]"
      :types-ids="[typeId]"
    />
    <Map
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
    <div class="container overflow-auto">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-2 mb-s">
          <div class="flex">
            <button
              class="btn-border pill px-m py-s"
              @click="actionCenter"
            >
              Centrer
            </button>
          </div>
        </div>
        <div class="tablet-blob-1-2 mb-s">
          <MapTilesSelector
            :tiles="tiles"
            :tiles-id="tilesId"
            @params:update="preferencesUpdate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import Map from '../map/index.vue'
import MapTilesSelector from '../map/tiles-selector.vue'
import MapWarningBrgm from '../map/warning-brgm.vue'
import MapPattern from '../map/pattern.vue'

export default {
  components: { MapPattern, MapWarningBrgm, Map, MapTilesSelector },

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
      default: ''
    },
    typeId: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      map: null,
      zoom: 0
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

    geojsonLayers() {
      return [
        L.geoJSON(this.geojson, {
          style: {
            fillOpacity: 0.75,
            weight: 1,
            color: 'white',
            className: `svg-fill-pattern-${this.typeId}-${this.domaineId}`
          }
        })
      ]
    },

    markerLayers() {
      return this.points.reduce((markers, point) => {
        if (!point.nom) {
          return markers
        }

        const icon = L.divIcon({
          className: `h6 mono border-bg color-text py-xs px-s inline-block leaflet-marker-camino cap pill bg-bg`,
          html: point.nom,
          iconSize: null,
          iconAnchor: [15.5, 38]
        })

        const titleMarker = L.marker(
          [point.coordonnees.y, point.coordonnees.x],
          { icon }
        )

        markers.push(titleMarker)

        return markers
      }, [])
    },

    tiles() {
      return this.$store.state.user.metas.tiles
    },

    tilesId() {
      return this.$store.state.user.preferences.carte.tilesId
    }
  },

  watch: {
    geojson: 'center',
    points: 'center'
  },

  mounted() {
    this.center()
  },

  methods: {
    preferencesUpdate(params) {
      this.$emit('titre:eventTrack', {
        categorie: 'titre-sections',
        action: `choix d'un fond de carte`,
        nom: this.$route.params.id
      })
      this.$store.dispatch('user/preferencesSet', {
        section: 'carte',
        params
      })
    },

    actionCenter() {
      this.$emit('titre:eventTrack', {
        categorie: 'titre-sections',
        action: `centrer sur la carte d'une fiche titre`,
        nom: this.$route.params.id
      })
      this.center()
    },

    center() {
      this.$refs.map.fitBounds(this.bounds)
    }
  }
}
</script>
