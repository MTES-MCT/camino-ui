<template>
  <button @click="activiteEditPopupOpen">
    {{ buttonText }}
  </button>
</template>

<script>
import activiteEditPopup from './activite-edit-popup.vue'

export default {
  props: {
    activite: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    buttonText() {
      return this.activite.statut.id === 'abs' ? 'Remplir…' : 'Compléter…'
    }
  },

  methods: {
    activiteEditPopupOpen() {
      const activite = JSON.parse(JSON.stringify(this.activite))

      activite.contenu = this.activite.sections.reduce(
        (sectionsObj, s) =>
          Object.assign(sectionsObj, {
            [s.id]: s.elements.reduce((elementsObj, e) => {
              const value =
                this.activite.contenu &&
                this.activite.contenu[s.id] &&
                this.activite.contenu[s.id][e.id]

              return Object.assign(elementsObj, {
                [e.id]: value || e.type !== 'checkboxes' ? value : []
              })
            }, {})
          }),
        {}
      )

      this.$store.commit('popupOpen', {
        component: activiteEditPopup,
        props: {
          activite
        }
      })
    }
  }
}
</script>
