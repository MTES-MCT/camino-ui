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
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  emits: ['update:selected', 'opened', 'search'],

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
    optionsDisabled: {
      deep: true,
      handler() {
        this.optionsSet()
      }
    },
    options: {
      deep: true,
      handler() {
        this.optionsSet()
      }
    },
    selected: {
      handler() {
        this.autocompleter.removeActiveItems()
        this.selected.forEach(choice =>
          this.autocompleter.setChoiceByValue(choice)
        )
      }
    }
  },

  mounted() {
    this.autocompleter = new Choices(this.$refs.select, {
      renderChoiceLimit: 10,
      maxItemCount: this.maxItems,
      shouldSort: false,
      removeItemButton: true,
      loadingText: 'Chargement...',
      noResultsText: 'Aucun résultat',
      noChoicesText: 'Veuillez saisir votre recherche',
      itemSelectText: 'Choisir',
      addItemText: value => {
        return `Appuyez sur Entrée pour ajouter <b>"${value}"</b>`
      },
      maxItemText: maxItemCount => {
        return `${maxItemCount} choix maximum`
      }
    })
    this.autocompleter.passedElement.element.addEventListener('change', () => {
      this.$emit('update:selected', this.autocompleter.getValue(true))
    })
    this.autocompleter.passedElement.element.addEventListener(
      'showDropdown',
      () => {
        this.$emit('opened', true)
      }
    )
    this.autocompleter.passedElement.element.addEventListener(
      'hideDropdown',
      () => {
        this.$emit('opened', false)
      }
    )
    this.autocompleter.passedElement.element.addEventListener('search', e => {
      this.$emit('search', e.detail.value)
    })

    this.$nextTick().then(() => this.optionsSet())
  },

  unmounted: function () {
    this.autocompleter.destroy()
  },

  methods: {
    optionsSet() {
      if (this.options.length && this.autocompleter) {
        const newOptions = []

        if (this.placeholder) {
          newOptions.push({
            [this.valueProp]: '',
            [this.labelProp]: this.placeholder,
            selected: !this.selected || !this.selected.length,
            disabled: true,
            placeholder: true
          })
        }
        newOptions.push(
          ...this.options.map(o => ({
            ...o,
            selected: this.selected.includes(o[this.valueProp]),
            disabled: this.optionsDisabled
              .map(o => o[this.valueProp])
              .includes(o[this.valueProp])
          }))
        )
        this.autocompleter.clearStore()
        this.autocompleter.setChoices(
          newOptions,
          this.valueProp,
          this.labelProp,
          false
        )
      }
    }
  }
}
</script>
