<template>
  <div class="bg-alt">
    <MapPattern :domaines-ids="[domaineId]" :types-ids="[titreTypeId]" />

    <Mapo
      ref="map"
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayers"
      :marker-layers="markerLayers"
      :bounds="bounds"
      :legends="legends"
      class="map map-detail mb-s"
    />

    <MapWarningBrgm :zoom="zoom" :tiles-id="tilesId" />

    <div :class="{ container: isMain }">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-2" :class="{ 'px-s': !isMain }">
          <div class="flex mb-s">
            <button class="btn-border pill px-m py-s" @click="centrerTrack">
              Centrer
            </button>
          </div>
        </div>
        <div class="desktop-blob-1-2 desktop-flex">
          <div :class="{ active: markersVisible }" class="mb-s mr-xs">
            <button
              class="btn-border p-s rnd-s"
              title="affiche / masque les marqueurs"
              @click="markersVisible = !markersVisible"
            >
              <i class="icon-24 icon-markers-markers" />
            </button>
          </div>

          <div :class="{ active: patternVisible }" class="mb-s mr-xs">
            <button
              class="btn-border p-s rnd-s"
              title="affiche / masque la trame"
              @click="patternVisible = !patternVisible"
            >
              <i class="icon-24 icon-pattern" />
            </button>
          </div>

          <MapTilesSelector
            v-if="isMain"
            :tiles="tiles"
            :tiles-id="tilesId"
            class="flex-grow mb-s"
            @params-update="preferencesUpdate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mapo from '../_map/index.vue'
import MapTilesSelector from '../_map/tiles-selector.vue'
import MapWarningBrgm from '../_map/warning-brgm.vue'
import MapPattern from '../_map/pattern.vue'

import {
  leafletTilesBuild,
  leafletMarkerBuild,
  leafletGeojsonBuild,
  leafletDivIconBuild,
  leafletTilesLegendGet
} from '../_map/leaflet.js'

export default {
  components: { MapPattern, MapWarningBrgm, Mapo, MapTilesSelector },

  props: {
    geojson: { type: Object, required: true },
    points: { type: Array, default: () => [] },
    domaineId: { type: String, required: true },
    titreTypeId: { type: String, required: true },
    isMain: { type: Boolean, default: false }
  },

  emits: ['titre-event-track'],

  data() {
    return {
      map: null,
      zoom: 0,
      markersVisible: true,
      patternVisible: true
    }
  },

  computed: {
    bounds() {
      return this.geojsonLayers[0] ? this.geojsonLayers[0].getBounds() : [0, 0]
    },

    tilesActive() {
      return this.$store.getters['user/tilesActive']
    },

    tilesLayer() {
      return leafletTilesBuild(this.tilesActive)
    },

    legends() {
      return leafletTilesLegendGet(this.tilesActive)
    },

    geojsonLayers() {
      const className = this.patternVisible
        ? `svg-fill-pattern-${this.titreTypeId}-${this.domaineId}`
        : `svg-fill-domaine-${this.domaineId}`

      const options = {
        style: { fillOpacity: 0.75, weight: 1, color: 'white', className }
      }

      const geojsonLayer = leafletGeojsonBuild(this.geojson, options)

      return [geojsonLayer]
    },

    markerLayers() {
      if (this.markersVisible) {
        return this.points.reduce((markers, point) => {
          if (!point.nom) {
            return markers
          }

          const icon = leafletDivIconBuild({
            className: `small mono border-bg color-text py-xs px-s inline-block leaflet-marker-camino cap pill bg-bg`,
            html: point.nom,
            iconSize: null,
            iconAnchor: [15.5, 38]
          })

          const latLng = [point.coordonnees.y, point.coordonnees.x]
          const titreMarker = leafletMarkerBuild(latLng, icon)

          markers.push(titreMarker)

          return markers
        }, [])
      }

      return []
    },

    tiles() {
      return this.$store.state.user.metas.tiles
    },

    tilesId() {
      return this.$store.state.user.preferences.carte.tilesId
    }
  },

  watch: {
    geojson: 'centrer',
    points: 'centrer'
  },

  mounted() {
    this.centrer()
  },

  methods: {
    preferencesUpdate(params) {
      this.$emit('titre-event-track', {
        categorie: 'titre-sections',
        action: 'titre-carte_choisirFond',
        nom: this.$route.params.id
      })

      this.$store.dispatch('user/preferencesSet', { section: 'carte', params })
    },

    centrerTrack() {
      this.centrer()

      this.$emit('titre-event-track', {
        categorie: 'titre-sections',
        action: 'titre-carte_centrer',
        nom: this.$route.params.id
      })
    },

    centrer() {
      this.$refs.map.boundsFit(this.bounds)
    }
  }
}
</script>
