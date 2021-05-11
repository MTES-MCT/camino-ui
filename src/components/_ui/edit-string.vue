<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-if="!editable"
    class="border p-s pointer content-editable"
    @click="editableMake"
    v-html="valueHtml"
  />
  <div v-else>
    <textarea
      ref="textarea"
      v-model="valueUpdated"
      class="p-s mb-s"
      @input="resize"
      @focus="resize"
    />
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
import { nextTick } from 'vue'
import snarkdown from 'snarkdown'

export default {
  props: {
    value: { type: String, required: true }
  },

  emits: ['update'],

  data() {
    return {
      editable: false,
      valueUpdated: ''
    }
  },

  computed: {
    valueHtml() {
      return snarkdown(this.valueUpdated.replace(/\[/g, '').replace(/\]/g, ''))
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

        nextTick(() => {
          this.$refs.textarea.focus()
        })
      }
    },

    resize(e) {
      e.target.style.height = ''
      e.target.style.height = e.target.scrollHeight + 'px'
    }
  }
}
</script>
