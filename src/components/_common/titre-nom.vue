<template>
  <span class="bold">{{ nom }}</span>
</template>

<script>
export default {
  props: {
    nom: { type: String, default: '' }
  }
}
</script>
