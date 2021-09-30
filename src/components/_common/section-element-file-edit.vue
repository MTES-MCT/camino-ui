<template>
  <div v-if="contenuElement" class="flex">
    <p class="mb-0 h6 bold">
      {{
        contenuElement && contenuElement.name
          ? contenuElement.name
          : contenuElement.slice(5)
      }}
    </p>
    <div class="flex-right mt--xs">
      <button
        class="btn-border py-s px-m my--xs rnd-xs flex-right"
        @click="fileRemove"
      >
        <i class="icon-24 icon-trash" />
      </button>
    </div>
  </div>
  <div v-else>
    <InputFile
      class="btn-border small p-s full-x rnd-xs mb-s"
      accept="application/pdf"
      @change="fileChange"
    />
    <p class="h5 italic">30 Mo max.</p>
  </div>
</template>

<script>
import InputFile from '../_ui/input-file.vue'

export default {
  components: { InputFile },

  props: {
    contenu: { type: [Object], required: true },
    elementId: { type: String, required: true }
  },

  computed: {
    contenuElement() {
      return this.contenu[this.elementId]
    }
  },

  methods: {
    fileChange({
      target: {
        validity,
        files: [file]
      }
    }) {
      if (file && validity.valid) {
        this.contenu[this.elementId] = file
      }
    },
    fileRemove() {
      this.contenu[this.elementId] = null
    }
  }
}
</script>
