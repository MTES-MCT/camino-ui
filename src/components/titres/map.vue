<template>
  <div>
    <LeafletMap
      ref="map"
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayersDisplayed"
      :marker-layers="markerLayers"
      class="map map-list mb"
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
      geojsonLayersDisplayed: [],
      geojsonListeDisplayed: []
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
    delete query.zoom
    delete query.centre

    this.$router.replace({ query })
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
      this.geojsonLayers = []

      // crée les clusters
      const markerClusters = {}

      this.domaines.forEach(domaine => {
        markerClusters[domaine.id] = L.markerClusterGroup({
          iconCreateFunction(cluster) {
            const childCount = cluster.getChildCount()

            let c = 'marker-cluster-size-'
            if (childCount < 5) c += 'mini'
            else if (childCount < 15) c += 'small'
            else if (childCount < 30) c += 'medium'
            else if (childCount < 50) c += 'large'
            else c += 'extra'

            return new L.DivIcon({
              html: `<div><span>${domaine.id.toUpperCase()}</span></div>`,
              className: `h6 mono border-bg color-bg py-xs px-s inline-block pill bg-titre-domaine-${
                domaine.id
              } ${c}`,
              iconSize: null,
              iconAnchor: [0, 0]
            })
          },
          disableClusteringAtZoom: 12,
          animate: false,
          // zoomToBoundsOnClick: false,
          spiderfyOnMaxZoom: false,
          showCoverageOnHover: false
        })

        const popupOptions = {
          closeButton: false,
          offset: [20, 6],
          autoPan: false
        }

        markerClusters[domaine.id].on('clustermouseover', cluster => {
          const popupHtml = `<h4 class="mb-s">${
            cluster.layer.getAllChildMarkers().length
          }</h4>`

          cluster.sourceTarget.bindPopup(popupHtml, popupOptions).openPopup()
        })

        markerClusters[domaine.id].on('clustermouseout', cluster => {
          cluster.sourceTarget.closePopup()
        })
      })

      this.titres.forEach(titre => {
        const domaineId = titre.domaine.id
        const icon = L.divIcon({
          className: `h6 mono border-bg color-bg py-xs px-s pill inline-block bg-titre-domaine-${domaineId} leaflet-marker-title cap`,
          html: domaineId,
          iconSize: null,
          iconAnchor: [15.5, 38]
        })

        const popupHtml = `<h4 class="mb-s">${titre.nom}</h4>`

        const popupOptions = {
          closeButton: false,
          offset: [0, -24],
          autoPan: false
        }

        const titreRoute = {
          name: 'titre',
          params: { id: titre.id }
        }

        const methods = {
          click: () => {
            this.$router.push(titreRoute)
          },
          mouseover(e) {
            this.openPopup()
          },
          mouseout(e) {
            this.closePopup()
          },
          add: e => {
            this.geojsonLayers.forEach(geojson => {
              if (
                e.target.id === geojson.id &&
                !this.geojsonListeDisplayed.includes(geojson)
              )
                this.geojsonListeDisplayed.push(geojson)
            })
          },
          remove: e => {
            this.geojsonListeDisplayed = this.geojsonListeDisplayed.filter(
              geojson => e.target.id !== geojson.id
            )
          }
        }

        if (titre.geojsonMultiPolygon) {
          const geojsonLayer = L.geoJSON(titre.geojsonMultiPolygon, {
            style: {
              fillOpacity: 0.75,
              weight: 1,
              color: 'white',
              className: `svg-fill-domaine-${domaineId}`
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
              titleMarker.id = titre.id

              // this.markerLayers.push(titleMarker)

              markerClusters[domaineId].addLayer(titleMarker)
            }
          })
          geojsonLayer.id = titre.id
          this.geojsonLayers.push(geojsonLayer)
        }
      })

      this.markerLayers = Object.keys(markerClusters).map(
        domaineId => markerClusters[domaineId]
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

<<<<<<< HEAD
    urlZoomSet(zoom) {
=======
    zoomUrlSet(zoom) {
>>>>>>> feat: Affiche les geojsons si le marker est visible
      this.urlParamSet('zoom', zoom)
      this.geojsonLayersDisplay()
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
      this.geojsonLayersDisplayed =
<<<<<<< HEAD
        this.preferencesZoom > 7 ? this.geojsonLayers : []
=======
        this.zoom > 11 ? this.geojsonLayers : this.geojsonListeDisplayed
>>>>>>> feat: Affiche les geojsons si le marker est visible
    }
  }
}
</script>
