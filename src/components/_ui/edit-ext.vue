<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-if="!editable"
    class="border p-s pointer content-editable"
    @click="editableMake"
    v-html="textHtml"
  />
  <div v-else>
    <textarea
      ref="textarea"
      v-model="textUpdated"
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
    text: { type: String, required: true }
  },

  data() {
    return {
      editable: false,
      textUpdated: ''
    }
  },

  computed: {
    textHtml() {
      return marked(this.textUpdated)
    }
  },

  created() {
    this.textUpdated = this.text
  },

  methods: {
    validate() {
      this.$emit('update', this.textUpdated)
      this.editable = false
    },

    editableMake() {
      if (!this.editable) {
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
