<template>
  <div v-if="etape.points && etape.points.length" class="tablet-blobs">
    <div class="tablet-blob-1-4">
      <h5>
        Périmètre
        <Tag
          v-if="etape.incertitudes && etape.incertitudes.points"
          :mini="true"
          color="bg-info"
          class="ml-xs"
        >
          Incertain
        </Tag>
      </h5>
    </div>
    <div class="tablet-blob-3-4">
      <Points :points="etape.points" />
    </div>
  </div>
</template>

<script>
import Points from '../_common/points.vue'
import Tag from '../_ui/tag.vue'

export default {
  components: { Points, Tag },

  props: {
    etape: { type: Object, required: true }
  }
}
</script>
