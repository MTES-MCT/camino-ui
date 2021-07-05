<template>
  <div class="mb">
    <Accordion
      v-if="stepType"
      id="step-type"
      :step="stepType"
      :opened="opened['type']"
      :complete="typeComplete"
      :en-construction="enConstruction"
      @toggle="toggle('type')"
    >
      <TypeEdit
        v-model:etape="etape"
        :user-is-admin="userIsAdmin"
        :etapes-types="etapesTypes"
        :etape-type="etapeType"
        :etape-is-demande-en-construction="etapeIsDemandeEnConstruction"
        @type-update="typeUpdate"
        @complete-update="typeCompleteUpdate"
      />
    </Accordion>

    <Accordion
      v-if="stepFondamentales"
      id="step-fondamentales"
      :step="stepFondamentales"
      :opened="opened['fondamentales']"
      :complete="true"
      :en-construction="enConstruction"
      @toggle="toggle('fondamentales')"
    >
      <FondamentalesEdit
        v-model:etape="etape"
        :domaine-id="domaineId"
        :titre-type-id="titreTypeId"
        :user-is-admin="userIsAdmin"
      />
    </Accordion>

    <Accordion
      v-if="stepPoints"
      id="step-points"
      :step="stepPoints"
      :opened="opened['points']"
      :complete="true"
      :en-construction="enConstruction"
      @toggle="toggle('points')"
    >
      <PointsEdit
        v-model:etape="etape"
        v-model:events="events"
        :show-title="false"
      />
    </Accordion>

    <Accordion
      v-if="stepSections"
      id="step-sections"
      :step="stepSections"
      :opened="opened['sections']"
      :complete="stepSectionsComplete"
      :en-construction="enConstruction"
      @toggle="toggle('sections')"
    >
      <SectionsEdit
        v-model:etape="etape"
        :sections="etape.sections"
        @complete-update="sectionsCompleteUpdate"
      />
    </Accordion>

    <Accordion
      v-if="stepDocuments"
      id="step-documents"
      :step="stepDocuments"
      :opened="opened['documents']"
      :complete="stepDocumentsComplete"
      :en-construction="enConstruction"
      @toggle="toggle('documents')"
    >
      <DocumentsEdit
        v-model:documents="etape.documents"
        :add-action="{ name: 'titreEtapeEdition/documentAdd' }"
        :remove-action="{ name: 'titreEtapeEdition/documentRemove' }"
        repertoire="demarches"
        :document-popup-title="documentPopupTitle"
        :parent-type-id="etapeType.id"
        :documents-types="etapeType.documentsTypes"
        @complete-update="documentsCompleteUpdate"
      />
    </Accordion>

    <Accordion
      v-if="stepJustificatifs"
      id="step-justificatifs"
      :step="stepJustificatifs"
      :opened="opened['justificatifs']"
      :complete="stepJustificatifsComplete"
      :en-construction="enConstruction"
      @toggle="toggle('justificatifs')"
    >
      <JustificatifsEdit
        v-model:justificatifs="etape.justificatifs"
        :justificatifs-types="etapeType.justificatifsTypes"
        :entreprises="entreprises"
        @complete-update="justificatifsCompleteUpdate"
      />
    </Accordion>
  </div>
</template>

<script>
import Accordion from './accordion.vue'
import TypeEdit from './type-edit.vue'
import FondamentalesEdit from './fondamentales-edit.vue'
import PointsEdit from './points-edit.vue'
import SectionsEdit from './sections-edit.vue'
import DocumentsEdit from '../document/multi-edit.vue'
import JustificatifsEdit from './justificatifs-edit.vue'

export default {
  components: {
    Accordion,
    TypeEdit,
    FondamentalesEdit,
    PointsEdit,
    SectionsEdit,
    DocumentsEdit,
    JustificatifsEdit
  },

  props: {
    etape: { type: Object, required: true },
    etapeType: { type: Object, default: null },
    domaineId: { type: String, required: true },
    titreTypeId: { type: String, required: true },
    events: { type: Object, required: true },
    user: { type: Object, required: true },
    etapeIsDemandeEnConstruction: { type: Boolean, required: true },
    documentPopupTitle: { type: String, required: true }
  },

  emits: ['complete-update', 'type-complete-update'],

  data() {
    return {
      sectionsComplete: false,
      documentsComplete: false,
      justificatifsComplete: false,
      typeComplete: false,
      justificatifs: false,
      opened: {
        type: true,
        fondamentales: false,
        points: false,
        sections: false,
        documents: false,
        justificatifs: false
      }
    }
  },

  computed: {
    etapesTypes() {
      return this.$store.state.titreEtapeEdition.metas.etapesTypes.filter(
        t => t.etapesCreation
      )
    },

    entreprises() {
      const titulaireIds = this.etape.titulaires.map(({ id }) => id)
      const amodiatairesIds = this.etape.amodiataires.map(({ id }) => id)

      return this.$store.state.titreEtapeEdition.metas.entreprises.filter(
        ({ id }) => titulaireIds.includes(id) || amodiatairesIds.includes(id)
      )
    },

    heritageLoaded() {
      return this.$store.state.titreEtapeEdition.heritageLoaded
    },

    enConstruction() {
      return this.etape.statutId === 'aco'
    },

    complete() {
      return (
        this.typeComplete &&
        this.stepSectionsComplete &&
        this.stepDocumentsComplete &&
        this.stepJustificatifsComplete
      )
    },

    stepSectionsComplete() {
      return !this.etape.sections?.length || this.sectionsComplete
    },

    stepDocumentsComplete() {
      return !this.etapeType?.documentsTypes?.length || this.documentsComplete
    },

    stepJustificatifsComplete() {
      return (
        !this.etapeType?.justificatifsTypes?.length ||
        this.justificatifsComplete
      )
    },

    steps() {
      const steps = []

      if (this.userIsAdmin) {
        steps.push({ id: 'type', name: 'Type' })
      }

      if (this.heritageLoaded && this.etapeType?.fondamentale) {
        if (steps.length > 0) {
          steps[steps.length - 1].hasNextButton = true
        }
        steps.push({
          id: 'fondamentales',
          name: 'Propriétés',
          hasNextButton: true
        })
        steps.push({ id: 'points', name: 'Périmètre' })
      }

      if (this.heritageLoaded && this.etape.sections?.length) {
        if (steps.length > 0) {
          steps[steps.length - 1].hasNextButton = true
        }
        steps.push({ id: 'sections', name: 'Propriétés spécifiques' })
      }

      if (this.heritageLoaded && this.etapeType?.documentsTypes?.length) {
        if (steps.length > 0) {
          steps[steps.length - 1].hasNextButton = true
        }
        steps.push({ id: 'documents', name: 'Documents' })
      }

      if (this.heritageLoaded && this.etapeType?.justificatifsTypes?.length) {
        if (steps.length > 0) {
          steps[steps.length - 1].hasNextButton = true
        }
        steps.push({ id: 'justificatifs', name: 'Justificatifs' })
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
    },

    stepJustificatifs() {
      return this.steps.find(s => s.id === 'justificatifs')
    },

    userIsAdmin() {
      return this.$store.getters['user/userIsAdmin']
    }
  },

  watch: {
    complete: 'completeUpdate'
  },

  created() {
    this.typeCompleteUpdate()
    this.completeUpdate()
  },

  methods: {
    documentsCompleteUpdate(complete) {
      this.documentsComplete = complete
    },

    justificatifsCompleteUpdate(complete) {
      this.justificatifsComplete = complete
    },

    sectionsCompleteUpdate(complete) {
      this.sectionsComplete = complete
    },

    typeCompleteUpdate(complete) {
      this.typeComplete = complete || !this.stepType
      this.$emit('type-complete-update', this.typeComplete)
    },

    async typeUpdate(typeId) {
      await this.$store.dispatch('titreEtapeEdition/heritageGet', { typeId })
    },

    completeUpdate() {
      this.$emit('complete-update', this.complete)
    },

    toggle(stepId) {
      this.opened[stepId] = !this.opened[stepId]

      if (this.opened[stepId]) {
        this.scrollToStep(stepId)
      }
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
