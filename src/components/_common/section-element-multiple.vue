<template>
  <div v-for="(e, index) in contenu" :key="index" class="bg-alt rnd-s p-s m-s">
    <SectionElement
      v-for="c in element.elements"
      :key="c.id"
      :element="c"
      :contenu="e"
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
  }
}
</script>
