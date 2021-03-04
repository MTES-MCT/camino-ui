<template>
  <button
    class="cmn-activite-btn-remplir btn small py-s px-m flex mr-px"
    @click="activiteEditPopupOpen"
  >
    <div class="my-xxs">
      {{ buttonText }}
    </div>
  </button>
</template>

<script>
import { cloneAndClean } from '../../utils/index'
import activiteEditPopup from '../activite/edit-popup.vue'

export default {
  props: {
    activite: { type: Object, default: () => ({}) },
    context: { type: Object, required: true }
  },

  computed: {
    buttonText() {
      return this.activite.statut.id === 'abs' ? 'Remplir…' : 'Compléter…'
    }
  },

  methods: {
    activiteEditPopupOpen() {
      const activite = cloneAndClean(this.activite)

      activite.contenu = this.activite.sections.reduce((sections, s) => {
        sections[s.id] = s.elements.reduce((elements, e) => {
          const value =
            this.activite.contenu &&
            this.activite.contenu[s.id] &&
            this.activite.contenu[s.id][e.id]

          elements[e.id] = value || e.type !== 'checkboxes' ? value : []

          return elements
        }, {})

        return sections
      }, {})

      activite.documents.forEach(document => {
        document.titreActiviteId = this.activite.id

        document.typeId = document.type.id
        document.fichierNouveau = null

        delete document.type
        delete document.modification
        delete document.suppression
      })

      this.$store.commit('popupOpen', {
        component: activiteEditPopup,
        props: {
          activite,
          context: this.context
        }
      })
    }
  }
}
</script>
