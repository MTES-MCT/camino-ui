<template>
  <input
    :value="valueFormatted"
    type="text"
    pattern="([0-9]{1,3}[\s]?)*([.,][0-9]*)?"
    class="p-s text-right"
    @input="textToNumberFormat($event.target)"
  />
</template>

<script>
import { textNumberFormat, textToNumberFormat } from '../../utils'
import numberFormat from '../../utils/number-format'

export default {
  props: {
    value: { type: Number, default: undefined },
    negative: { type: Boolean, default: false },
    integer: { type: Boolean, default: false }
  },

  computed: {
    valueFormatted() {
      if (!this.value) return this.value

      if (this.integer) return numberFormat(Math.floor(this.value))

      return numberFormat(this.value)
    }
  },

  methods: {
    textToNumberFormat(target) {
      target.value = textNumberFormat(target.value, {
        negative: this.negative,
        integer: this.integer
      })

      const number = textToNumberFormat(target.value)

      this.$emit('input', number)
    }
  }
}
</script>
