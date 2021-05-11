<template>
  <div>
    <div class="tablet-blobs">
      <div v-if="element.nom" class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5 class="mb-0">
          <span class="cap-first">{{ element.nom }}</span>
        </h5>
        <p v-if="element.optionnel" class="h6 italic mb-0">Optionnel</p>
      </div>

      <div
        :class="{
          'tablet-blob-2-3': element.nom,
          'tablet-blob-1': !element.nom
        }"
      >
        <EditSectionElementModifiable
          v-if="modifiable"
          v-model:contenu="contenu"
          class="mb-s"
          :element="element"
        />

        <p v-else-if="hasValeur" class="pt-s py-xs mb-0">{{ valeur }}</p>
        <p v-else-if="!element.optionnel" class="color-warning pt-s mb-0">
          À compléter pour valider
        </p>

        <!-- eslint-disable vue/no-v-html -->
        <p
          v-if="(element.description && modifiable) || hasValeur"
          class="h6"
          v-html="element.description"
        />
      </div>
    </div>

    <hr />
  </div>
</template>

<script>
import { valeurFind, hasValeurCheck } from '../../utils/contenu'
import EditSectionElementModifiable from '../_common/edit-sections-element-modifiable.vue'

export default {
  components: {
    EditSectionElementModifiable
  },

  props: {
    contenu: { type: Object, required: true },
    element: { type: Object, required: true },
    modifiable: { type: Boolean, default: true }
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
