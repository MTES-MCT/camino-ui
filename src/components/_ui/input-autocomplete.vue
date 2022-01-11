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
    },
    disableEnter: {
      type: Boolean,
      default: false
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
    optionsDisabled: {
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
      },
      callbackOnInit: async () => {
        await this.$nextTick()
        this.optionsSet()
      }
    })
    this.autocompleter.passedElement.element.addEventListener('change', () => {
      this.$emit('update:selected', this.autocompleter.getValue(true))
    })

    if (this.disableEnter) {
      this.autocompleter._onEnterKey = () => null
    }
  },

  unmounted: function () {
    this.autocompleter.destroy()
  },

  methods: {
    optionsSet() {
      if (this.options.length && this.autocompleter) {
        const options = []

        if (this.placeholder) {
          options.push({
            [this.valueProp]: '',
            [this.labelProp]: this.placeholder,
            selected: !this.selected || !this.selected.length,
            disabled: true,
            placeholder: true
          })
        }
        options.push(
          ...this.options.map(o => ({
            ...o,
            selected: this.selected.includes(o[this.valueProp]),
            disabled: this.optionsDisabled
              .map(o => o[this.valueProp])
              .includes(o[this.valueProp])
          }))
        )
        this.autocompleter.setChoices(
          options,
          this.valueProp,
          this.labelProp,
          true
        )
      }
    }
  }
}
</script>
