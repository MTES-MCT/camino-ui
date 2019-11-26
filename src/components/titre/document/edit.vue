<template>
  <Popup :messages="messages">
    <template slot="header">
      <div>
        <h5>
          <span class="cap-first">
            {{ titreNom }}
          </span><span class="color-neutral">
            |
          </span><span class="cap-first">
            {{ demarcheTypeNom }}
          </span><span class="color-neutral">
            |
          </span><span class="cap-first">
            {{ etapeTypeNom }}
          </span>
        </h5>
        <h2 class="cap-first mb-0">
          {{ creation ? 'Ajout d\'un' : "Modification du" }} document
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

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Nom</h6>
        <p class="h6 italic mb-0">
          Optionel
        </p>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="document.nom"
          type="text"
          class="p-s"
        >
      </div>
    </div>
    <hr>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Fichier</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <div
          v-if="document.fichier || document.fichierNouveau"
          class="flex"
        >
          <span class="h5">{{ document.fichierNouveau && document.fichierNouveau.name || `${document.id}.${document.fichierTypeId}` }}</span>
          <button
            v-if="permissionsCheck(['super'])"
            class="btn-border py-s px-m my--xs rnd-xs flex-right"
            @click="fileRemove"
          >
            <i class="icon-24 icon-trash" />
          </button>
        </div>
        <div
          v-else
        >
          <label
            for="file"
            class="btn-border p-s full-x rnd-xs mb-0"
          >Choisir un fichier…</label>
          <input
            id="file"
            type="file"
            class="p-xs mb-0"
            @change="fileChange"
          >
        </div>
      </div>
    </div>

    <hr>

    <div v-if="document.fichierNouveau">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Type de fichier</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <select
            v-model="document.fichierTypeId"
            class="p-s"
          >
            <option
              v-for="fichierTypeId in fichierTypeIds"
              :key="fichierTypeId"
              :value="fichierTypeId"
              :disabled="document.fichierTypeId === fichierTypeId"
            >
              {{ fichierTypeId }}
            </option>
          </select>
        </div>
      </div>

      <hr>
    </div>

    <div v-if="document.typeId === 'dec' || document.typeId === 'arr'">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Jorf</h6>
          <p class="h6 italic mb-0">
            Optionel
          </p>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="document.jorf"
            type="text"
            class="p-s"
          >
        </div>
      </div>
      <hr>
    </div>

    <div v-if="document.typeId === 'dec' || document.typeId === 'arr'">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Nor</h6>
          <p class="h6 italic mb-0">
            Optionel
          </p>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="document.nor"
            type="text"
            class="p-s"
          >
        </div>
      </div>
      <hr>
    </div>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Url</h6>
        <p class="h6 italic mb-0">
          Optionel
        </p>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="document.url"
          type="url"
          class="p-s"
          placeholder="https://…"
        >
      </div>
    </div>
    <hr>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Url</h6>
        <p class="h6 italic mb-0">
          Optionel
        </p>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="document.uri"
          type="url"
          class="p-s"
          placeholder="https://…"
        >
      </div>
    </div>

    <hr>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <label for="document-public"><h6>Public</h6></label>
        <p class="h6 italic mb-0">
          Optionel
        </p>
      </div>
      <div class="mb tablet-blob-2-3 py-s">
        <input
          id="document-public"
          v-model="document.public"
          type="checkbox"
        >
      </div>
    </div>

    <hr>

    <Messages :messages="warnings" />

    <template slot="footer">
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
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
import Popup from '../../ui/popup.vue'
import Messages from '../../ui/messages.vue'

export default {
  name: 'CaminoEtapeEditPopup',

  components: {
    Popup,
    Messages
  },

  props: {
    demarcheTypeNom: { type: String, default: '' },
    titreNom: { type: String, default: '' },
    etapeTypeNom: { type: String, default: '' },
    creation: { type: Boolean, default: false },
    document: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      events: {
        saveKeyUp: true
      },
      fichierTypeIds: ['pdf'],
      warnings: []
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    documentsTypes() {
      return this.$store.state.metas.document.documentsTypes
    }
  },

  created() {
    this.get()
    document.addEventListener('keyup', this.keyUp)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyUp)
  },

  methods: {
    get() {
      this.$store.dispatch('metas/titreEtapeDocumentGet')
    },

    fileChange({
      target: {
        validity,
        files: [file]
      }
    }) {
      if (validity.valid && file.type === 'application/pdf') {
        this.warnings = []
        this.document.fichierNouveau = file
        this.document.fichierTypeId = 'pdf'
      } else {
        this.warnings = [
          { type: 'warning', value: 'seuls les fichiers pdf sont acceptés' }
        ]
      }
    },

    save() {
      if (this.creation) {
        this.$store.dispatch('titre/documentCreate', this.document)
      } else {
        this.$store.dispatch('titre/documentUpdate', this.document)
      }
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyUp(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13 && this.events.saveKeyUp) {
        this.save()
      }
    },

    fileRemove() {
      this.document.fichier = null
      this.document.fichierNouveau = null
      this.document.fichierTypeId = null
      this.warnings = []
    },

    errorsRemove() {}
  }
}
</script>
