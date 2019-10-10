<template>
  <div class="mb">
    <h6>{{ filter.name }}</h6>

    <input
      :value="filter.values.join(' ')"
      type="text"
      :placeholder="filter.placeholder"
      class="p-s"
      @blur="inputChange($event)"
    >
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    inputChange(e) {
      const values = e.target.value
        ? e.target.value.match(/[\w/]+|"(?:\\"|[^"])+"/g)
        : []

      this.filter.values = values
    }
  }
}
</script>
