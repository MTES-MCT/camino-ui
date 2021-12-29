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
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],

  data() {
    return {
      autocompleter: null
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
    }
  },

  mounted() {
    this.autocompleter = new Choices(this.$refs.select, {
      maxItemCount: 1,
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
      },
      valueComparer: (value1, value2) => {
        return value1 === value2
      }
    })
    this.$refs.select.addEventListener('addItem', this.handleSelectChange)
  },

  unmounted: function () {
    this.autocompleter.destroy()
  },

  methods: {
    handleSelectChange(e) {
      this.$emit('update:modelValue', e.target.value)
    },

    setChoices() {
      if (this.autocompleter) {
        this.autocompleter.setChoices(this.items, 'text', 'text', true)
      }
    }
  }
}
</script>
