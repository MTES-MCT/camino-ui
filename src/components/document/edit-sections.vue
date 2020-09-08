<template>
  <div>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Date</h6>
      </div>
      <div class="tablet-blob-2-3">
        <InputDate
          v-if="modifiable"
          v-model="document.date"
          class="mb"
        />
        <p
          v-else-if="document.date"
          class="pt-xs"
        >
          {{ document.date }}
        </p>
        <p
          v-else
          class="color-warning pt-xs"
        >
          À compléter pour valider
        </p>
      </div>
    </div>

    <hr>

    <div v-if="modifiable || document.description">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Description</h6>
          <p
            v-if="modifiable"
            class="h6 italic mb-0"
          >
            Optionnel
          </p>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-if="modifiable"
            v-model="document.description"
            type="text"
            class="p-s"
          >
          <p
            v-else-if="document.description"
            class="pt-xs mb-0"
          >
            {{ document.description }}
          </p>
        </div>
      </div>
      <hr>
    </div>

    <div v-if="documentsVisibilites.length > 1 && modifiable">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3">
          <h6>Visibilité</h6>
        </div>
        <div class="tablet-blob-2-3">
          <ul class="list-sans">
            <li
              v-for="visibilite in documentsVisibilites"
              :key="visibilite.id"
            >
              <label class="h5 bold">
                <input
                  :value="visibilite.id"
                  :checked="visibilite.id === visibiliteId"
                  type="radio"
                  class="mr-s"
                  @change="visibiliteUpdate(visibilite.id)"
                >
                {{ visibilite.nom }}
              </label>
            </li>
          </ul>
        </div>
      </div>
      <hr>
    </div>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Fichier</h6>
      </div>
      <div class="tablet-blob-2-3">
        <div
          v-if="document.fichier || document.fichierNouveau"
          class="flex"
        >
          <p class="mb-0">
            {{
              (document.fichierNouveau && document.fichierNouveau.name) ||
                `${document.id}.${document.fichierTypeId}`
            }}
          </p>
          <button
            v-if="modifiable"
            class="btn-border py-s px-m my--xs rnd-xs flex-right"
            @click="fileRemove"
          >
            <i class="icon-24 icon-trash" />
          </button>
        </div>
        <div v-else-if="modifiable">
          <label
            for="file"
            class="btn-border p-s full-x rnd-xs mt--xs"
          >Choisir un fichier…</label>
          <input
            id="file"
            type="file"
            class="p-xs mb-0"
            @change="fileChange"
          >
          <p class="h6 mb-s">
            15 Mo max.
          </p>
        </div>
        <p
          v-else
          class="color-warning pt-xs mb-0"
        >
          À compléter pour valider
        </p>
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
            v-if="modifiable"
            v-model="document.fichierTypeId"
            class="p-s"
          >
            <option
              v-for="fichierTypeId in fichiersTypesIds"
              :key="fichierTypeId"
              :value="fichierTypeId"
              :disabled="document.fichierTypeId === fichierTypeId"
            >
              {{ fichierTypeId }}
            </option>
          </select>
          <p
            v-else-if="document.fichierTypeId"
            class="pt-xs mb-0"
          >
            {{ document.fichierTypeId }}
          </p>
          <p
            v-else
            class="color-warning pt-xs mb-0"
          >
            À compléter pour valider
          </p>
        </div>
      </div>
      <hr>
    </div>

    <div
      v-if="
        (document.typeId === 'dec' || document.typeId === 'arr') && modifiable
      "
    >
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Jorf</h6>
          <p class="h6 italic mb-0">
            Optionnel
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

    <div
      v-if="
        (document.typeId === 'dec' || document.typeId === 'arr') && modifiable
      "
    >
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Nor</h6>
          <p class="h6 italic mb-0">
            Optionnel
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

    <div v-if="repertoire === 'demarches' && modifiable">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>URI</h6>
          <p class="h6 italic mb-0">
            Optionnel
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
    </div>

    <div v-if="repertoire === 'demarches' && modifiable">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>URL</h6>
          <p class="h6 italic mb-0">
            Optionnel
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
    </div>

    <Messages :messages="warnings" />
  </div>
</template>

<script>
import InputDate from '../_ui/input-date.vue'
import Messages from '../_ui/messages.vue'

export default {
  components: {
    Messages,
    InputDate
  },

  props: {
    document: { type: Object, required: true },
    modifiable: { type: Boolean, default: true },
    repertoire: { type: String, required: true }
  },

  data() {
    return {
      fichiersTypesIds: ['pdf'],
      warnings: []
    }
  },

  computed: {
    documentsVisibilites() {
      return this.$store.state.document.metas.documentsVisibilites
    },

    visibiliteId() {
      if (this.document.publicLecture) {
        return 'public'
      }

      if (this.document.entreprisesLecture) {
        return 'entreprise'
      }

      return 'admin'
    }
  },

  async created() {
    if (
      this.documentsVisibilites.length &&
      this.documentsVisibilites.length < 2
    ) {
      this.document.publicLecture = this.documentsVisibilites[0].id === 'public'
      this.document.entreprisesLecture =
        this.documentsVisibilites[0].id === 'entreprise'
    }
  },

  methods: {
    fileChange({
      target: {
        validity,
        files: [file]
      }
    }) {
      if (file && validity.valid && file.type === 'application/pdf') {
        this.warnings = []
        this.document.fichierNouveau = file
        this.document.fichierTypeId = 'pdf'
      } else {
        this.warnings = [
          { type: 'warning', value: 'seuls les fichiers pdf sont acceptés' }
        ]
      }
    },

    fileRemove() {
      this.document.fichier = null
      this.document.fichierNouveau = null
      this.document.fichierTypeId = null
      this.warnings = []
    },

    visibiliteUpdate(id) {
      this.document.publicLecture = id === 'public'
      this.document.entreprisesLecture = id === 'entreprise'
    }
  }
}
</script>
