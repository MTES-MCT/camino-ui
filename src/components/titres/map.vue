<template>
  <div>
    <leaflet-map
      ref="map"
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayers"
      :marker-layers="markerLayers"
      :bounds="boundsSelected"
      @zoom-level="zoomLevelGet"
    />
    <titre-map-warning-brgm 
      :zoom-level="zoomLevel"
      :tiles-name="tilesName"
    />
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <ul class="list-inline">
          <li 
            v-for="(bound, key) in bounds" 
            :key="key"
            class="mr-xs"
          >
            <button
              class="btn-border pill px-m py-s"
              @click="mapCenter(key)"
            >{{ bound.name }}</button>
          </li>
        </ul>
      </div>
      <div class="desktop-blob-1-2">
        <Leaflet-tiles-selector
          :tiles="tiles"
          :tiles-name="tilesName"
          @tiles-name-set="tilesNameSelect"
        />
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import LeafletMap from '../leaflet/map.vue'
import LeafletTilesSelector from '../leaflet/tiles-selector.vue'
import TitreMapWarningBrgm from '../leaflet/warning-brgm.vue'

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

  data () {
    return {
      bounds: {
        fr: {
          name: 'Métropole',
          type: 'LineString',
          coordinates: [[-5, 41], [10, 51]]
        },
        gf: {
          name: 'Guyane',
          type: 'LineString',
          coordinates: [[-54, 3], [-51, 6]]
        },
        oi: {
          name: 'Océan Indien',
          type: 'LineString',
          coordinates: [[34, -22], [46, -12]]
        }
      },
      boundsName: 'fr',
      geojsonLayers: [],
      markerLayers: [],
      zoomLevel: 0
    }
  },

  computed: {
    tilesLayer () {
      const tiles = this.$store.getters['user/tilesActive']
      return tiles.type === 'wms'
        ?
        L.tileLayer.wms(tiles.url, {
          layers: tiles.layers,
          format: 'image/png',
          attribution: tiles.attribution
        }) : L.tileLayer(tiles.url, {
          attribution: tiles.attribution
        })
    },

    boundsSelected () {
      const b = this.bounds[this.boundsName]
      return L.geoJSON(b).getBounds()
    },

    domaines () {
      return this.$store.state.titres.domaines
    },

    tiles () {
      return this.$store.state.map.tiles
    },

    tilesName () {
      return this.$store.state.user.preferences.map.tilesName
    },

    brgmWarning () {
      return this.tilesName === "BRGM / Cartes géologiques 1/50 000" && (this.zoomLevel < 12 || this.zoomLevel > 16)
    }
  },

  watch: {
    titres: 'titresInit'
  },

  mounted () {
    this.titresInit()
  },

  methods: {
    titresInit () {
      this.markerLayers = []
      this.geojsonLayers = []
      this.titres.forEach(titre => {
        const icon = L.divIcon({
          className: `h6 mono border-bg color-bg py-xs px-s pill inline-block bg-title-domaine-${titre.domaine.id} leaflet-marker-title cap`,
          html: titre.domaine.id,
          iconSize: null,
          iconAnchor: [15.5, 38]
        })
        const popupHtml = `<h4 class="mb-s">${titre.nom}</h4>`
        const popupOptions = {
          closeButton: false,
          offset: [0, -24]
        }
        const titleRoute = {
          name: 'titre',
          params: { id: titre.id }
        }
        const methods = {
          click: () => {
            this.$router.push(titleRoute)
          },
          mouseover (e) {
            this.openPopup()
          },
          mouseout (e) {
            this.closePopup()
          }
        }

        if (titre.geojsonMultiPolygon) {
          const geojsonLayer = L.geoJSON(titre.geojsonMultiPolygon, {
            filter: feature => feature.geometry.type === 'MultiPolygon',
            style: {
              fillOpacity: 0.75,
              weight: 1,
              color: 'white',
              className: `svg-fill-domaine-${titre.domaine.id}`
            },
            onEachFeature: (feature, layer) => {
              const titleMarker = L.marker(
                L.geoJSON(feature)
                  .getBounds()
                  .getCenter(),
                { icon }
              )

              titleMarker.bindPopup(popupHtml, popupOptions)
              titleMarker.on(methods)

              layer.bindPopup(popupHtml, popupOptions)
              layer.on(methods)

              this.markerLayers.push(titleMarker)
            }
          })
          this.geojsonLayers.push(geojsonLayer)

        }
      })
    },

    mapCenter (zone) {
      if (this.boundsName === zone) {
        this.$refs.map.fit()
      } else {
        this.boundsName = zone
      }
    },

    tilesNameSelect (tuileNom) {
      this.$store.commit('user/preferencesMapTilesNameSelect', tuileNom)
    },

    zoomLevelGet (zoomLevel) {
      this.zoomLevel = zoomLevel
    }
  }
}
</script>
