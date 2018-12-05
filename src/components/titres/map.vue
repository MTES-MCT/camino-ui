<template>
  <div>
    <LeafletMap
      ref="map"
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayers"
      :marker-layers="markerLayers"
      :bounds="bounds"
      @map-zoom="zoomGet"
      @map-center="centerGet"
    />
    <TitreMapWarningBrgm 
      :zoom="zoom"
      :tiles-name="tilesName"
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
              class="btn-border pill px-m py-s"
              @click="mapCenter(z.id)"
            >
              {{ z.name }}
            </button>
          </li>
        </ul>
      </div>
      <div class="desktop-blob-1-2">
        <LeafletTilesSelector
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
      geojsonLayers: [],
      markerLayers: [],
      zoom: 5
    }
  },

  computed: {
    tilesLayer () {
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

    zone () {
      return this.zones.find(z => z.id === this.zoneId)
    },

    bounds () {
      return L.geoJSON(this.zone).getBounds()
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
      return (
        this.tilesName === 'BRGM / Cartes géologiques 1/50 000' &&
        (this.zoom < 12 || this.zoom > 16)
      )
    }
  },

  watch: {
    titres: 'titresInit'
  },

  mounted () {
    this.titresInit()
    const query = this.$route.query
    if (query.zoom && query.center) {
      this.$refs.map.setZoom(query.zoom)
      this.$refs.map.panTo(query.center.split(','))
    } else {
      this.$refs.map.fitBounds(this.bounds)
    }
  },

  methods: {
    titresInit () {
      this.markerLayers = []
      this.geojsonLayers = []
      this.titres.forEach(titre => {
        const icon = L.divIcon({
          className: `h6 mono border-bg color-bg py-xs px-s pill inline-block bg-title-domaine-${
            titre.domaine.id
          } leaflet-marker-title cap`,
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

    mapCenter (zoneId) {
      if (this.zoneId === zoneId) {
        this.$refs.map.fitBounds(this.bounds)
      } else {
        this.zoneId = zoneId
      }
    },

    tilesNameSelect (tuileNom) {
      this.$store.commit('user/preferencesUpdate', {
        key: 'tilesName',
        value: tuileNom
      })
    },

    zoomGet (zoom) {
      this.routeQueryUpdate({ zoom })
      this.zoom = zoom
    },

    centerGet (center) {
      this.routeQueryUpdate({
        center: `${center.lat.toFixed(7)},${center.lng.toFixed(7)}`
      })
    },

    routeQueryUpdate (query) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, query)
      })
    }
  }
}
</script>
