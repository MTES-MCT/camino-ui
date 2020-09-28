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
import { numberFormat } from '../../utils'

const textToNumberFormat = value =>
  parseFloat(
    value
      .replace(/\s/g, '')
      .replace(/,/g, '.')
      .replace(/[^0-9\s,.]/g, '')
  )

export default {
  props: {
    value: { type: Number, default: undefined }
  },

  computed: {
    valueFormatted() {
      return this.value ? numberFormat(this.value) : this.value
    }
  },

  methods: {
    textToNumberFormat(target) {
      const number = textToNumberFormat(target.value)

      this.$emit('input', Number.isNaN(number) ? undefined : number)
    }
  }
}
</script>
