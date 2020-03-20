<template>
  <span class="cap-first h6 bold lh-2">
    <span :class="`${color}`" class="color-bg py-xs px-s">
      <slot />
    </span>
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
