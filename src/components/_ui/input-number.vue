<template>
  <input
    :value="value"
    type="number"
    :class="{ 'mb-s': value, mb: !value }"
    @change="control($event.target)"
  />
</template>

<script>
export default {
  props: {
    value: { type: Number, default: 0 }
  },

  methods: {
    control(target) {
      const regex = /(^|[^\d.])0+\B/g
      this.$emit(
        'input',
        parseFloat(target.value.toString().replace(regex, '$1'))
      )
    }
  }
}
</script>
