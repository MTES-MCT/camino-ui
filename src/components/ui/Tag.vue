<template>
  <span
    :class="`bg-${color}`"
    class="h6 bold color-bg py-xs px-s rnd">
    {{ value }}
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'neutral'
    }
  }
}
</script>
