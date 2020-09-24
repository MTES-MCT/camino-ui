<template>
  <input
    :value="numberFormatValue"
    type="text"
    :class="{ 'mb-s': value, mb: !value }"
    @change="control($event.target)"
  />
</template>

<script>
import { numberFormat, reversenumberFormat } from '../../utils'
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
      const regex = /(^|[^\d.])0+\B/g
      this.$emit(
        'input',
        parseFloat(reversenumberFormat(target.value).replace(regex, '$1'))
      )
    }
  }
}
</script>
