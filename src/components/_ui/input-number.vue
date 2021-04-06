<template>
  <input
    :value="valueFormatted"
    type="text"
    pattern="([0-9]{1,3}[\s]?)*([.,][0-9]*)?"
    class="p-s text-right"
    @blur="textToNumberFormat($event.target)"
  />
</template>

<script>
import { textNumberFormat, textToNumberFormat } from '../../utils'
import numberFormat from '../../utils/number-format'

export default {
  props: {
    modelValue: { type: Number, default: undefined },
    negative: { type: Boolean, default: false },
    integer: { type: Boolean, default: false }
  },

  emits: ['update:modelValue'],

  computed: {
    valueFormatted() {
      if (!this.modelValue) return this.modelValue

      if (this.integer) return numberFormat(Math.floor(this.modelValue))

      return numberFormat(this.modelValue)
    }
  },

  methods: {
    textToNumberFormat(target) {
      target.value = textNumberFormat(target.value, {
        negative: this.negative,
        integer: this.integer
      })

      const number = textToNumberFormat(target.value)

      this.$emit('update:modelValue', number)
    }
  }
}
</script>
