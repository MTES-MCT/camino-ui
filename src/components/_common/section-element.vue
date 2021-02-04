<template>
  <div>
    <div v-if="element.nom" class="tablet-blob-1-3">
      <h6>{{ element.nom }}</h6>
    </div>

    <div
      :class="{ 'tablet-blob-2-3': element.nom, 'tablet-blob-1': !element.nom }"
    >
      <p class="cap-first" :class="{ 'mb-s': element.description }">
        {{ valeur }}
      </p>
      <!-- eslint-disable vue/no-v-html -->
      <p v-if="element.description" class="h5">
        <span v-html="element.description" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      required: true
    },
    contenu: {
      type: Object,
      required: true
    }
  },

  computed: {
    valeur() {
      const valeur = this.contenu && this.contenu[this.element.id]

      if (valeur === undefined) {
        return '–'
      }

      const valeurs = this.element.valeurs

      if (valeurs) {
        if (this.element.type === 'checkboxes') {
          return valeur
            .map(id => {
              const valeurCheckbox = valeurs.find(v => v.id === id)

              return valeurCheckbox ? valeurCheckbox.nom : ''
            })
            .join(', ')
        }

        if (this.element.type === 'select') {
          const valeurSelect = valeurs.find(v => v.id === valeur)

          return valeurSelect ? valeurSelect.nom : ''
        }
      }

      if (valeur === true) return 'oui'
      else if (valeur === false) return 'non'

      return Number(valeur) ? this.numberFormat(valeur) : valeur
    }
  }
}
</script>
