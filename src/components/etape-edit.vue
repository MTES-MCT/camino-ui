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
      <Accordion
        id="step-type"
        :step="stepType"
        :opened="opened['type']"
        :complete="typeComplete"
        :en-construction="enConstruction"
        @toggle="toggle('type')"
        @next="next('type')"
      >
        <EtapeEditType
          v-model:etape="etape"
          :user="user"
          :etape-types="etapeTypes"
          :etape-type="etapeType"
          :etape-is-demande="etapeIsDemande"
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
        @next="next('fondamentales')"
      >
        <EtapeEditFondamentales v-model:etape="etape" :domaine-id="domaineId" />
      </Accordion>

      <Accordion
        v-if="stepPoints"
        id="step-points"
        :step="stepPoints"
        :opened="opened['points']"
        :complete="true"
        :en-construction="enConstruction"
        @toggle="toggle('points')"
        @next="next('points')"
      >
        <EtapeEditPoints v-model:etape="etape" v-model:events="events" />
      </Accordion>

      <Accordion
        v-if="stepSections"
        id="step-sections"
        :step="stepSections"
        :opened="opened['sections']"
        :complete="stepSectionsComplete"
        :en-construction="enConstruction"
        @toggle="toggle('sections')"
        @next="next('sections')"
      >
        <EditSections
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
        @next="next('documents')"
      >
        <DocumentsEdit
          v-model:documents="etape.documents"
          :parent-id="etape.id"
          :documents-types="etapeType.documentsTypes"
          repertoire="demarches"
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
        @next="next('justificatifs')"
      >
        <JustificatifsEdit
          v-model:justificatifs="etape.justificatifs"
          :justificatifs-types="etapeType.justificatifsTypes"
          :entreprises="entreprises"
          @complete-update="justificatifsCompleteUpdate"
        />
      </Accordion>
    </div>

    <div v-else class="mb">
      <h5 v-if="etape.date" class="mb-0">{{ etape.date }}</h5>
      <h3 class="cap-first">{{ etapeType.nom }}</h3>

      <div v-if="!etapeIsDemande" class="mb">
        <Statut
          :color="etapeEditFormatted.statut.couleur"
          :nom="etapeEditFormatted.statut.nom"
          class="mb-xs"
        />
      </div>

      <hr />

      <Preview
        :etape="etapeEditFormatted"
        :has-fondamentales="hasFondamentales"
        :has-sections="hasSections"
        :has-documents="hasDocuments"
        :document-context="documentContext"
        :document-popup-title="documentPopupTitle"
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
          Prévisualiser…
        </button>
      </div>
    </div>

    <div v-else-if="!loading" class="tablet-blobs mb">
      <div class="tablet-blob-1-3">
        <button class="btn-border rnd-xs p-s full-x mb-s" @click="edit">
          Modifier…
        </button>
      </div>

      <div class="tablet-blob-2-3">
        <div v-if="etapeIsDemande" class="tablet-blobs">
          <div class="tablet-blob-1-2">
            <button
              ref="en-construction-button"
              class="btn-flash rnd-xs p-s full-x mb-s"
              :disabled="!typeComplete"
              :class="{
                disabled: !typeComplete
              }"
              @click="save(false)"
            >
              En construction
            </button>
          </div>
          <div class="tablet-blob-1-2">
            <button
              ref="save-depose-button"
              class="btn-flash rnd-xs p-s full-x"
              :disabled="!complete"
              :class="{ disabled: !complete }"
              @click="save(true)"
            >
              Déposer
            </button>
          </div>
        </div>
        <div v-else class="tablet-blobs">
          <div class="tablet-blob-1-2">
            <button
              ref="save-button"
              class="btn-flash rnd-xs p-s full-x mb-s"
              :disabled="!complete"
              :class="{
                disabled: !complete
              }"
              @click="save"
            >
              Valider
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
import { cap } from '@/utils'
import Loader from './_ui/loader.vue'
import Statut from './_common/statut.vue'
import Preview from './etape/preview.vue'
import EtapeEditType from './etape/type-edit.vue'
import Accordion from './etape/accordion.vue'
import EtapeEditFondamentales from './etape/fondamentales-edit.vue'
import EtapeEditPoints from './etape/points-edit.vue'
import EditSections from './etape/sections-edit.vue'
import DocumentsEdit from './document/multi-edit.vue'
import JustificatifsEdit from './etape/justificatifs-edit.vue'

export default {
  components: {
    Loader,
    EtapeEditType,
    EtapeEditFondamentales,
    EtapeEditPoints,
    EditSections,
    DocumentsEdit,
    Statut,
    Preview,
    JustificatifsEdit,
    Accordion
  },

  emits: ['type-update'],

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
      },
      modifiable: true
    }
  },

  computed: {
    user() {
      return this.$store.state.user.element
    },

    entreprises() {
      const titulaireIds = this.etape.titulaires.map(({ id }) => id)
      const amodiatairesIds = this.etape.amodiataires.map(({ id }) => id)

      return this.$store.state.titreEtape.metas.entreprises.filter(
        ({ id }) => titulaireIds.includes(id) || amodiatairesIds.includes(id)
      )
    },

    etape() {
      return this.$store.state.titreEtape.element
    },

    etapeEditFormatted() {
      return this.$store.getters['titreEtape/etapeEditFormatted']
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

    loading() {
      return this.$store.state.loading.includes('titreEtapeUpdate')
    },

    stepSectionsComplete() {
      return !this.etape.sections?.length || this.sectionsComplete
    },

    stepDocumentsComplete() {
      return !this.etapeType.documentsTypes?.length || this.documentsComplete
    },

    stepJustificatifsComplete() {
      return (
        !this.etapeType.justificatifsTypes?.length || this.justificatifsComplete
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

    async save(depose) {
      if (
        (this.etapeIsDemande && !depose && this.typeComplete) ||
        this.complete
      ) {
        await this.$store.dispatch('titreEtape/upsert', {
          etape: this.etape,
          depose
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
        if (this.modifiable) {
          this.preview()
        } else if (!this.loading && this.etapeIsDemande && this.complete) {
          this.$refs['save-depose-button'].focus()
          this.save(true)
        } else if (!this.loading && this.etapeIsDemande && this.typeComplete) {
          this.$refs['en-construction-button'].focus()
          this.save(false)
        } else if (!this.loading && this.complete) {
          this.$refs['save-button'].focus()
          this.save()
        }
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

    justificatifsCompleteUpdate(complete) {
      this.justificatifsComplete = complete
    },

    sectionsCompleteUpdate(complete) {
      this.sectionsComplete = complete
    },

    typeCompleteUpdate(complete) {
      this.typeComplete = complete
    },

    async typeUpdate(typeId) {
      await this.$store.dispatch('titreEtape/heritageGet', {
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
