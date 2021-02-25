<template>
  <div>
    <div class="tablet-blobs">
      <div v-if="element.nom" class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">
          <span class="cap-first">{{ element.nom }}</span>
        </h6>
        <p v-if="element.optionnel" class="h6 italic mb-0">Optionnel</p>
      </div>

      <EditHeritage
        class="mb"
        :class="{
          'tablet-blob-2-3': element.nom,
          'tablet-blob-1': !element.nom
        }"
        :prop.sync="heritage[element.id]"
        :prop-id="element.id"
        :section-id="sectionId"
      >
        <template #write>
          <EditSectionElementModifiable
            class="mb-s"
            :element="element"
            :contenu.sync="contenu"
          />
        </template>
        <template #read>
          <p class="py-xs mb-0">{{ valeur }}</p>
        </template>

        <p
          v-if="(element.description && modifiable) || hasValeur"
          class="h5 mb-0"
        >
          <!-- eslint-disable vue/no-v-html -->
          <span v-html="element.description" />
        </p>
      </EditHeritage>
    </div>

    <hr />
  </div>
</template>

<script>
import { valeurFind, hasValeurCheck } from '../../../utils/contenu'
import EditSectionElementModifiable from '../../_common/edit-sections-element-modifiable.vue'

import EditHeritage from './edit-heritage.vue'

export default {
  components: {
    EditSectionElementModifiable,
    EditHeritage
  },

  props: {
    contenu: { type: Object, required: true },
    element: { type: Object, required: true },
    heritage: { type: Object, required: true },
    sectionId: { type: String, required: true }
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
