<template>
  <div>
    <div class="tablet-blobs">
      <div v-if="element.nom" class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5 class="mb-0">
          <span class="cap-first">{{ element.nom }}</span>
        </h5>
        <p v-if="element.optionnel" class="h6 italic mb-0">Optionnel</p>
        <Tag v-else-if="!complete" color="bg-warning" :mini="true"
          >Incomplet</Tag
        >
      </div>

      <div
        :class="{
          'tablet-blob-2-3': element.nom,
          'tablet-blob-1': !element.nom
        }"
      >
        <SectionElementEdit
          v-model:contenu="contenu"
          class="mb-s"
          :element="element"
        />

        <!-- eslint-disable vue/no-v-html -->
        <p
          v-if="element.description || hasValeur"
          class="h6"
          v-html="element.description"
        />
      </div>
    </div>

    <hr />
  </div>
</template>

<script>
import {
  valeurFind,
  hasValeurCheck,
  elementsCompleteCheck
} from '../../utils/contenu'
import SectionElementEdit from './section-element-input-edit.vue'
import Tag from '../_ui/tag.vue'

export default {
  components: { SectionElementEdit, Tag },

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
    },

    complete() {
      return elementsCompleteCheck([this.element], this.contenu, true)
    }
  }
}
</script>
