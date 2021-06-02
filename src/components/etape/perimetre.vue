<template>
  <div class="tablet-blobs">
    <div class="tablet-blob-1-4">
      <h5>
        Périmètre
        <Tag v-if="incertitude" :mini="true" color="bg-info" class="ml-xs">
          Incertain
        </Tag>
      </h5>
    </div>

    <div class="tablet-blob-3-4">
      <Perimetre
        :domaine-id="domaineId"
        :titre-type-id="titreTypeId"
        :points="points"
        :geojson-multi-polygon="geojsonMultiPolygon"
        :tab-id="tabId"
        @tab-update="tabUpdate"
      />
    </div>
  </div>
</template>

<script>
import Perimetre from '../_common/perimetre.vue'
import Tag from '../_ui/tag.vue'

export default {
  components: { Perimetre, Tag },

  props: {
    points: { type: Array, required: true },
    geojsonMultiPolygon: { type: Object, required: true },
    domaineId: { type: String, required: true },
    titreTypeId: { type: String, required: true },
    incertitude: { type: Boolean, default: false }
  },

  data() {
    return {
      tabId: 'points'
    }
  },

  methods: {
    tabUpdate(tabId) {
      this.tabId = tabId
    }
  }
}
</script>
