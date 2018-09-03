<template>
  <div>
    <leaflet-map
      ref="map"
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayers"
      :marker-layers="markerLayers"
      :bounds="boundsSelected"
    />
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <ul class="list-inline">
          <li>
            <button
              class="btn-border px-m py-s"
              @click="mapCenter('fr')"
            >Métropole</button>
          </li>
          <li>
            <button
              class="btn-border px-m py-s"
              @click="mapCenter('gf')"
            >Guyane</button>
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
import Accordion from '../ui/accordion.vue'
import LeafletMap from '../leaflet/map.vue'
import LeafletTilesSelector from '../leaflet/tiles-selector.vue'

export default {
  components: {
    Accordion,
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
          type: 'LineString',
          coordinates: [[-5.1406, 41.3337], [9.5593, 51.0891]]
        },
        gf: {
          type: 'LineString',
          coordinates: [[-54.5425, 2.1271], [-51.6139, 5.7765]]
        }
      },
      boundsName: 'fr',
      geojsonLayers: [],
      markerLayers: []
    }
  },

  computed: {
    tilesLayer () {
      const tiles = this.$store.getters['map/tilesActive']
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
          className: `h6 mono border-bg color-bg py-xs px-s pill inline-block bg-title-domain-${titre.domaine.id} leaflet-marker-title cap`,
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

        const perimetre = titre.perimetres.find(p => p)

        if (perimetre) {
          const geojsonLayer = L.geoJSON(perimetre.geojsonMultiPolygon, {
            filter: feature => feature.geometry.type === 'MultiPolygon',
            style: {
              fillOpacity: 0.75,
              weight: 0,
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
    }
  }
}
</script>
