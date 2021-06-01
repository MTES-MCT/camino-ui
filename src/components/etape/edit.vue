<template>
  <div class="mb">
    <Accordion
      id="step-type"
      :step="stepType"
      :opened="opened['type']"
      :modifiable="modifiable"
      :complete="typeComplete"
      :en-construction="enConstruction"
      @toggle="toggle('type')"
      @next="next('type')"
    >
      <template #write>
        <TypeEdit
          v-model:etape="etape"
          :user="user"
          :etape-types="etapeTypes"
          :etape-type="etapeType"
          :etape-is-demande="etapeIsDemande"
          @type-update="typeUpdate"
          @complete-update="typeCompleteUpdate"
        />
      </template>
      <template #read>
        <div v-if="etape.date" class="tablet-blobs">
          <div class="tablet-blob-1-4"><h5>Date</h5></div>
          <div class="tablet-blob-3-4">{{ etape.date }}</div>
        </div>

        <div class="tablet-blobs">
          <div class="tablet-blob-1-4"><h5>Type</h5></div>
          <div class="tablet-blob-3-4">
            <span class="cap-first">{{ etapeType.nom }}</span>
          </div>
        </div>

        <div v-if="!etapeIsDemande" class="tablet-blobs">
          <div class="tablet-blob-1-4"><h5>Statut</h5></div>
          <div class="tablet-blob-3-4">
            <Statut
              :color="etapeEditFormatted.statut.couleur"
              :nom="etapeEditFormatted.statut.nom"
              class="mb-xs"
            />
          </div>
        </div>
      </template>
    </Accordion>

    <Accordion
      v-if="stepFondamentales"
      id="step-fondamentales"
      :step="stepFondamentales"
      :opened="opened['fondamentales']"
      :modifiable="modifiable"
      :complete="true"
      :en-construction="enConstruction"
      @toggle="toggle('fondamentales')"
      @next="next('fondamentales')"
    >
      <template #write>
        <FondamentalesEdit v-model:etape="etape" :domaine-id="domaineId" />
      </template>
      <template #read>
        <Fondamentales :etape="etapeEditFormatted" />
      </template>
    </Accordion>

    <Accordion
      v-if="stepPoints"
      id="step-points"
      :step="stepPoints"
      :opened="opened['points']"
      :modifiable="modifiable"
      :complete="true"
      :en-construction="enConstruction"
      @toggle="toggle('points')"
      @next="next('points')"
    >
      <template #write>
        <PointsEdit
          v-model:etape="etape"
          v-model:events="events"
          :show-title="false"
        />
      </template>
      <template #read>
        <Points v-if="etapeEditFormatted.points" :etape="etapeEditFormatted" />
        <p v-else class="h5 italic">Non renseigné</p>
      </template>
    </Accordion>

    <Accordion
      v-if="stepSections"
      id="step-sections"
      :step="stepSections"
      :opened="opened['sections']"
      :modifiable="modifiable"
      :complete="stepSectionsComplete"
      :en-construction="enConstruction"
      @toggle="toggle('sections')"
      @next="next('sections')"
    >
      <template #write>
        <SectionsEdit
          v-model:etape="etape"
          :sections="etape.sections"
          @complete-update="sectionsCompleteUpdate"
        />
      </template>
      <template #read>
        <Section
          v-for="s in etapeEditFormatted.type.sections"
          :key="s.id"
          :section="s"
          :contenu="
            etapeEditFormatted.contenu ? etapeEditFormatted.contenu[s.id] : {}
          "
          :date="etapeEditFormatted.date"
          @file-download="fileDownload"
        />
      </template>
    </Accordion>

    <Accordion
      v-if="stepDocuments"
      id="step-documents"
      :step="stepDocuments"
      :opened="opened['documents']"
      :modifiable="modifiable"
      :complete="stepDocumentsComplete"
      :en-construction="enConstruction"
      @toggle="toggle('documents')"
      @next="next('documents')"
    >
      <template #write>
        <DocumentsEdit
          v-model:documents="etape.documents"
          :documents-types="etapeType.documentsTypes"
          repertoire="demarches"
          :show-title="false"
          @complete-update="documentsCompleteUpdate"
        />
      </template>
      <template #read>
        <Documents
          v-if="etapeEditFormatted.documents?.length"
          :documents="etapeEditFormatted.documents"
          :etiquette="true"
        />
        <p v-else class="h5 italic">Non renseigné</p>
      </template>
    </Accordion>

    <Accordion
      v-if="stepJustificatifs"
      id="step-justificatifs"
      :step="stepJustificatifs"
      :opened="opened['justificatifs']"
      :modifiable="modifiable"
      :complete="stepJustificatifsComplete"
      :en-construction="enConstruction"
      @toggle="toggle('justificatifs')"
      @next="next('justificatifs')"
    >
      <template #write>
        <JustificatifsEdit
          v-model:justificatifs="etape.justificatifs"
          :justificatifs-types="etapeType.justificatifsTypes"
          :entreprises="entreprises"
          @complete-update="justificatifsCompleteUpdate"
        />
      </template>
      <template #read>
        <Documents
          v-if="etapeEditFormatted.justificatifs?.length"
          :documents="etapeEditFormatted.justificatifs"
          :etiquette="true"
        />
        <p v-else class="h5 italic">Non renseigné</p>
      </template>
    </Accordion>
  </div>
</template>

<script>
import Accordion from './accordion.vue'
import TypeEdit from './type-edit.vue'
import Statut from '../_common/statut.vue'
import FondamentalesEdit from './fondamentales-edit.vue'
import Fondamentales from './fondamentales.vue'
import PointsEdit from './points-edit.vue'
import Points from './points.vue'
import Section from '../_common/section.vue'
import SectionsEdit from './sections-edit.vue'
import DocumentsEdit from '../document/multi-edit.vue'
import JustificatifsEdit from './justificatifs-edit.vue'
import Documents from '../documents/list.vue'

export default {
  components: {
    Accordion,
    TypeEdit,
    Statut,
    FondamentalesEdit,
    Fondamentales,
    PointsEdit,
    Points,
    SectionsEdit,
    Section,
    DocumentsEdit,
    JustificatifsEdit,
    Documents
  },

  props: {
    etape: { type: Object, required: true },

    user: { type: Object, required: true },
    modifiable: { type: Boolean, required: true },
    etapeIsDemande: { type: Boolean, required: true }
  },

  emits: ['complete-update', 'type-complete-update'],

  data() {
    return {
      events: { saveKeyUp: true },
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
    titre() {
      return this.etape.demarche.titre
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

    entreprises() {
      const titulaireIds = this.etape.titulaires.map(({ id }) => id)
      const amodiatairesIds = this.etape.amodiataires.map(({ id }) => id)

      return this.$store.state.titreEtape.metas.entreprises.filter(
        ({ id }) => titulaireIds.includes(id) || amodiatairesIds.includes(id)
      )
    },

    etapeEditFormatted() {
      return this.$store.getters['titreEtape/etapeEditFormatted']
    },

    heritageLoaded() {
      return this.$store.state.titreEtape.heritageLoaded
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
      const steps = [{ id: 'type', name: 'Type' }]

      if (this.heritageLoaded && this.etapeType?.fondamentale) {
        steps[steps.length - 1].hasNextButton = true
        steps.push({
          id: 'fondamentales',
          name: 'Propriétés',
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

      if (this.heritageLoaded && this.etapeType?.justificatifsTypes?.length) {
        steps[steps.length - 1].hasNextButton = true
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

    hasFondamentales() {
      return (
        !!this.etape.duree ||
        !!this.etape.surface ||
        !!this.etape.dateDebut ||
        !!this.etape.dateFin ||
        !!(this.etape.points && this.etape.points.length) ||
        !!(this.etape.substances && this.etape.substances.length) ||
        !!(this.etape.titulaires && this.etape.titulaires.length) ||
        !!(this.etape.amodiataires && this.etape.amodiataires.length)
      )
    },

    hasSections() {
      return !!this.etapeType.sections?.length
    },

    hasDocuments() {
      return this.etape.documents && !!this.etape.documents.length
    }
  },

  watch: {
    complete: 'completeUpdate'
  },

  created() {
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
      this.typeComplete = complete
      this.$emit('type-complete-update', this.typeComplete)
    },

    async typeUpdate(typeId) {
      await this.$store.dispatch('titreEtape/heritageGet', { typeId })
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
    },

    async fileDownload(fichier) {
      await this.$store.dispatch(
        'download',
        `etape/${this.etape.id}/${fichier}`
      )
    }
  }
}
</script>
