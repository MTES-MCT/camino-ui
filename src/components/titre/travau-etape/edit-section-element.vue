<template>
  <div>
    <div class="tablet-blobs">
      <div v-if="element.nom" class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5 class="mb-0">
          <span class="cap-first">{{ element.nom }}</span>
        </h5>
        <p v-if="element.optionnel" class="h6 italic mb-0">Optionnel</p>
      </div>

      <EditSectionElementModifiable
        v-model:contenu="contenu"
        :class="{ 'mb-s': element.description }"
        :element="element"
      />

      <p
        v-if="(element.description && modifiable) || hasValeur"
        class="h6 mb-0"
      >
        <!-- eslint-disable vue/no-v-html -->
        <span v-html="element.description" />
      </p>
    </div>

    <hr />
  </div>
</template>

<script>
import { valeurFind, hasValeurCheck } from '@/utils/contenu'
import EditSectionElementModifiable from '../../_common/edit-sections-element-modifiable.vue'

export default {
  components: {
    EditSectionElementModifiable
  },

  props: {
    contenu: { type: Object, required: true },
    element: { type: Object, required: true }
  },

  computed: {
    hasValeur() {
      return hasValeurCheck(this.element.id, this.contenu)
    },

    valeur() {
      return valeurFind(this.element, this.contenu)
    }
  }
}
</script>
