<template>
  <Popup :messages="messages">
    <template #header>
      <div class="flex">
        <h2>Document</h2>
        <div
          v-if="numPages > 1"
          class="flex ml-auto mb-m pdf-visualizer-pagination"
        >
          <button
            class="btn-border p-s rnd-l-xs"
            :disabled="currentPageNum <= 1"
            @click="previousPage"
          >
            Page précédente
          </button>
          <button
            class="btn-border p-s rnd-r-xs"
            :disabled="currentPageNum === numPages"
            @click="nextPage"
          >
            Page suivante
          </button>
        </div>
      </div>
    </template>

    <div ref="container" class="pdf-visualizer-container">
      <canvas ref="canvas" width="1000" height="1000" class="pdf-visualizer" />
    </div>

    <template #footer>
      <div v-if="!loading" class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button class="btn-border rnd-xs p-s full-x" @click="cancel">
            Fermer
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button ref="save-button" class="btn btn-primary" @click="download">
            Télécharger
          </button>
        </div>
      </div>
      <div v-else class="p-s full-x bold">Enregistrement en cours…</div>
    </template>
  </Popup>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Popup from '@/components/_ui/popup.vue'
import * as pdfjs from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import {
  PDFDocumentProxy,
  PDFPageProxy
} from 'pdfjs-dist/types/src/display/api'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

interface IDocument {
  id: string
  type: {
    id: string
    nom: string
    optionnel: boolean | null
    description: string | null
  }
  date: string | null
  description: string | null
  fichier: boolean | null
  fichierNouveau: {
    filename: string
    mimetype: string
    encoding: string
  } | null
  fichierTypeId: string | null
  titreEtapeId: string | null
  url: string | null
  uri: string | null
  jorf: string | null
  nor: string | null
  publicLecture: boolean | null
  entrepriseLecture: boolean | null
  modification: boolean | null
  suppression: boolean | null
}

export default defineComponent({
  name: 'CaminoDocumentPreviewPopup',

  components: {
    Popup
  },

  props: {
    document: {
      type: Object as PropType<IDocument>,
      required: true
    }
  },

  data() {
    return {
      fileReader: null as FileReader | null,
      pdf: null as PDFDocumentProxy | null,
      page: null as PDFPageProxy | null,
      currentPageNum: 0,
      numPages: 0,
      scale: 1
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

  async mounted() {
    try {
      const blob: Blob = await this.$store.dispatch(
        'visualizeDocument',
        this.document
      )
      this.fileReader = new FileReader()
      this.fileReader.addEventListener('load', this.onReaderDone)
      this.fileReader.addEventListener('error', this.onReaderError)
      this.fileReader.readAsDataURL(blob)

      document.addEventListener('keyup', this.keyUp)
    } catch (e) {
      this.$store.commit('popupMessageAdd', {
        value: "Erreur : le fichier n'a pas pu être téléchargé pour être lu.",
        type: 'error'
      })
    }
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyUp)
    this.fileReader?.removeEventListener('load', this.onReaderDone)
    this.fileReader?.removeEventListener('error', this.onReaderError)
  },

  methods: {
    async download() {
      await this.$store.dispatch('downloadDocument', this.document)
    },

    cancel() {
      this.$store.commit('popupMessagesRemove')
      this.$store.commit('popupClose')
    },

    convertBase64ToUint8Array(data: string) {
      const raw = atob(data)
      const uint8Array = new Uint8Array(raw.length)
      for (let i = 0; i < raw.length; i++) {
        uint8Array[i] = raw.charCodeAt(i)
      }
      return uint8Array
    },

    async onReaderDone() {
      const base64data = this.fileReader!.result?.toString().replace(
        'data:application/octet-stream;base64,',
        ''
      )
      const pdfData = this.convertBase64ToUint8Array(base64data!)
      this.pdf = await pdfjs.getDocument(pdfData).promise

      this.numPages = this.pdf!.numPages
      this.renderPage(1)
    },

    async renderPage(pageNum: number) {
      this.currentPageNum = pageNum
      this.page = await this.pdf!.getPage(pageNum)

      const canvas = this.$refs.canvas as HTMLCanvasElement
      const scale = canvas.width / this.page.view[2]
      const viewport = this.page.getViewport({ scale })
      canvas.height = this.page.view[3] * scale

      const ctx = canvas.getContext('2d')

      this.page.render({
        canvasContext: ctx!,
        viewport
      })
    },

    onReaderError() {
      this.$store.commit('popupMessageAdd', {
        value: "Une erreur s'est produite lors de la lecture du fichier",
        type: 'error'
      })
    },

    previousPage() {
      if (!this.pdf || this.currentPageNum === 1) return
      this.renderPage(this.currentPageNum - 1)
    },

    nextPage() {
      if (!this.pdf || this.currentPageNum === this.numPages) return
      this.renderPage(this.currentPageNum + 1)
    },

    keyUp(e: KeyboardEvent) {
      const key = e.key
      if (key === 'ArrowLeft') this.previousPage()
      if (key === 'ArrowRight') this.nextPage()
    }
  }
})
</script>
