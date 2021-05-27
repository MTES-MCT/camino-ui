<template>
  <div>
    <div class="tablet-blobs">
      <div v-if="element.nom" class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5 class="mb-0">
          <span class="cap-first">{{ element.nom }}</span>
        </h5>
        <p v-if="element.optionnel" class="h6 italic mb-0">Optionnel</p>
      </div>

      <HeritageEdit
        v-model:prop="heritage[element.id]"
        class="mb"
        :class="{
          'tablet-blob-2-3': element.nom,
          'tablet-blob-1': !element.nom
        }"
        :prop-id="element.id"
        :section-id="sectionId"
        :is-array="element.type === 'checkboxes'"
      >
        <template #write>
          <SectionElementEdit
            v-model:contenu="contenu"
            class="mb-s"
            :element="element"
          />
        </template>
        <template #read>
          <p v-if="element.type !== 'multiple'" class="pt-s py-xs mb-0">
            {{ valeur }}
          </p>
          <SectionElementMultiple
            v-else
            :contenu="contenu[element.id]"
            :element="element"
          />
        </template>

        <!-- eslint-disable vue/no-v-html -->
        <p v-if="element.description" class="h6" v-html="element.description" />
      </HeritageEdit>
    </div>

    <hr />
  </div>
</template>

<script>
import { valeurFind, hasValeurCheck } from '@/utils/contenu'
import SectionElementEdit from '../_common/section-element-edit.vue'
import HeritageEdit from './heritage-edit.vue'
import SectionElementMultiple from '../_common/section-element-multiple.vue'

export default {
  components: {
    SectionElementMultiple,
    SectionElementEdit,
    HeritageEdit
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
      return valeurFind(
        this.element,
        this.heritage[this.element.id].etape.contenu[this.sectionId]
      )
    }
  }
}
</script>
