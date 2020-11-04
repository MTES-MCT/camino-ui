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

const textToNumberFormat = (text, options) => {
  let value = text.replace(/\s/g, '').replace(/,/g, '.')

  value = options.negative
    ? value.replace(/[^0-9\s,.-]/g, '')
    : value.replace(/[^0-9\s,.]/g, '')

  if (options.integer) {
    value = value.replace(/\.[^.]*$/, '')
  }

  const number = parseFloat(value)

  return Number.isNaN(number) ? undefined : number
}

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
      const number = textToNumberFormat(target.value, {
        negative: this.negative,
        integer: this.integer
      })

      this.$emit('input', number)
    }
  }
}
</script>
