<template>
  <div
    v-if="!editable"
    class="border p-s pointer content-editable"
    @click="editableMake"
  >
    {{ order }}
  </div>
  <div v-else>
    <input
      ref="input"
      v-model.number="orderUpdated"
      type="number"
      class="p-s mb-s"
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
    order: { type: Number, required: true }
  },

  data() {
    return {
      editable: false,
      orderUpdated: ''
    }
  },

  created() {
    this.orderUpdated = this.order
  },

  methods: {
    validate() {
      this.$emit('update', this.orderUpdated)
      this.editable = false
    },

    editableMake() {
      if (!this.editable) {
        this.orderUpdated = this.order
        this.editable = !this.editable

        Vue.nextTick(() => {
          this.$refs.input.focus()
        })
      }
    }
  }
}
</script>
