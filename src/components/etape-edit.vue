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

    <h1>Modification de l'étape</h1>

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
          <Points
            v-if="etapeEditFormatted.points"
            :etape="etapeEditFormatted"
          />
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
            :parent-id="etape.id"
            :documents-types="etapeType.documentsTypes"
            repertoire="demarches"
            :show-title="false"
            @complete-update="documentsCompleteUpdate"
          />
        </template>
        <template #read>
          <Documents
            v-if="etapeEditFormatted.documents.length"
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
            v-if="etapeEditFormatted.justificatifs.length"
            :documents="etapeEditFormatted.justificatifs"
            :etiquette="true"
          />
          <p v-else class="h5 italic">Non renseigné</p>
        </template>
      </Accordion>
    </div>

    <div v-if="modifiable" class="tablet-blobs mb">
      <div class="tablet-blob-1-3" />
      <div class="tablet-blob-2-3">
        <button
          id="cmn-etape-edit-button-previsualiser"
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
        <button
          ref="modifier-button"
          class="btn-border rnd-xs p-s full-x mb-s"
          @click="edit"
        >
          Modifier…
        </button>
      </div>

      <div class="tablet-blob-2-3">
        <div v-if="etapeIsDemande" class="tablet-blobs">
          <div class="tablet-blob-1-2">
            <button
              ref="en-construction-button"
              class="rnd-xs p-s full-x mb-s"
              :disabled="!typeComplete"
              :class="{
                disabled: !typeComplete,
                'btn-flash': !complete,
                btn: complete
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
        <button
          v-else
          ref="save-button"
          class="btn-flash rnd-xs p-s full-x mb-s"
          :disabled="!complete"
          :class="{ disabled: !complete }"
          @click="save"
        >
          Valider
        </button>
      </div>
    </div>

    <div v-else class="tablet-blobs">
      <div class="tablet-blob-1-3" />
      <div class="tablet-blob-2-3">
        <div class="p-s bold mb">Enregistrement en cours…</div>
      </div>
    </div>
  </div>
</template>

<script>
import { cap } from '@/utils'
import Loader from './_ui/loader.vue'
import Statut from './_common/statut.vue'
import TypeEdit from './etape/type-edit.vue'
import Accordion from './etape/accordion.vue'
import FondamentalesEdit from './etape/fondamentales-edit.vue'

import Fondamentales from './etape/fondamentales.vue'

import PointsEdit from './etape/points-edit.vue'
import Points from './etape/points.vue'
import SectionsEdit from './etape/sections-edit.vue'
import Section from './_common/section.vue'

import DocumentsEdit from './document/multi-edit.vue'
import JustificatifsEdit from './etape/justificatifs-edit.vue'
import Documents from './documents/list.vue'

export default {
  components: {
    Loader,
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
      if ((e.which || e.keyCode) === 27) {
        if (this.modifiable) {
          this.$refs['modifier-button'].focus()
          this.edit()
        }
      } else if (
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
      this.modifiable = true
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
