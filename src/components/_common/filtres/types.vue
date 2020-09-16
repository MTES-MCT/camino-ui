<template>
  <span>
    <svg width="24" height="24" class="mr-s mb--xs">
      <rect width="24" height="24" :class="`svg-fill-pattern-${element.id}`" />
    </svg>
    <span class="cap-first h5 bold">{{ element.nom }}</span>
  </span>
</template>

<script>
export default {
  props: {
    element: { type: Object, default: () => ({}) }
  }
}
</script>
