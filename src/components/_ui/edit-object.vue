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
      const object = (field, parent) => {
        const splits = field.split('.', 2)
        if (splits.length > 1) {
          return object(splits[1], parent[splits[0]])
        }

        return parent[field]
      }

      return this.fields.map(f => object(f, this.value)).join(' - ')
    }
  }
}
</script>
