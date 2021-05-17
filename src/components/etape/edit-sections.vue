<template>
  <div>
    <div v-for="s in sections" :key="s.id">
      <h3 v-if="s.nom">{{ s.nom }}</h3>

      <EditSectionElement
        v-for="e in s.elements"
        :key="e.id"
        v-model:contenu="contenu[s.id]"
        :element="e"
        :heritage="etape.heritageContenu[s.id]"
        :section-id="s.id"
      />
    </div>
  </div>
</template>

<script>
import {
  elementContenuBuild,
  contenuBuild,
  contenuCompleteCheck
} from '@/utils/contenu'
import EditSectionElement from './edit-section-element.vue'

export default {
  components: {
    EditSectionElement
  },

  props: {
    sections: { type: Array, required: true },
    etape: { type: Object, required: true }
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
      handler: function (contenu) {
        this.etape.contenu = elementContenuBuild(this.sections, contenu)
      },
      deep: true
    },

    complete: function (complete) {
      this.$emit('complete-update', complete)
    }
  },

  created() {
    this.contenu = contenuBuild(this.sections, this.etape.contenu)
    this.$emit('complete-update', this.complete)
  }
}
</script>
