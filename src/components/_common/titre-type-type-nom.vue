<template>
  <span class="small bold cap-first">{{ titreTypeTypeNom }}</span>
</template>
<script>
export default {
  props: {
    nom: { type: String, default: '' }
  }
}
</script>
