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
import marked from 'marked'

export default {
  props: {
    value: { type: String, required: true }
  },

  data() {
    return {
      editable: false,
      valueUpdated: ''
    }
  },

  computed: {
    valueHtml() {
      return marked(this.valueUpdated)
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

        Vue.nextTick(() => {
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
