<template>
  <Loader v-if="!etape" />
  <div v-else>
    <h6>
      <span class="cap-first"> {{ titreNom }} </span>
      <span class="color-neutral"> | </span>
      <span class="cap-first">
        {{ demarcheType.nom }}
      </span>
    </h6>
    <h2>Modification de l'étape</h2>

    <EtapeEditAccordion
      id="step-type"
      :step="stepType"
      :opened="opened['type']"
      :complete="stepTypeComplete"
      @toggle="toggle('type')"
      @next="next('type')"
    >
      <EtapeEditType
        v-model:etape="etape"
        :etape-types="etapeTypes"
        :etape-type="etapeType"
        @type-update="typeUpdate"
      />
    </EtapeEditAccordion>

    <EtapeEditAccordion
      v-if="stepFondamentales"
      id="step-fondamentales"
      :step="stepFondamentales"
      :opened="opened['fondamentales']"
      :complete="true"
      @toggle="toggle('fondamentales')"
      @next="next('fondamentales')"
    >
      <EtapeEditFondamentales v-model:etape="etape" :domaine-id="domaineId" />
    </EtapeEditAccordion>

    <EtapeEditAccordion
      v-if="stepPoints"
      id="step-points"
      :step="stepPoints"
      :opened="opened['points']"
      :complete="true"
      @toggle="toggle('points')"
      @next="next('points')"
    >
      <EtapeEditPoints v-model:etape="etape" v-model:events="events" />
    </EtapeEditAccordion>

    <EtapeEditAccordion
      v-if="stepSections"
      id="step-sections"
      :step="stepSections"
      :opened="opened['sections']"
      :complete="stepSectionsComplete"
      @toggle="toggle('sections')"
      @next="next('sections')"
    >
      <EditSections
        v-model:etape="etape"
        :sections="etape.sections"
        @complete-update="sectionsCompleteUpdate"
      />
    </EtapeEditAccordion>

    <EtapeEditAccordion
      v-if="stepDocuments"
      id="step-documents"
      :step="stepDocuments"
      :opened="opened['documents']"
      :complete="stepDocumentsComplete"
      @toggle="toggle('documents')"
      @next="next('documents')"
    >
      <DocumentsEdit
        v-model:documents="etape.documents"
        :parent-id="etape.id"
        :documents-types="etapeType.documentsTypes"
        repertoire="demarches"
        @complete-update="documentsCompleteUpdate"
      />
    </EtapeEditAccordion>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 mb tablet-mb-0"></div>
      <div class="tablet-blob-2-3">
        <button
          v-if="!loading"
          ref="save-button"
          class="btn-flash rnd-xs p-s full-x mb"
          :disabled="!complete"
          :class="{ disabled: !complete }"
          @click="save"
        >
          Enregistrer
        </button>
        <div v-else class="p-s bold">Enregistrement en cours…</div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'
import EtapeEditType from './etape/edit-type.vue'
import EtapeEditAccordion from './etape/edit-accordion.vue'
import EtapeEditFondamentales from './etape/edit-fondamentales.vue'
import EtapeEditPoints from './etape/edit-points.vue'
import EditSections from './etape/edit-sections.vue'
import DocumentsEdit from './document/edit-multi.vue'

export default {
  components: {
    Loader,
    EtapeEditType,
    EtapeEditFondamentales,
    EtapeEditPoints,
    EditSections,
    DocumentsEdit,
    EtapeEditAccordion
  },

  emits: ['type-update'],

  data() {
    return {
      events: { saveKeyUp: true },
      documentsComplete: false,
      sectionsComplete: false,
      opened: {
        type: true,
        fondamentales: false,
        points: false,
        sections: false,
        documents: false
      }
    }
  },

  computed: {
    etape() {
      return this.$store.state.titreEtape.element
    },

    heritageLoaded() {
      return this.$store.state.titreEtape.heritageLoaded
    },

    demarcheType() {
      return this.etape.demarche.type
    },

    titreNom() {
      return this.etape.demarche.titre.nom
    },

    domaineId() {
      return this.etape.demarche.titre.domaine.id
    },

    etapeTypes() {
      return this.$store.state.titreEtape.metas.etapesTypes.filter(
        t => t.etapesCreation
      )
    },

    etapeType() {
      return this.etapeTypes.find(et => et.id === this.etape.typeId)
    },

    complete() {
      return (
        this.stepTypeComplete &&
        this.stepSectionsComplete &&
        this.stepDocumentsComplete
      )
    },

    loading() {
      return this.$store.state.loading.includes('titreEtapeUpdate')
    },

    stepTypeComplete() {
      return !!(this.etape && this.etape.date && this.etape.typeId)
    },

    stepSectionsComplete() {
      return (
        this.etape.statutId === 'aco' ||
        !this.etape.sections?.length ||
        this.sectionsComplete
      )
    },

    stepDocumentsComplete() {
      return (
        this.etape.statutId === 'aco' ||
        !this.etapeType.documentsTypes?.length ||
        this.documentsComplete
      )
    },

    steps() {
      const steps = [{ id: 'type', name: "Type de l'étape" }]

      if (this.heritageLoaded && this.etapeType?.fondamentale) {
        steps[steps.length - 1].hasNextButton = true
        steps.push({
          id: 'fondamentales',
          name: 'Propriétés fondamentales',
          hasNextButton: true
        })
        steps.push({ id: 'points', name: 'Périmètre' })
      }

      if (this.heritageLoaded && this.etape.sections?.length) {
        steps[steps.length - 1].hasNextButton = true
        steps.push({ id: 'sections', name: 'Propriétés spécifiques' })
      }

      if (this.heritageLoaded && this.etapeType?.documentsTypes?.length) {
        steps[steps.length - 1].hasNextButton = true
        steps.push({ id: 'documents', name: 'Documents' })
      }

      return steps
    },

    stepType() {
      return this.steps.find(s => s.id === 'type')
    },

    stepFondamentales() {
      return this.steps.find(s => s.id === 'fondamentales')
    },

    stepPoints() {
      return this.steps.find(s => s.id === 'points')
    },

    stepSections() {
      return this.steps.find(s => s.id === 'sections')
    },

    stepDocuments() {
      return this.steps.find(s => s.id === 'documents')
    }
  },

  async created() {
    document.addEventListener('keyup', this.keyUp)

    await this.init()
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyUp)
  },

  unmounted() {
    this.$store.commit('titreEtape/reset')
  },

  methods: {
    async init() {
      await this.$store.dispatch('titreEtape/init', {
        id: this.$route.params.id
      })
    },

    async save() {
      if (this.complete) {
        await this.$store.dispatch('titreEtape/upsert', {
          etape: this.etape,
          redirect: true
        })

        this.eventTrack({
          categorie: 'titre-etape',
          action: 'titre-etape-enregistrer',
          nom: this.etape.id
        })
      }
    },

    keyUp(e) {
      if (
        (e.which || e.keyCode) === 13 &&
        this.events.saveKeyUp &&
        this.complete
      ) {
        this.$refs['save-button'].focus()
        this.save()
      }
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    },

    documentsCompleteUpdate(complete) {
      this.documentsComplete = complete
    },

    sectionsCompleteUpdate(complete) {
      this.sectionsComplete = complete
    },

    typeUpdate(typeId) {
      this.$store.dispatch('titreEtape/heritageGet', {
        typeId
      })
    },

    toggle(stepId) {
      this.opened[stepId] = !this.opened[stepId]

      this.scrollToStep(stepId)
    },

    next(stepId) {
      const index = this.steps.findIndex(s => s.id === stepId)
      const stepNext = this.steps[index + 1]

      if (stepNext) {
        this.steps.forEach(({ id }) => {
          if (stepNext.id === id) {
            this.opened[id] = true
          } else {
            this.opened[id] = false
          }
        })
      }

      this.scrollToStep(stepId)
    },

    scrollToStep(stepId) {
      setTimeout(() => {
        document
          .getElementById(`step-${stepId}`)
          .scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }
  }
}
</script>
