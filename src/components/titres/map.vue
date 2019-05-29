<template>
  <div>
    <LeafletMap
      ref="map"
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayersDisplayed"
      :marker-layers="markerLayers"
      :bounds="bounds"
      class="map-list"
      @map-zoom="zoomUrlSet"
      @map-center="centreUrlSet"
    />
    <TitreMapWarningBrgm
      :zoom="zoom"
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
import TitreMapWarningBrgm from '../leaflet/warning-brgm.vue'
import 'leaflet.markercluster/dist/leaflet.markercluster-src.js'
import 'leaflet.markercluster/dist/MarkerCluster.css'

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
      geojsonLayers: [],
      markerLayers: [],
      geojsonLayersDisplayed: []
    }
  },

  computed: {
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

    zone() {
      return this.zones.find(z => z.id === this.zoneId)
    },

    bounds() {
      return L.geoJSON(this.zone).getBounds()
    },

    domaines() {
      return this.$store.state.titres.domaines
    },

    tiles() {
      return this.$store.state.map.tiles
    },

    tilesId() {
      return this.$store.state.user.preferences.carte.tilesId
    },

    centre() {
      return this.$store.state.user.preferences.carte.centre
    },

    zoom() {
      return this.$store.state.user.preferences.carte.zoom
    }
  },

  watch: {
    titres: 'titresInit',

    $route: function(to, from) {
      if (to.query.zoom && to.query.zoom !== from.query.zoom) {
        const zoom = Number(to.query.zoom)
        this.zoomSet(zoom)
        this.$refs.map.zoomSet(zoom)
      }

      if (to.query.centre && to.query.centre !== from.query.centre) {
        const centre = to.query.centre.split(',').map(Number)
        this.centreSet(centre)
        this.$refs.map.centerSet(centre)
      }

      if (!to.query.centre && !to.query.zoom) {
        this.init()
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
    delete query.zoom
    delete query.centre

    this.$router.replace({ query })
  },

  methods: {
    init() {
      const zoom = this.$route.query.zoom
        ? Number(this.$route.query.zoom)
        : this.zoom

      const centre =
        (this.$route.query.centre &&
          this.$route.query.centre.split(',').map(Number)) ||
        this.centre

      if (zoom && this.zoom !== zoom) {
        this.zoomSet(zoom)
      }

      if (centre && this.centre !== centre) {
        this.centreSet(centre)
      }

      if (zoom && centre) {
        this.$refs.map.zoomSet(zoom)
        this.$refs.map.centerSet(centre)
      } else {
        this.$refs.map.fitBounds(this.bounds)
      }
    },

    titresInit() {
      this.geojsonLayers = []
      let markerClusters = {}
      this.titres.forEach(titre => {
        const domaine = titre.domaine.id
        const icon = L.divIcon({
          className: `h6 mono border-bg color-bg py-xs px-s pill inline-block bg-titre-domaine-${domaine} leaflet-marker-title cap`,
          html: domaine,
          iconSize: null,
          iconAnchor: [15.5, 38]
        })

        const popupHtml = `<h4 class="mb-s">${titre.nom}</h4>`

        const popupOptions = {
          closeButton: false,
          offset: [0, -24],
          autoPan: false
        }

        const titleRoute = {
          name: 'titre',
          params: { id: titre.id }
        }

        const methods = {
          click: () => {
            this.$router.push(titleRoute)
          },
          mouseover(e) {
            this.openPopup()
          },
          mouseout(e) {
            this.closePopup()
          }
        }

        if (titre.geojsonMultiPolygon) {
          const geojsonLayer = L.geoJSON(titre.geojsonMultiPolygon, {
            style: {
              fillOpacity: 0.75,
              weight: 1,
              color: 'white',
              className: `svg-fill-domaine-${domaine}`
            },
            onEachFeature: (feature, layer) => {
              const titleMarker = L.marker(
                L.geoJSON(feature)
                  .getBounds()
                  .getCenter(),
                { icon }
              )

              layer.bindPopup(popupHtml, popupOptions)
              layer.on(methods)

              titleMarker.bindPopup(popupHtml, popupOptions)
              titleMarker.on(methods)

              if (!markerClusters[domaine]) {
                markerClusters[domaine] = L.markerClusterGroup({
                  iconCreateFunction: cluster => {
                    const childCount = cluster.getChildCount()

                    let c = 'marker-cluster-size-'
                    if (childCount < 5) c += 'mini'
                    else if (childCount < 15) c += 'small'
                    else if (childCount < 30) c += 'medium'
                    else if (childCount < 50) c += 'large'
                    else c += 'extra'

                    return new L.DivIcon({
                      html: `<div><span>${domaine.toUpperCase()}</span></div>`,
                      className: `h6 mono border-bg color-bg py-xs px-s inline-block pill bg-titre-domaine-${domaine} ${c}`,
                      iconSize: null,
                      iconAnchor: [0, 0]
                    })
                  },
                  disableClusteringAtZoom: 12
                })
                markerClusters[domaine].options.showCoverageOnHover = false
              }
              markerClusters[domaine].addLayer(titleMarker)
            }
          })
          this.geojsonLayers.push(geojsonLayer)
        }
      })
      Object.keys(markerClusters).forEach(d => {
        markerClusters[d].on('clustermouseover', cluster => {
          cluster.sourceTarget
            .bindPopup(
              `<h4 class="mb-s">${
                cluster.layer.getAllChildMarkers().length
              }</h4>`,
              {
                closeButton: false,
                offset: [20, 6],
                autoPan: false
              }
            )
            .openPopup()
        })
        markerClusters[d].on('clustermouseout', cluster => {
          cluster.sourceTarget.closePopup()
        })
      })
      this.markerLayers = Object.keys(markerClusters).map(
        d => markerClusters[d]
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

    zoomSet(zoom) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'carte.zoom',
        value: zoom
      })
    },

    centreSet(centre) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'carte.centre',
        value: centre
      })
    },

    zoomUrlSet(zoom) {
      this.geojsonLayersDisplay()
      this.urlParamSet('zoom', zoom)
    },

    centreUrlSet(centre) {
      this.urlParamSet('centre', centre)
    },

    geojsonLayersDisplay() {
      this.geojsonLayersDisplayed = this.zoom > 7 ? this.geojsonLayers : []
    }
  }
}
</script>
