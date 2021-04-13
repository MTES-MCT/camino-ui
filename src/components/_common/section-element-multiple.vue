<template>
  <div
    v-for="(e, index) in contenu"
    :key="index"
    class="border rnd-xs p-m mb-s"
  >
    <SectionElement
      v-for="c in element.elements"
      :key="c.id"
      :element="c"
      :contenu="e"
      @file-download="fileDownload"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    SectionElement: defineAsyncComponent(() => import('./section-element.vue'))
  },
  props: {
    element: { type: Object, required: true },
    contenu: { type: Object, required: true }
  },
  emits: ['file-download'],

  methods: {
    fileDownload(fichier) {
      this.$emit('file-download', fichier)
    }
  }
}
</script>
