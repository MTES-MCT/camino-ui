<template>
  <div
    v-if="!editable"
    class="border p-s pointer content-editable"
    @click="editableMake"
  >
    {{ value }}
  </div>
  <div v-else>
    <select v-model="valueUpdated" class="py-xs px-s mb-s">
      <option v-for="element in elements" :key="element" :value="element">
        {{ element }}
      </option>
    </select>
    <div class="flex">
      <button
        class="btn-border px-s py-xs flex-right rnd-xs mr-s h5"
        @click="editable = false"
      >
        Annuler
      </button>
      <button class="btn-flash px-s py-xs rnd-xs h5" @click="validate">
        Valider
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, required: true },
    elements: { type: Array, required: true }
  },

  data() {
    return {
      editable: false,
      valueUpdated: ''
    }
  },

  created() {
    this.valueUpdated = this.value
  },

  methods: {
    validate() {
      this.$emit('update', this.valueUpdated)
      this.editable = false
    },

    editableMake() {
      if (!this.editable) {
        this.valueUpdated = this.value
        this.editable = !this.editable
      }
    }
  }
}
</script>
