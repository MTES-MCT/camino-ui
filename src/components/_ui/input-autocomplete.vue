<template>
  <select ref="select" :multiple="isMultiple" />
</template>

<script>
import Choices from 'choices.js'

export default {
  props: {
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    selected: {
      type: Array,
      default: () => []
    },
    maxItems: {
      type: Number,
      default: -1
    },
    labelProp: {
      type: String,
      default: 'label'
    },
    valueProp: {
      type: String,
      default: 'value'
    },
    optionsDisabled: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ['update:selected'],

  data() {
    return {
      autocompleter: null
    }
  },

  computed: {
    isMultiple() {
      return this.maxItems === -1 || this.maxItems > 1 || null
    }
  },

  watch: {
    options: {
      deep: true,
      handler() {
        this.optionsSet()
      }
    },
    // selected() {
    //   this.optionsSet()
    // }
    // selected: {
    //   handler(val) {
    //     // Retire toute sélection dans Choices.js si les données sont vides.
    //     if (this.autocompleter && (!val || !val.length || val[0] === '')) {
    //       this.autocompleter.removeActiveItems()
    //     }
    //   }
    // }
  },

  mounted() {
    this.autocompleter = new Choices(this.$refs.select, {
      maxItemCount: this.maxItems,
      shouldSort: false,
      removeItemButton: true,
      loadingText: 'Chargement...',
      noResultsText: 'Aucun résultat',
      noChoicesText: 'Aucun choix à proposer',
      itemSelectText: 'Choisir',
      addItemText: value => {
        return `Appuyez sur Entrée pour ajouter <b>"${value}"</b>`
      },
      maxItemText: maxItemCount => {
        return `${maxItemCount} choix maximum`
      }
    })
    this.$refs.select.addEventListener('addItem', this.handleSelectChange)
    this.$refs.select.addEventListener('removeItem', this.handleSelectChange)

    // Choices.js n'informe pas de son état "initialized"
    // et peut se finaliser après l'arrivée de donnée.
    setTimeout(this.optionsSet, 500)
  },

  unmounted: function () {
    this.autocompleter.destroy()
  },

  methods: {
    optionsSet() {
      if (this.options.length && this.autocompleter) {
        this.autocompleter.setChoices(
          this.options.map(o => ({ ...o,
            selected: this.selected.includes(o[this.valueProp]),
            // disabled: this.optionsDisabled.map(o => o[this.valueProp]).includes(o[this.valueProp]),
          })),
          this.valueProp,
          this.labelProp,
          true
        )
      }
    },

    handleSelectChange(e) {
      const values = [...this.selected]
      const itemIndex = values.findIndex(v => v === e.detail.value)

      switch (e.type) {
        case 'addItem':
          if (itemIndex === -1) {
            values.push(e.detail.value)
          }
          break

        case 'removeItem':
          if (itemIndex >= 0) {
            values.splice(itemIndex, 1)
          }
          break

        default:
          throw new Error("erreur d'autocomplete")
      }
      this.$emit('update:selected', values)
    }
  }
}
</script>
