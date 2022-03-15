<template>
  <span class="cap-first small bold">
    <span :class="`${color}`" class="color-bg pill py-xs px-s">
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
