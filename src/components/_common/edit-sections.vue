<template>
  <div>
    <div v-for="s in sections" :key="s.id">
      <div v-if="modifiable || s.elements.some(e => e.valeur || e.valeur === 0 || !e.optionnel)">
        <h3 v-if="s.nom">{{ s.nom }}</h3>

        <EditSectionElement
          v-for="e in s.elements"
          :key="e.id"
          :contenu.sync="contenu[s.id]"
          :element="e"
          :modifiable="modifiable"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EditSectionElement from './edit-section-element.vue'
export default {
  components: {
    EditSectionElement
  },

  props: {
    sections: { type: Array, default: () => [] },
    element: { type: Object, default: () => ({}) },
    modifiable: { type: Boolean, default: true }
  },

  data() {
    return {
      contenu: {}
    }
  },

  computed: {
    complete() {
      return this.sections.reduce(
        (complete, s) =>
          s.elements.reduce((sectionComplete, e) => {
            const value =
              this.contenu[s.id] &&
              (e.type === 'checkboxes'
                ? this.contenu[s.id][e.id].length || null
                : this.contenu[s.id][e.id])

            return sectionComplete && !!(value || value === 0 || e.optionnel)
          }, complete),
        true
      )
    }
  },

  watch: {
    contenu: {
      handler: function(c) {
        this.element.contenu =
          this.sections &&
          this.sections.reduce((contenu, section) => {
            if (Object.keys(c[section.id]).length) {
              if (!contenu) {
                contenu = {}
              }
              contenu[section.id] = c[section.id]
            }

            return contenu
          }, null)
      },
      deep: true
    },

    complete: function(complete) {
      this.$emit('complete-update', complete)
    }
  },

  created() {
    this.contenu =
      this.sections &&
      this.sections.reduce((contenu, section) => {
        if (section) {
          contenu[section.id] =
            (this.element.contenu && this.element.contenu[section.id]) || {}
        }

        return contenu
      }, {})

    this.$emit('complete-update', this.complete)
  }
}
</script>
