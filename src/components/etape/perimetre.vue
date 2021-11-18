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
        :points="etape.points"
        :geojson-multi-polygon="geojsonMultiPolygon"
        :tab-id="tabId"
        @tab-update="tabUpdate"
      />
    </div>
  </div>

  <div v-if="etape.surface" class="tablet-blobs">
    <div class="tablet-blob-1-4">
      <h5>
        Surface
        <Tag
          v-if="etape.incertitudes && etape.incertitudes.surface"
          :mini="true"
          color="bg-info"
          class="ml-xs"
        >
          Incertain
        </Tag>
      </h5>
    </div>
    <div class="tablet-blob-3-4">
      <p>{{ numberFormat(etape.surface) }} km² environ</p>
    </div>
  </div>
</template>

<script>
import Perimetre from '../_common/perimetre.vue'
import Tag from '../_ui/tag.vue'
import numberFormat from '@/utils/number-format'

export default {
  components: { Perimetre, Tag },

  props: {
    etape: { type: Object, required: true },
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
    },

    numberFormat(number) {
      return numberFormat(number)
    }
  }
}
</script>
