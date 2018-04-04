<template>
  <span
    :class="`${color}`"
    class="h6 bold color-bg py-xs px-s rnd">
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'bg-neutral'
    }
  }
}
</script>
