<template>
  <Popup :messages="messages" class="full-y">
    <template #header>
      <div class="flex">
        <h2>Document</h2>
      </div>
    </template>

    <embed :src="`/apiUrl/fichiers/${document.id}`" class="full-y full-x" />

    <template #footer>
      <div v-if="!loading" class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button class="btn-border rnd-xs p-s full-x" @click="cancel">
            Fermer
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button class="btn btn-primary" @click="download">Télécharger</button>
        </div>
      </div>
      <div v-else class="p-s full-x bold">Téléchargement en cours…</div>
    </template>
  </Popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Popup from '@/components/_ui/popup.vue'

export default defineComponent({
  name: 'CaminoDocumentPreviewPopup',

  components: {
    Popup
  },

  props: {
    document: {
      type: Object,
      required: true
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    }
  },

  methods: {
    async download() {
      await this.$store.dispatch('downloadDocument', this.document)
    },

    cancel() {
      this.$store.commit('popupMessagesRemove')
      this.$store.commit('popupClose')
    }
  }
})
</script>
<style>
.popup-content {
  overflow-y: hidden;
}
</style>
