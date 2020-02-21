<template>
  <p class="h5 bold cap-first mb-0">
    {{ nom }}
  </p>
</template>

<script>
export default {
  props: {
    nom: { type: String, default: 'indéfini' }
  }
}
</script>
