<template>
  <input
    :value="value"
    type="text"
    :class="{ 'mb-s': value, mb: !value }"
    @change="control($event.target)"
  />
</template>

<script>
export default {
  props: {
    value: { type: Number, default: undefined }
  },

  methods: {
    control(target) {
      const regex = /(^|[^\d.])0+\B/g
      this.$emit(
        'input',
        parseFloat(target.value.replace(regex, '$1').replaceAll(/ /g, ''))
      )
    }
  }
}
</script>
