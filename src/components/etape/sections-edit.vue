<template>
  <div>
    <div v-for="s in sections" :key="s.id">
      <h3 v-if="s.nom">{{ s.nom }}</h3>

      <SectionElementEdit
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
import SectionElementEdit from './section-element-edit.vue'

export default {
  components: {
    SectionElementEdit
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

    complete: 'completeUpdate'
  },

  created() {
    this.contenu = contenuBuild(this.sections, this.etape.contenu)
    this.completeUpdate()
  },

  methods: {
    completeUpdate() {
      this.$emit('complete-update', this.complete)
    }
  }
}
</script>
