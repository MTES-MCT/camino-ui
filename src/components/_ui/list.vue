<template>
  <ul class="list-prefix">
    <li
      v-for="element in elements"
      :key="element"
      :class="{ h5: mini}"
    >
      {{ element }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    elements: {
      type: Array,
      default: () => []
    },
    mini: {
      type: Boolean,
      default: false
    }
  }
}
</script>
