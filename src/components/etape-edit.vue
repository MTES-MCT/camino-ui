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
      :step-id="1"
      title="Type d’étape"
      :opened="opened"
      @toggle="toggle"
      @next="next"
    >
      <EtapeEditType
        v-model:etape="etape"
        :etape-types="etapeTypes"
        :etape-type="etapeType"
        @type-update="typeUpdate"
      />
    </EtapeEditAccordion>

    <EtapeEditAccordion
      v-if="stepEditFondamentalesVisible"
      :step-id="2"
      title="Propriétés fondamentales"
      :opened="opened"
      :has-next-button="stepCount !== 2"
      @toggle="toggle"
      @next="next"
    >
      <EtapeEditFondamentales v-model:etape="etape" :domaine-id="domaineId" />
    </EtapeEditAccordion>

    <EtapeEditAccordion
      v-if="stepEditFondamentalesVisible"
      :step-id="3"
      title="Périmètre"
      :opened="opened"
      :has-next-button="stepCount !== 3"
      @toggle="toggle"
      @next="next"
    >
      <EtapeEditPoints v-model:etape="etape" v-model:events="events" />
    </EtapeEditAccordion>

    <EtapeEditAccordion
      v-if="stepEditSectionsVisible"
      :step-id="4"
      title="Section spécifiques"
      :opened="opened"
      :has-next-button="stepCount !== 4"
      @toggle="toggle"
      @next="next"
    >
      <EditSections
        v-model:etape="etape"
        :sections="etape.sections"
        @complete-update="sectionsCompleteUpdate"
      />
    </EtapeEditAccordion>

    <EtapeEditAccordion
      v-if="stepEditDocumentsVisible"
      :step-id="5"
      title="Documents"
      :opened="opened"
      :has-next-button="stepCount !== 5"
      @toggle="toggle"
      @next="next"
    >
      <DocumentsEdit
        v-model:documents="etape.documents"
        :parent-id="etape.id"
        :documents-types="etapeType.documentsTypes"
        repertoire="demarches"
        @complete-update="documentsCompleteUpdate"
      />
    </EtapeEditAccordion>

    <div v-if="!loading" class="tablet-blobs">
      <div class="tablet-blob-1-3 mb tablet-mb-0"></div>
      <div class="tablet-blob-2-3">
        <button
          ref="save-button"
          class="btn-flash rnd-xs p-s full-x mb"
          :disabled="!complete"
          :class="{ disabled: !complete }"
          @click="save"
        >
          Enregistrer
        </button>
      </div>
    </div>
    <div v-else class="p-s full-x bold">Enregistrement en cours…</div>
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
import { nextTick } from 'vue'

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
        1: true
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

    stepCount() {
      let stepCount = 1
      if (this.stepEditFondamentalesVisible) {
        stepCount += 2
      }
      if (this.stepEditSectionsVisible) {
        stepCount++
      }
      if (this.stepEditDocumentsVisible) {
        stepCount++
      }
      return stepCount
    },

    complete() {
      return (
        this.etape &&
        this.etape.date &&
        this.etape.typeId &&
        this.etape.statutId &&
        (this.etape.statutId === 'aco' ||
          ((!this.etapeType.documentsTypes?.length || this.documentsComplete) &&
            this.sectionsComplete))
      )
    },

    loading() {
      return this.$store.state.loading.includes('titreEtapeUpdate')
    },

    stepEditFondamentalesVisible() {
      return (
        this.heritageLoaded && this.etapeType && this.etapeType.fondamentale
      )
    },

    stepEditSectionsVisible() {
      return this.heritageLoaded && this.etape.sections?.length
    },

    stepEditDocumentsVisible() {
      return this.heritageLoaded && this.etapeType.documentsTypes?.length
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
        await this.$store.dispatch('titreEtape/upsert', this.etape)

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
      if (!this.opened[stepId]) {
        this.opened[stepId] = false
      }

      Object.keys(this.opened).forEach(key => {
        if (stepId.toString() === key) {
          this.opened[stepId] = !this.opened[stepId]
        } else {
          this.opened[key] = false
        }
      })

      this.scrollToStep(stepId)
    },

    next(stepId) {
      this.toggle(stepId + 1)
    },

    scrollToStep(stepId) {
      nextTick(() => {
        document.getElementById('step' + stepId).scrollIntoView()
      })
    }
  }
}
</script>
