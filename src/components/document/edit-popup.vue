<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h5>
          <span class="cap-first">
            {{ title }}
          </span>
        </h5>
        <h2 class="cap-first mb-0">
          {{ creation ? "Ajout d'un" : 'Modification du' }} document
        </h2>
      </div>
    </template>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Type</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <select v-if="!document.id" v-model="document.typeId" class="p-s">
          <option
            v-for="dt in documentsTypes"
            :key="dt.id"
            :value="dt.id"
            :disabled="document.typeId === dt.id"
          >
            {{ dt.nom }}
          </option>
        </select>
        <div v-else-if="documentType" class="p-s">
          {{ documentType.nom }}
        </div>
      </div>
    </div>

    <hr />

    <EditSections
      v-model:document="document"
      :repertoire="repertoire"
      :optionnel="documentType ? documentType.optionnel : false"
    />

    <template #footer>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button
            v-if="!loading"
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            v-if="!loading"
            ref="save-button"
            class="btn-flash rnd-xs p-s full-x"
            :disabled="!document.typeId || !document.date"
            @click="save"
          >
            Enregistrer
          </button>

          <div v-else class="p-s full-x bold">Enregistrement en cours…</div>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'
import EditSections from './edit-sections.vue'

export default {
  name: 'CaminoDocumentEditPopup',

  components: {
    Popup,
    EditSections
  },

  props: {
    title: { type: String, required: true },
    context: { type: Object, required: true },
    creation: { type: Boolean, default: false },
    document: { type: Object, required: true },
    repertoire: { type: String, required: true },
    parentTypeId: { type: String, default: '' }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    documentsTypes() {
      return this.$store.state.document.metas.documentsTypes
    },

    documentType() {
      return (
        this.documentsTypes &&
        this.documentsTypes.find(d => d.id === this.document.typeId)
      )
    }
  },

  async created() {
    document.addEventListener('keyup', this.keyUp)
    await this.get()
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyUp)
  },

  methods: {
    async get() {
      const options = { repertoire: this.repertoire }
      if (this.parentTypeId) {
        options.typeId = this.parentTypeId
      }
      await this.$store.dispatch('document/init', options)
    },

    async save() {
      if (this.creation) {
        await this.$store.dispatch('document/add', {
          document: this.document,
          context: this.context
        })
      } else {
        await this.$store.dispatch('document/update', {
          document: this.document,
          context: this.context
        })
      }

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-etape-doc-enregistrer',
        nom: this.document.titreEtapeId
      })
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyUp(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.$refs['save-button'].focus()
        this.save()
      }
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    },

    errorsRemove() {}
  }
}
</script>
