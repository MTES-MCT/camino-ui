<template>
  <div>
    <leaflet-map
      :tiles="tiles.find(t => t.name === tileCurrent)"
      :layers="[]"
      :markers="[]"
      :bounds="boundsList[boundsCurrent]" />
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <ul class="list-inline">
          <li>
            <button
              class="btn-border px-m py-s"
              @click="boundsCurrent = 'fr'">Métropole</button>
          </li>
          <li>
            <button
              class="btn-border px-m py-s"
              @click="boundsCurrent = 'gf'">Guyane</button>
          </li>
        </ul>
      </div>
      <div class="desktop-blob-1-2">
        <accordion class="mb">
          <template slot="title">Fond de carte</template>
          <ul class="list-sans">
            <li
              v-for="tile in tiles"
              :key="tile.type">
              <label>
                <input
                  v-model="tileCurrent"
                  :value="tile.name"
                  type="radio"
                  class="mr-s"
                  @change="tileCurrent = tile.name">
                {{ tile.name }}
              </label>
            </li>
          </ul>
        </accordion>
      </div>
    </div>
  </div>
</template>

<script>
import mapTiles from '@/conf/mapTiles.json'
import Accordion from '@/components/ui/Accordion.vue'
import LeafletMap from '@/components/ui/LeafletMap.vue'

export default {
  components: {
    Accordion,
    LeafletMap
  },

  props: {
    titles: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      map: null,
      tileLayer: null,
      boundsList: {
        fr: {
          type: 'LineString',
          coordinates: [[-5.1406, 41.3337], [9.5593, 51.0891]]
        },
        gf: {
          type: 'LineString',
          coordinates: [[-54.5425, 2.1271], [-51.6139, 5.7765]]
        }
      },
      boundsCurrent: 'fr',
      tiles: mapTiles,
      tileCurrent: 'Géoportail / Plan IGN',
      colors: {
        mineraux: '#498bd6',
        'mineraux-rntm': '#498bd6',
        hydrocarbures: '#856940',
        stockage: '#8468b1',
        geothermie: '#d16c3e'
      },
      mocks: [
        {
          id: 'mineraux-rntm',
          opacity: 0.25
        },
        {
          id: 'mineraux',
          opacity: 0.5
        },
        {
          id: 'hydrocarbures',
          opacity: 0.5
        },
        {
          id: 'stockage',
          opacity: 0.5
        },
        {
          id: 'geothermie',
          opacity: 0.5
        }
      ],
      titleLayers: [],
      titleMarkers: []
    }
  },

  mounted () {

  },

  methods: {
    mapChange () {
    }
  }
}
</script>
