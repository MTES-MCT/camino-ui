<template>
  <div class="tablet-blobs">
    <div v-if="element.nom" class="tablet-blob-1-4">
      <h6>{{ element.nom }}</h6>
    </div>

    <div
      :class="{ 'tablet-blob-3-4': element.nom, 'tablet-blob-1': !element.nom }"
    >
      <div v-if="element.type === 'file'" class="flex h5 pb-xs">
        <span class="mt-xs flex bold">
          <i class="icon-16 icon-file mr-xs" />
          {{
            contenu[element.id] ? contenu[element.id].slice(5) : 'Aucun fichier'
          }}
        </span>

        <button
          v-if="contenu[element.id]"
          class="btn-border py-xs px-s rnd-xs flex-right mt--xs"
          @click="fileDownload(contenu[element.id])"
        >
          <i class="icon-24 icon-download" />
        </button>
      </div>

      <SectionElementMultiple
        v-else-if="element.type === 'multiple'"
        :contenu="contenu[element.id]"
        :element="element"
        @file-download="fileDownload"
      />

      <p v-else class="cap-first" :class="{ 'mb-s': element.description }">
        {{ valeur }}
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
  emits: ['file-download'],

  computed: {
    valeur() {
      return valeurFind(this.element, this.contenu)
    }
  },

  methods: {
    fileDownload(fichier) {
      this.$emit('file-download', fichier)
    }
  }
}
</script>
