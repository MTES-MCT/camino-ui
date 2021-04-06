<template>
  <div
    v-if="!editable"
    class="border pointer text-right p-s"
    @click="editableMake"
  >
    {{ value }}
  </div>
  <div v-else>
    <InputDate v-model="valueUpdated" class="mb-s" />

    <div class="flex">
      <button
        class="btn-border small px-s py-xs flex-right rnd-xs mr-s"
        @click="editable = false"
      >
        Annuler
      </button>
      <button class="btn-flash small px-s py-xs rnd-xs" @click="validate">
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

  emits: ['update'],

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
