<template>
  <div>
    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-2 flex mb-s">
        <Download
          v-if="points.length && titreId"
          :section="`titres/${titreId}`"
          format="geojson"
          class="btn-border small pill pl pr-m py-s flex-right"
        >
          geojson
        </Download>
      </div>

      <div class="tablet-blob-1-2 flex">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="mr-xs"
          :class="{ active: tabId === tab.id }"
        >
          <button
            v-if="tabId !== tab.id"
            class="p-m btn-tab rnd-t-s"
            @click="tabUpdate(tab.id)"
          >
            <i :class="`icon-${tab.icon}`" class="icon-24" />
          </button>
          <div v-else class="p-m span-tab rnd-t-s">
            <i :class="`icon-${tab.icon}`" class="icon-24" />
          </div>
        </div>
      </div>
    </div>

    <div class="line-neutral" :class="{ 'width-full': isMain }" />

    <Map
      v-if="points && geojsonMultiPolygon && tabId === 'carte'"
      :class="{ 'width-full': isMain }"
      :geojson="geojsonMultiPolygon"
      :points="points"
      :domaine-id="domaineId"
      :titre-type-id="titreTypeId"
      :is-main="isMain"
    />

    <div
      v-if="points && tabId === 'points'"
      class="points bg-alt"
      :class="{ 'width-full': isMain }"
    >
      <div class="bg-bg py" :class="{ container: isMain }">
        <Points :points="points" />
      </div>
    </div>

    <div class="line mb" :class="{ 'width-full': isMain }" />
  </div>
</template>

<script>
import Map from './map.vue'
import Points from './points.vue'
import Download from './download.vue'

export default {
  components: {
    Map,
    Points,
    Download
  },

  props: {
    points: { type: Array, required: true },
    geojsonMultiPolygon: { type: Object, required: true },
    domaineId: { type: String, required: true },
    titreTypeId: { type: String, required: true },
    titreId: { type: String, default: '' },
    isMain: { type: Boolean, default: false },
    tabId: { type: String, default: 'carte' }
  },

  emits: ['tab-update'],

  data() {
    return {
      tabs: [
        { id: 'carte', nom: 'Carte', icon: 'globe' },
        { id: 'points', nom: 'Points', icon: 'list' }
      ]
    }
  },

  methods: {
    tabUpdate(tabId) {
      this.$emit('tab-update', tabId)
    }
  }
}
</script>
