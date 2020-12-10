<template>
  <div
    v-if="!editable"
    class="border pointer content-editable text-right p-s"
    @click="editableMake"
  >
    {{ value }}
  </div>
  <div v-else>
    <InputDate v-model="valueUpdated" class="mb-s" />

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
import InputDate from './input-date.vue'

export default {
  components: { InputDate },
  props: {
    value: { type: String, required: true }
  },

  data() {
    return {
      valueUpdated: '',
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
      this.editable = false
      this.$emit('update', this.valueUpdated)
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
