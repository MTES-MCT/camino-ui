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
    references: { type: Array, required: true }
  },

  computed: {
    pointReference() {
      if (this.references) {
        return [
          numberFormat(this.round(this.references[0])),
          numberFormat(this.round(this.references[1]))
        ]
      }

      return ['–', '–']
    }
  },

  methods: {
    round(v) {
      return Math.round(Number.parseFloat(v) * 1000000) / 1000000
    }
  }
}
</script>
