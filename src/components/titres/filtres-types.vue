<template>
  <span class="cap-first">{{ element.nom }}</span>
</template>

<script>
export default {
  props: {
    element: { type: Object, default: () => ({}) }
  }
}
</script>
