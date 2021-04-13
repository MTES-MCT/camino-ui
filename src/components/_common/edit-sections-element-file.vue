<template>
  <div v-if="contenuElement" class="flex">
    <p class="mb-0">
      {{
        contenuElement && contenuElement.name
          ? contenuElement.name
          : contenuElement
      }}
    </p>
    <div class="flex-right">
      <button
        class="btn-border py-s px-m my--xs rnd-xs flex-right"
        @click="fileRemove"
      >
        <i class="icon-24 icon-trash" />
      </button>
    </div>
  </div>
  <div v-else>
    <label for="file" class="btn-border small p-s full-x rnd-xs mb-s"
      >Choisir un fichier…</label
    >
    <input
      id="file"
      type="file"
      class="p-xs mb-0"
      accept="application/pdf"
      @change="fileChange"
    />
    <p class="h5">30 Mo max.</p>
  </div>
</template>

<script>
export default {
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
