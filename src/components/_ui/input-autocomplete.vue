<template>
  <select ref="select" :multiple="isMultiple">
    <slot />
  </select>
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
    }
  },
  emits: ['update:selected'],

  data() {
    return {
      autocompleter: null,
      values: []
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
    // Met à jour le rendu des chips dans Choices.js
    selected: {
      handler(val) {
        if (!val || !val.length || val[0] === '') {
          console.log(this.selected)
          this.autocompleter.removeActiveItems()
        }
      }
    }
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

    setTimeout(() => {
      this.optionsSet()
      this.autocompleter.setChoiceByValue(this.selected.map(c => c))
    }, 500)
  },

  unmounted: function () {
    this.autocompleter.destroy()
  },

  methods: {
    optionsSet() {
      if (this.options.length && this.autocompleter) {
        this.autocompleter.setChoices(
          this.options,
          this.valueProp,
          this.labelProp,
          true
        )
      }
    },

    handleSelectChange(e) {
      const itemIndex = this.values.findIndex(v => v.id === e.detail.id)

      switch (e.type) {
        case 'addItem':
          if (Boolean(this.values.find(v => v.id === e.detail.id)) === false) {
            this.values.push(e.detail)
          }
          break

        case 'removeItem':
          if (itemIndex >= 0) {
            this.values.splice(itemIndex, 1)
          }
          break

        default:
          throw new Error("erreur d'autocomplete")
      }
      this.$emit('update:selected', this.values)
    }
  }
}
</script>
