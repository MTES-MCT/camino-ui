<template>
  <div class="tablet-blobs">
    <div class="tablet-blob-1-3 tablet-pt-s pb-s">
      <h5>Type</h5>
    </div>
    <div class="mb tablet-blob-2-3">
      <select v-model="etape.typeId" class="p-s" @change="typeUpdate">
        <option
          v-for="eType in etapeTypes"
          :key="eType.id"
          :value="eType.id"
          :disabled="etape.typeId === eType.id"
        >
          {{ eType.nom }}
        </option>
      </select>
    </div>
  </div>

  <hr />

  <div v-if="etape.typeId && etapesStatuts">
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Statut</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <select v-model="etape.statutId" class="p-s">
          <option
            v-for="etapeStatut in etapesStatuts"
            :key="etapeStatut.id"
            :value="etapeStatut.id"
            :disabled="etape.statutId === etapeStatut.id"
          >
            {{ etapeStatut.nom }}
          </option>
        </select>
      </div>
    </div>
    <hr />
  </div>

  <div class="tablet-blobs">
    <div class="tablet-blob-1-3 tablet-pt-s pb-s">
      <h5>Date</h5>
    </div>
    <div class="tablet-blob-2-3">
      <InputDate
        v-model="etape.date"
        :class="{ 'mb-s': etape.date, mb: !etape.date }"
      />
    </div>
  </div>

  <hr />

  <div class="tablet-blobs">
    <div class="tablet-blob-1-3 tablet-pt-s pb-s">
      <h5 class="mb-0">Durée (années / mois)</h5>
      <p class="h6 italic mb-0">Optionnel</p>
    </div>
    <div class="tablet-blob-2-3">
      <div
        class="tablet-blobs"
        :class="{ 'mb-s': !etape.duree.ans && !etape.duree.mois }"
      >
        <div class="tablet-blob-1-2">
          <inputNumber
            v-model="etape.duree.ans"
            placeholder="années"
            class="p-s mb-s"
          />
        </div>
        <div class="tablet-blob-1-2">
          <inputNumber
            v-model="etape.duree.mois"
            placeholder="mois"
            class="p-s"
          />
        </div>
      </div>
    </div>
  </div>

  <hr />

  <div class="tablet-blobs">
    <div class="tablet-blob-1-3 tablet-pt-s pb-s">
      <h5 class="mb-0">Surface (Km²)</h5>
      <p class="h6 italic mb-0">Optionnel</p>
    </div>
    <div class="tablet-blob-2-3">
      <inputNumber
        v-model="etape.surface"
        class="p-s"
        placeholder="0"
        :class="{ 'mb-s': etape.surface, mb: !etape.surface }"
      />
    </div>
  </div>

  <SectionsEdit
    v-if="etapeType && etapeType.sections"
    v-model:element="etape"
    :sections="etapeType.sections"
  />
  <div
    v-if="etapeType && etapeType.documentsTypes && etape.documents"
    class="mt-s"
  >
    <DocumentsEdit
      v-model:documents="etape.documents"
      :add-action="{ name: 'titreTravauxEtapeEdition/documentAdd' }"
      :remove-action="{ name: 'titreTravauxEtapeEdition/documentRemove' }"
      repertoire="travaux"
      :document-popup-title="documentPopupTitle"
      :parent-type-id="etapeType.id"
      :documents-types="etapeType.documentsTypes"
      @complete-update="documentsCompleteUpdate"
    />
  </div>
</template>

<script>
import InputDate from '../_ui/input-date.vue'
import InputNumber from '../_ui/input-number.vue'
import SectionsEdit from './sections-edit.vue'
import DocumentsEdit from '../document/multi-edit.vue'

export default {
  components: {
    SectionsEdit,
    InputDate,
    InputNumber,
    DocumentsEdit
  },

  props: {
    etape: { type: Object, default: () => ({}) },
    documentPopupTitle: { type: String, required: true }
  },
  emits: ['complete-update'],

  data() {
    return {
      documentsComplete: false
    }
  },

  computed: {
    etapeTypes() {
      return this.$store.state.titreTravauxEtapeEdition.metas.travauxEtapesTypes.filter(
        t => t.etapesCreation
      )
    },

    etapeType() {
      return this.etapeTypes.find(et => et.id === this.etape.typeId)
    },

    etapesStatuts() {
      return this.etapeType && this.etapeType.etapesStatuts
    },

    complete() {
      return (
        this.etape.typeId &&
        this.etape.date &&
        this.etape.statutId &&
        (!this.etapeType.documentsTypes?.length || this.documentsComplete)
      )
    }
  },

  watch: {
    complete: 'completeUpdate'
  },

  created() {
    this.completeUpdate()
  },

  methods: {
    async typeUpdate() {
      if (this.etapesStatuts?.length === 1) {
        this.etape.statutId = this.etapesStatuts[0].id
      } else {
        this.etape.statutId = null
      }
      await this.$store.dispatch('titreTravauxEtapeEdition/documentInit')
    },

    documentsCompleteUpdate(documentsComplete) {
      this.documentsComplete = documentsComplete
    },

    completeUpdate() {
      this.$emit('complete-update', this.complete)
    }
  }
}
</script>
