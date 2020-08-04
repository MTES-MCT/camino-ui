<template>
  <Popup :messages="messages">
    <template slot="header">
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
        <select
          v-model="document.typeId"
          class="p-s"
        >
          <option
            v-for="documentType in documentsTypes"
            :key="documentType.id"
            :value="documentType.id"
            :disabled="document.typeId === documentType.id"
          >
            {{ documentType.nom }}
          </option>
        </select>
      </div>
    </div>

    <hr>

    <EditSections
      :document.sync="document"
      :repertoire="repertoire"
    />

    <template slot="footer">
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
            class="btn-flash rnd-xs p-s full-x"
            :disabled="!document.typeId || !document.date"
            @click="save"
          >
            Enregistrer
          </button>

          <div
            v-else
            class="p-s full-x bold"
          >
            Enregistrement en cours…
          </div>
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
    }
  },

  async created() {
    document.addEventListener('keyup', this.keyUp)
    await this.get()
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyUp)
  },

  methods: {
    async get() {
      const options = { repertoire: this.repertoire }
      if (this.parentTypeId) {
        options.typeId = this.parentTypeId
      }
      await this.$store.dispatch('document/metasGet', options)
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
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyUp(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.save()
      }
    },

    errorsRemove() {}
  }
}
</script>
