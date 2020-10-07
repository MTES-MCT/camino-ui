<template>
  <div class="width-max-padding bg-alt">
    <Map
      ref="map"
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayers"
      :marker-layers="markerLayers"
      class="map map-view mb-s"
      @map-update="titresPreferencesUpdate"
    />
    <MapPattern :domaines-ids="domainesIds" :types-ids="typesIds" />
    <MapWarningBrgm :zoom="preferences.zoom" :tiles-id="tilesId" />
    <div class="container overflow-auto">
      <div class="desktop-blobs">
        <div class="desktop-blob-1-2 desktop-flex">
          <div class="mb-s">
            <span class="mr-s">
              <button class="btn-border rnd-m px-s py-xs h5" @click="mapFrame">
                Tout afficher
              </button>
            </span>
          </div>
          <ul class="list-inline pill-list mb-s">
            <li v-for="z in zones" :key="z.id" class="mr-line mb-line">
              <button
                class="btn-border pill-item px-s py-xs h5"
                @click="mapCenter(z.id)"
              >
                {{ z.name }}
              </button>
            </li>
          </ul>
        </div>

        <div class="desktop-blob-1-2 desktop-flex">
          <div class="flex mb-s">
            <div :class="{ active: markerLayersId === 'clusters' }">
              <button
                class="btn-border p-s rnd-l-s"
                title="regroupe les marqueurs"
                @click="markerLayersIdSet('clusters')"
              >
                <i class="icon-24 icon-markers-clusters" />
              </button>
            </div>
            <div :class="{ active: markerLayersId === 'markers' }">
              <button
                class="btn-border p-s"
                title="affiche les marqueurs"
                @click="markerLayersIdSet('markers')"
              >
                <i class="icon-24 icon-markers-markers" />
              </button>
            </div>
            <div :class="{ active: markerLayersId === 'none' }" class="mr-s">
              <button
                class="btn-border p-s rnd-r-s"
                title="affiche les contours uniquement"
                @click="markerLayersIdSet('none')"
              >
                <i class="icon-24 icon-markers-none" />
              </button>
            </div>
          </div>

          <MapTilesSelector
            :tiles="tiles"
            :tiles-id="tilesId"
            class="flex-grow mb-s"
            @params-update="userPreferencesUpdate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Map from '../_map/index.vue'
import MapTilesSelector from '../_map/tiles-selector.vue'
import MapWarningBrgm from '../_map/warning-brgm.vue'
import MapPattern from '../_map/pattern.vue'
import { tilesBuild } from '../_map/map.js'
import { zones, clustersBuild, layersBuild, geojsonBoundsGet } from './map.js'

export default {
  components: {
    MapWarningBrgm,
    Map,
    MapTilesSelector,
    MapPattern
  },

  props: {
    titres: { type: Array, required: true }
  },

  data() {
    return {
      zones,
      zoneId: 'fr',
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

    markerLayersId() {
      return this.$store.state.user.preferences.carte.markerLayersId
    },

    markerLayers() {
      if (this.markerLayersId === 'clusters') {
        return this.clusters
      }

      if (this.markerLayersId === 'markers') {
        return this.markers
      }

      return []
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

    domainesIds() {
      return this.domaines.map(({ id }) => id)
    },

    typesIds() {
      return this.$store.state.titres.metas.types.map(({ id }) => id)
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

  mounted() {
    this.init()
  },

  created() {
    window.addEventListener('popstate', this.popState)
  },

  beforeDestroy() {
    window.removeEventListener('popstate', this.popState)
  },

  methods: {
    init() {
      if (this.preferences.zoom && this.preferences.centre) {
        this.positionSet()
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
        if (clusters[marker.domaineId]) {
          clusters[marker.domaineId].addLayer(marker)
        }
      })

      this.clusters = Object.keys(clusters).map(
        domaineId => clusters[domaineId]
      )

      this.geojsonLayersDisplay()
    },

    titresPreferencesUpdate(params) {
      if (params.center || params.zoom || params.bbox) {
        if (params.center) {
          params.centre = params.center

          delete params.center
        }

        if (params.bbox) {
          params.perimetre = params.bbox

          delete params.bbox
        }

        this.$store.dispatch('titres/preferencesSet', {
          section: 'carte',
          params
        })
      }
    },

    userPreferencesUpdate(params) {
      this.eventTrack()
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

    async mapFrame() {
      const params = { perimetre: [-180, -90, 180, 90] }

      await this.$store.dispatch('titres/preferencesSet', {
        section: 'carte',
        params
      })

      this.$refs.map.allFit()
    },

    boundsFit() {
      this.$refs.map.boundsFit(this.bounds)
    },

    positionSet() {
      const zoom = this.preferences.zoom
      const center = this.preferences.centre
      this.$refs.map.positionSet({ zoom, center })
    },

    popState() {
      this.positionSet()
    },

    geojsonLayersDisplay() {
      Vue.nextTick(() => {
        this.geojsonLayers = []
        this.markers.forEach(marker => {
          if (
            this.markerLayersId === 'none' ||
            (this.$refs.map && this.$refs.map.hasLayer(marker))
          ) {
            this.geojsonLayers.push(this.geojsons[marker.id])
          }
        })
      })
    },

    markerLayersIdSet(markerLayersId) {
      this.userPreferencesUpdate({ markerLayersId })

      this.geojsonLayersDisplay()
    },

    eventTrack() {
      if (this.$matomo) {
        this.$matomo.trackEvent('titres-vue', 'titre-id-fond-carte')
      }
    }
  }
}
</script>
