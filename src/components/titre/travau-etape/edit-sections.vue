<template>
  <div>
    <div v-for="s in sections" :key="s.id">
      <h3 v-if="s.nom">{{ s.nom }}</h3>

      <EditSectionElement
        v-for="e in s.elements"
        :key="e.id"
        :contenu.sync="contenu[s.id]"
        :element="e"
      />
    </div>
  </div>
</template>

<script>
import { elementContenuBuild, contenuBuild } from '../../../utils/contenu'
import EditSectionElement from './edit-section-element.vue'

export default {
  components: {
    EditSectionElement
  },

  props: {
    sections: { type: Array, required: true },
    etape: { type: Object, required: true }
  },

  data() {
    return {
      contenu: {}
    }
  },

  watch: {
    contenu: {
      handler: function(contenu) {
        this.etape.contenu = elementContenuBuild(this.sections, contenu)
      },
      deep: true
    }
  },

  created() {
    this.contenu = contenuBuild(this.sections, this.etape.contenu)
  },

  methods: {
    elementsVisibleCheck(elements) {
      return elements.some(e => e.valeur || e.valeur === 0 || !e.optionnel)
    }
  }
}
</script>
