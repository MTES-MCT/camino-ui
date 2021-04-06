<template>
  <div>
    <div v-for="s in sections" :key="s.id">
      <div v-if="modifiable || elementsVisibleCheck(s.elements, contenu[s.id])">
        <h3 v-if="s.nom">{{ s.nom }}</h3>

        <EditSectionElement
          v-for="e in s.elements"
          :key="e.id"
          v-model:contenu="contenu[s.id]"
          :element="e"
          :modifiable="modifiable"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  elementContenuBuild,
  contenuBuild,
  contenuCompleteCheck,
  elementsVisibleCheck
} from '../../utils/contenu'

import EditSectionElement from './edit-section-element.vue'

export default {
  components: {
    EditSectionElement
  },

  props: {
    sections: { type: Array, required: true },
    element: { type: Object, required: true },
    modifiable: { type: Boolean, default: true }
  },

  emits: ['complete-update'],

  data() {
    return {
      contenu: {}
    }
  },

  computed: {
    complete() {
      return contenuCompleteCheck(this.sections, this.contenu)
    }
  },

  watch: {
    contenu: {
      handler: function(contenu) {
        this.element.contenu = elementContenuBuild(this.sections, contenu)
      },
      deep: true
    },

    complete: function(complete) {
      this.$emit('complete-update', complete)
    }
  },

  created() {
    this.contenu = contenuBuild(this.sections, this.element.contenu)
    this.$emit('complete-update', this.complete)
  },

  methods: {
    elementsVisibleCheck(elements, contenu) {
      return elementsVisibleCheck(elements, contenu)
    }
  }
}
</script>
