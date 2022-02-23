<template>
  <div>
    <div v-for="s in sections" :key="s.id">
      <h3 v-if="s.nom" class="cap-first">{{ s.nom }}</h3>

      <SectionElementEdit
        v-for="e in s.elements"
        :key="e.id"
        v-model:contenu="content[s.id]"
        :element="e"
      />
    </div>
  </div>
</template>

<script>
import {
  elementContenuBuild,
  contenuBuild,
  contenuCompleteCheck
} from '../../utils/contenu'

import SectionElementEdit from './section-element-edit.vue'

export default {
  components: { SectionElementEdit },

  props: {
    sections: { type: Array, required: true },
    contenu: { type: [Object, null], required: true }
  },

  emits: ['complete-update', 'contenu-update'],

  data() {
    return {
      content: {}
    }
  },

  computed: {
    complete() {
      return contenuCompleteCheck(this.sections, this.content)
    }
  },

  watch: {
    content: {
      handler: function (content) {
        this.$emit(
          'contenu-update',
          elementContenuBuild(this.sections, content)
        )
      },
      deep: true
    },

    complete: function (complete) {
      this.$emit('complete-update', complete)
    }
  },

  created() {
    this.content = contenuBuild(this.sections, this.contenu)
    this.$emit('complete-update', this.complete)
  }
}
</script>
