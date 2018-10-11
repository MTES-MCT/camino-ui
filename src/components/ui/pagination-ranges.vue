<template>
  <accordion class="mb">
    <template slot="title">Pages</template>
    <ul class="list-sans mt-m">
      <li
        v-for="range in ranges"
        :key="range"
      >
        <label>
          <input
            :checked="range === rangeActive"
            :value="range"
            type="radio"
            class="mr-s"
            @change="pageRangeChange"
          >
          {{ range }}
        </label>
      </li>
    </ul>
  </accordion>
</template>

<script>
import Accordion from './accordion.vue'

export default {
  name: 'UiPagination',

  components: {
    Accordion
  },

  props: {
    ranges: {
      type: Array,
      default: () => ([])
    },
    rangeActive: {
      type: Number,
      default: 10
    }
  },

  methods: {
    pageRangeChange (event) {
      this.$emit('page-range-change', event.target.value)
    }
  }
}
</script>
