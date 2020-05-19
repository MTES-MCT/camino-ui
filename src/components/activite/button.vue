<template>
  <button
    class="cmn-activite-btn-remplir btn py-s px-m h5 flex mr-line"
    @click="activiteEditPopupOpen"
  >
    <div class="my-xxs">
      {{ buttonText }}
    </div>
  </button>
</template>

<script>
import { jsonTypenameOmit } from '../../utils/index'
import activiteEditPopup from '../activite/edit-popup.vue'

export default {
  props: {
    activite: {
      type: Object,
      default: () => ({})
    },

    context: {
      type: String,
      required: true
    }
  },

  computed: {
    buttonText() {
      return this.activite.statut.id === 'abs' ? 'Remplir…' : 'Compléter…'
    }
  },

  methods: {
    activiteEditPopupOpen() {
      const activite = jsonTypenameOmit(this.activite)

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
          activite,
          context: this.context
        }
      })
    }
  }
}
</script>
