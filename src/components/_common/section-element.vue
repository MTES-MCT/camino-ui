<template>
  <div class="tablet-blobs">
    <div v-if="element.nom" class="tablet-blob-1-4">
      <h6>{{ element.nom }}</h6>
    </div>

    <div
      :class="{ 'tablet-blob-3-4': element.nom, 'tablet-blob-1': !element.nom }"
    >
      <p
        v-if="element.type !== 'multiple'"
        class="cap-first"
        :class="{ 'mb-s': element.description }"
      >
        {{ valeur }}
      </p>

      <SectionElementMultiple
        v-else
        :contenu="contenu[element.id]"
        :element="element"
      />
      <!-- eslint-disable vue/no-v-html -->
      <p v-if="element.description" class="h5">
        <span v-html="element.description" />
      </p>
    </div>
  </div>
</template>

<script>
import { valeurFind } from '../../utils/contenu'
import SectionElementMultiple from './section-element-multiple.vue'

export default {
  name: 'SectionElement',
  components: { SectionElementMultiple },
  props: {
    element: { type: Object, required: true },
    contenu: { type: Object, required: true }
  },

  computed: {
    valeur() {
      return valeurFind(this.element, this.contenu)
    }
  }
}
</script>
