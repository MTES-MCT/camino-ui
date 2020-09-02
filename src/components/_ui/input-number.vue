<template>
  <input
    :value="value"
    type="text"
    :min="min"
    :placeholder="placeholder"
    :class="{ 'mb-s': value, mb: !value }"
  >
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' },
    min: { type: String, default: '' },
    placeholder: { type: String, default: '' }
  },

  methods: {
    control(target) {
      const regex = /(^|[^\d.])0+\B/g

      target.value = parseFloat(
        target.value.replace(/,/g, '.').replace(/ */g, '').replace(regex, '$1')
      )
    }
  }
}
</script>
