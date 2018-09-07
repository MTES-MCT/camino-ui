<template>
  <div
    :class="`${color}`"
    class="h6 bold color-bg py-xs px-s pill inline-block cap-first"
  >
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
