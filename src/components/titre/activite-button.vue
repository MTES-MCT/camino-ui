<template>
  <button
    class="btn rnd-xs py-s px-m"
    @click="activitePopupOpen"
  >
    {{ buttonText }}
  </button>
</template>

<script>
import activitePopup from './activite-popup.vue'

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
    activitePopupOpen() {
      const activite = JSON.parse(JSON.stringify(this.activite))

      activite.contenu = this.activite.sections.reduce(
        (sectionsObj, s) =>
          Object.assign(sectionsObj, {
            [s.id]: s.elements.reduce(
              (elementsObj, e) =>
                Object.assign(elementsObj, {
                  [e.id]:
                    this.activite.contenu &&
                    this.activite.contenu[s.id] &&
                    this.activite.contenu[s.id][e.id]
                }),
              {}
            )
          }),
        {}
      )

      this.$store.commit('popupOpen', {
        component: activitePopup,
        props: {
          activite
        }
      })
    }
  }
}
</script>
