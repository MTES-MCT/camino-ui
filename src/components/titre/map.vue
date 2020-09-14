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
              @click="centrerTrack"
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
import Map from '../_map/index.vue'
import MapTilesSelector from '../_map/tiles-selector.vue'
import MapWarningBrgm from '../_map/warning-brgm.vue'
import MapPattern from '../_map/pattern.vue'

import { tilesBuild } from '../_map/map.js'

export default {
  components: { MapPattern, MapWarningBrgm, Map, MapTilesSelector },

  props: {
    geojson: { type: Object, required: true },
    points: { type: Array, default: () => [] },
    domaineId: { type: String, default: '' },
    typeId: { type: String, default: '' }
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

      return tilesBuild(tiles)
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
    geojson: 'centrer',
    points: 'centrer'
  },

  mounted() {
    this.centrer()
  },

  methods: {
    preferencesUpdate(params) {
      this.$emit('titre:eventTrack', {
        categorie: 'titre-sections',
        action: 'titre-carte_choisirFond',
        nom: this.$route.params.id
      })
      this.$store.dispatch('user/preferencesSet', {
        section: 'carte',
        params
      })
    },

    centrerTrack() {
      this.centrer()

      this.$emit('titre:eventTrack', {
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
