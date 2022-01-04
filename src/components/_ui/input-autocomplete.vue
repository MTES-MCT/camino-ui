<template>
  <select ref="select" multiple>
    <slot />
  </select>
</template>

<script>
import Choices from 'choices.js'

export default {
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    maxItems: {
      type: Number,
      default: -1
    }
  },
  emits: ['update:modelValue'],

  data() {
    return {
      autocompleter: null,
      values: []
    }
  },

  watch: {
    items: {
      immediate: true,
      handler(items) {
        if (items.length) {
          this.setChoices()
        }
      }
    },
    // Met à jour le rendu des chips dans Choices.js
    // par rapport à la valeur via v-model.
    modelValue: {
      handler(val) {
        if (!val || val[0] === '') {
          this.autocompleter.removeActiveItems()
        }
      }
    }
  },

  mounted() {
    this.autocompleter = new Choices(this.$refs.select, {
      maxItemCount: this.maxItems,
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
  },

  unmounted: function () {
    this.autocompleter.destroy()
  },

  methods: {
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
      this.$emit('update:modelValue', this.values)
    },

    setChoices() {
      if (this.autocompleter) {
        this.autocompleter.setChoices(this.items, 'text', 'text', true)
      }
    }
  }
}
</script>
