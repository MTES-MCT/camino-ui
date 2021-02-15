<template>
  <div v-if="coordonnees" class="p-xs"><i class="icon-16 icon-globe" /></div>
</template>

<script>
export default {
  props: {
    coordonnees: { type: Object, default: null }
  }
}
</script>
