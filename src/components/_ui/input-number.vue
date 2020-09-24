<template>
  <input
    :value="numberFormatValue"
    type="text"
    pattern="([0-9]{1,3}[\s]?)*([.,][0-9]*)?"
    :class="{ 'mb-s': value, mb: !value }"
    @change="control($event.target)"
  />
</template>

<script>
import { numberFormat, textToNumberFormat } from '../../utils'
export default {
  props: {
    value: { type: Number, default: undefined }
  },

  computed: {
    numberFormatValue() {
      return numberFormat(this.value)
    }
  },

  methods: {
    control(target) {
      this.$emit('input', parseFloat(textToNumberFormat(target.value)))
    }
  }
}
</script>
