<template>
  <input
    ref="input"
    v-model="valueUpdated"
    type="checkbox"
    class="p-s mb-s"
    @change="validate"
  />
</template>

<script>
export default {
  props: {
    value: { type: Boolean, required: true }
  },

  emits: ['update'],

  data() {
    return {
      valueUpdated: ''
    }
  },

  created() {
    this.valueUpdated = this.value
  },

  methods: {
    validate() {
      this.$emit('update', this.valueUpdated)
    }
  }
}
</script>
