<template>
  {{ label }}
</template>

<script>
export default {
  props: {
    value: { type: [Object, null], default: null },
    fields: { type: Array, default: () => [] }
  },
  computed: {
    label() {
      return this.fields.map(f => this.value[f]).join(' - ')
    }
  }
}
</script>
