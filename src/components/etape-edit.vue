<template>
  <Loader v-if="!etape" />
  <div v-else>
    <h6>
      <span class="cap-first"> {{ titre.nom }} </span>
      <span class="color-neutral"> | </span>
      <span class="cap-first">
        {{ demarcheType.nom }}
      </span>
    </h6>
    <h2>Modification de l'étape</h2>

    <div v-if="modifiable" class="mb">
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
          :restricted="!userIsAdmin"
          :etape-is-demande="etapeIsDemande"
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

      <EtapeEditAccordion
          v-if="stepJustificatifs"
          id="step-justificatifs"
          :step="stepJustificatifs"
          :opened="opened['justificatifs']"
          :complete="stepJustificatifsComplete"
          @toggle="toggle('justificatifs')"
          @next="next('justificatifs')"
      >
        <JustificatifsEdit
            v-model:etape="etape"
            :justificatifs-types="etapeType.justificatifsTypes"
            @complete-update="justificatifsCompleteUpdate"
        />
      </EtapeEditAccordion>
    </div>

    <div v-else class="mb">
      <Detail
        :etape="etapeFormatted"
        :has-fondamentales="hasFondamentales"
        :has-sections="hasSections"
        :has-documents="hasDocuments"
        :document-context="documentContext"
        :document-popup-title="documentPopupTitle"
        :document-repertoire="documentRepertoire"
        @file-download="fileDownload"
        @titre-event-track="eventTrack"
      />
    </div>

    <div v-if="modifiable" class="tablet-blobs mb">
      <div class="tablet-blob-1-3" />
      <div class="tablet-blob-2-3">
        <button
          id="cmn-titre-activite-edit-popup-button-previsualiser"
          ref="preview-button"
          class="btn-flash rnd-xs p-s full-x"
          @click="preview"
        >
          Prévisualiser
        </button>
      </div>
    </div>

    <div v-else-if="!loading" class="tablet-blobs mb">
      <div class="tablet-blob-1-3">
        <button class="btn-border rnd-xs p-s full-x mb-s" @click="edit">
          Modifier
        </button>
      </div>

      <div class="tablet-blob-2-3">
        <div class="tablet-blobs">
          <div
            :class="{
              'tablet-blob-1': !etapeIsDemande,
              'tablet-blob-1-2': etapeIsDemande
            }"
          >
            <button
              ref="save-button"
              class="btn-flash rnd-xs p-s full-x mb-s"
              :disabled="!complete"
              :class="{ disabled: !complete }"
              @click="save"
            >
              Enregistrer
            </button>
          </div>
          <div v-if="etapeIsDemande" class="tablet-blob-1-2">
            <button
              ref="save-button"
              class="btn-flash rnd-xs p-s full-x"
              :disabled="!complete"
              :class="{ disabled: !complete }"
              @click="save"
            >
              Déposer
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="tablet-blobs">
      <div class="tablet-blob-1-3" />
      <div class="tablet-blob-2-3">
        <div class="p-s bold">Enregistrement en cours…</div>
      </div>
    </div>
  </div>
</template>

<script>
import { cap, permissionsCheck } from '@/utils'
import Loader from './_ui/loader.vue'
import Detail from './etape/detail.vue'
import EtapeEditType from './etape/edit-type.vue'
import EtapeEditAccordion from './etape/edit-accordion.vue'
import EtapeEditFondamentales from './etape/edit-fondamentales.vue'
import EtapeEditPoints from './etape/edit-points.vue'
import EditSections from './etape/edit-sections.vue'
import DocumentsEdit from './document/edit-multi.vue'
import JustificatifsEdit from './etape/edit-justificatifs.vue'

export default {
  components: {
    Loader,
    EtapeEditType,
    EtapeEditFondamentales,
    EtapeEditPoints,
    EditSections,
    DocumentsEdit,
    Detail,
    JustificatifsEdit,
    EtapeEditAccordion
  },

  emits: ['type-update'],

  data() {
    return {
      events: { saveKeyUp: true },
      sectionsComplete: false,
      documentsComplete: false,
      justificatifsComplete: false,
      justificatifs: false,
      opened: {
        type: true,
        fondamentales: false,
        points: false,
        sections: false,
        documents: false,
        justificatifs: false
      },
      modifiable: true,
      documentRepertoire: 'demarches'
    }
  },

  computed: {
    user() {
      return this.$store.state.user.element
    },

    entreprises() {
      return this.$store.state.user.metas.entreprisesTitresCreation
    },

    etape() {
      return this.$store.state.titreEtape.element
    },

    etapeFormatted() {
      return this.$store.getters['titreEtape/etapeFormatted']
    },

    heritageLoaded() {
      return this.$store.state.titreEtape.heritageLoaded
    },

    demarcheType() {
      return this.etape.demarche.type
    },

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

    complete() {
      return (
        this.stepTypeComplete &&
        this.stepSectionsComplete &&
        this.stepDocumentsComplete &&
        this.stepJustificatifsComplete
      )
    },

    loading() {
      return this.$store.state.loading.includes('titreEtapeUpdate')
    },

    stepTypeComplete() {
      if (this.userIsAdmin) {
        return !!(this.etape && this.etape.date && this.etape.typeId)
      }

      return this.etape.typeId
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

    stepJustificatifsComplete() {
      return (
        this.etape.statutId === 'aco' ||
        !this.etapeType.justificatifsTypes?.length ||
        this.justificatifsComplete
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

    userIsAdmin() {
      return permissionsCheck(this.user, ['super', 'admin', 'editeur'])
    },

    etapeIsDemande() {
      return ['mfr', 'mfm'].includes(this.etape.typeId)
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
    },

    documentContext() {
      return {
        name: 'titre',
        section: 'etapes',
        id: this.titre.id
      }
    },

    documentPopupTitle() {
      return `${cap(this.titre.nom)} | ${cap(this.demarcheType.nom)} | ${cap(
        this.etapeType.nom
      )}`
    }
  },

  watch: {
    user: 'init'
  },

  async created() {
    await this.init()

    document.addEventListener('keyup', this.keyUp)
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
          etape: this.etape
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

    async fileDownload(fichier) {
      await this.$store.dispatch(
        'download',
        `etape/${this.etape.id}/${fichier}`
      )
    },

    documentsCompleteUpdate(complete) {
      this.documentsComplete = complete
    },

    justificatifsCompleteUpdate(complete) {
      this.justificatifsComplete = complete
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

    preview() {
      this.modifiable = false
    },

    edit() {
      // this.errorsRemove()
      this.modifiable = true
    }
  }
}
</script>
