<template>
  <div
    v-if="!editable"
    class="border p-s pointer text-right"
    @click="editableMake"
  >
    {{ value }}
  </div>
  <div v-else>
    <input
      ref="input"
      v-model.number="valueUpdated"
      type="number"
      class="p-s mb-s text-right"
      min="1"
      @focus="editableMake"
    />

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
import Vue from 'vue'
export default {
  props: {
    value: { type: Number, default: 0 }
  },

  data() {
    return {
      valueUpdated: 0,
      editable: false
    }
  },

  watch: {
    value() {
      this.valueUpdated = this.value
    }
  },

  created() {
    this.valueUpdated = this.value
  },

  methods: {
    validate() {
      if (this.valueUpdated > 0) {
        this.editable = false
        this.$emit('update', this.valueUpdated)
      }
    },

    editableMake() {
      if (!this.editable) {
        this.valueUpdated = this.value
        this.editable = !this.editable

        Vue.nextTick(() => {
          this.$refs.input.focus()
        })
      }
    }
  }
}
</script>
