<template>
  <div
    :class="`${color}`"
    class="h6 bold color-bg py-xs px-s pill inline-block">
    <slot />
  </div>
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
