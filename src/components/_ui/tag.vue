<template>
  <span
    :class="`${color}`"
    class="h5 py-xxs px-xs color-bg rnd-xs ml-xs"
  >
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
