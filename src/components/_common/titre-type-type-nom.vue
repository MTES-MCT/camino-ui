<template>
  <span class="small bold cap-first">{{ nom }}</span>
</template>
<script>
export default {
  props: {
    nom: { type: String, default: '' }
  }
}
</script>
