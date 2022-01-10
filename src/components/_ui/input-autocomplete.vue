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
      handler(val) {
        console.log('optionsDisabled', val)
        this.optionsSet()
      }
    },
    // Aucune garantie d'avoir la liste d'options prête pour la méthode `callbackOnInit`
    // lors de l'instantiation de Choices.js. Nécessité de lier la génération du DOM
    // à la présence effective des options.
    // options: {
    //   immediate: true,
    //   handler(options) {
    //     if (options.length) {
    //       this.optionsSet()
    //     }
    //   }
    // },
    // selected: {
    //   handler(val) {
    //     this.autocompleter.removeActiveItems()
    //     this.selected.forEach(choice =>
    //       this.autocompleter.setChoiceByValue(choice)s
    //     )
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
      },
      // Malgré la redondance avec le watch sur `options`, il est nécessaire
      // de conserver ce callback dans le cas ou `optionsSet` a précédemment
      // été appelé sans effet dû à l'absence d'instance de Choices.js.
      callbackOnInit: async () => {
        await this.$nextTick()
        this.optionsSet()
      }
    })
    this.autocompleter.passedElement.element.addEventListener(
      'change',
      () => this.$emit('update:selected', this.autocompleter.getValue(true))
    )
  },

  unmounted: function () {
    this.autocompleter.destroy()
  },

  methods: {
    optionsSet() {
      if (this.options.length && this.autocompleter) {
        this.autocompleter.setChoices(
          this.options.map(o => ({
            ...o,
            selected: this.selected.includes(o[this.valueProp]),
            disabled: this.optionsDisabled
              .map(o => o[this.valueProp])
              .includes(o[this.valueProp])
          })),
          this.valueProp,
          this.labelProp,
          true
        )
      }
    },

    changeEventsHandler(e) {
      // this.$emit('update:')
      // console.log(e, this.autocompleter.getValue(true));
      // const values = [...this.selected]
      // const itemIndex = values.findIndex(v => v === e.detail.value)

      // switch (e.type) {
      //   case 'addItem':
      //     if (itemIndex === -1) {
      //       values.push(e.detail.value)
      //       this.$emit('update:selected', values)
      //     }
      //     console.log(e.type, this.selected, values)
      //     break

      //   case 'removeItem':
      //     if (itemIndex >= 0) {
      //       values.splice(itemIndex, 1)
      //       this.$emit('update:selected', values)
      //     }
      //     console.log(e.type, this.selected, values)
      //     break
      // }
    }
  }
}
</script>
