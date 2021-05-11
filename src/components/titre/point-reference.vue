<template>
  <div class="blobs-packed mb-s">
    <div class="blob-packed-1-2 border-l px-s">
      <p class="h6 flex my-xxs">
        <span class="flex-right mono bold">{{ pointReference[0] }}</span>
      </p>
    </div>
    <div class="blob-packed-1-2 border-l px-s">
      <p class="h6 flex my-xxs">
        <span class="flex-right mono bold">{{ pointReference[1] }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import numberFormat from '../../utils/number-format'
export default {
  props: {
    pointReferences: { type: Object, required: true },
    geoSystemeId: { type: String, required: true }
  },

  computed: {
    pointReference() {
      const reference = this.pointReferences[this.geoSystemeId]

      if (reference) {
        return [
          numberFormat(this.round(reference[0])),
          numberFormat(this.round(reference[1]))
        ]
      }

      return ['–', '–']
    }
  },

  methods: {
    round(v) {
      return Math.round(v * 1000000) / 1000000
    }
  }
}
</script>
