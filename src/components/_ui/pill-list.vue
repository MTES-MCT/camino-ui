<template>
  <ul class="list-inline">
    <li
      v-for="element in elements"
      :key="element"
      class="mr-xs mb-xs"
    >
      <Pill
        :color="element.color"
        class="lh-2"
      >
        {{ element }}
      </Pill>
    </li>
  </ul>
</template>

<script>
import Pill from './pill.vue'

export default {
  components: {
    Pill
  },

  props: {
    elements: {
      type: Array,
      default: () => []
    }
  }
}
</script>
