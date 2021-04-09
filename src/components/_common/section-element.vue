<template>
  <div>
    <div v-if="element.nom" class="tablet-blob-1-3">
      <h6>{{ element.nom }}</h6>
    </div>

    <div
      :class="{ 'tablet-blob-2-3': element.nom, 'tablet-blob-1': !element.nom }"
    >
      <p
        v-if="element.type !== 'multiple'"
        class="cap-first"
        :class="{ 'mb-s': element.description }"
      >
        {{ valeur }}
      </p>
      <p v-else>
        <SectionElementMultiple
          :contenu="contenu[element.id]"
          :element="element"
        />
      </p>
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
