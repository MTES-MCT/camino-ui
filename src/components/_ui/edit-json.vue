<template>
  <div
    v-if="!editable"
    class="border p-l pointer content-editable"
    @click="editableMake"
  >
    {{ value }}
  </div>
  <div v-else>
    <textarea
      ref="textarea"
      v-model="valueString"
      class="p-s mb-s"
      @input="resize"
      @focus="resize"
    />
    <div class="flex mb-s">
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
    <p v-if="error" class="p-s bg-error color-bg h6">{{ error }}</p>
  </div>
</template>

<script>
import { nextTick } from 'vue'

export default {
  props: {
    value: { type: [Object, null], default: null }
  },

  emits: ['update'],

  data() {
    return {
      editable: false,
      valueString: '',
      error: ''
    }
  },

  methods: {
    async validate() {
      try {
        this.error = ''
        const value = JSON.parse(this.valueString)

        this.$emit('update', value)
        this.editable = false
      } catch (e) {
        this.error = `Erreur de formatage: ${e}`
      }
    },

    editableMake() {
      this.error = ''

      if (!this.editable) {
        this.valueString = JSON.stringify(this.value, null, 2)
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
