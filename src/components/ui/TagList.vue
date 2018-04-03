<template>
  <ul class="list-inline">
    <li
      v-for="element in elements"
      :key="element">
      <tag :value="element" />
    </li>
  </ul>
</template>

<script>
import Tag from './Tag.vue'

export default {
  components: {
    Tag
  },

  props: {
    elements: {
      type: Array,
      default: () => []
    }
  }

}
</script>
