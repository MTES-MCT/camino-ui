<template>
  <ul class="list-inline">
    <li
      v-for="element in elements"
      :key="element"
      class="mr-xs"
    >
      <Tag
        :color="element.color"
        class="lh-2"
      >
        {{ element }}
      </Tag>
    </li>
  </ul>
</template>

<script>
import Tag from './tag.vue'

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
