<template>
  <div>
    <h4 v-if="section.nom && entete" class="cap-first">
      {{ section.nom }}
    </h4>

    <SectionElement
      v-for="e in elements"
      :key="e.id"
      :element="e"
      :contenu="contenu"
      @file-download="fileDownload"
    />
  </div>
</template>

<script>
import SectionElement from './section-element.vue'

export default {
  components: {
    SectionElement
  },

  props: {
    entete: { type: Boolean, default: true },
    section: { type: Object, required: true },
    contenu: { type: Object, default: () => ({}) },
    date: { type: String, default: '' }
  },

  emits: ['file-download'],

  computed: {
    elements() {
      return this.section.elements.filter(
        e =>
          !this.date ||
          // si la date existe, vérifie qu'elle est dans les bornes de l'élément
          ((!e.dateDebut || e.dateDebut < this.date) &&
            (!e.dateFin || e.dateFin >= this.date))
      )
    }
  },

  methods: {
    fileDownload(fichier) {
      this.$emit('file-download', fichier)
    }
  }
}
</script>
