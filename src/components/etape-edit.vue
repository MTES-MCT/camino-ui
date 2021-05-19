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
      step-id="type"
      title="Type d’étape"
      :opened="opened"
      :has-next-button="!stepLastCheck('type')"
      :complete="stepTypeComplete"
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
      v-if="stepVisible('fondamentales')"
      step-id="fondamentales"
      title="Propriétés fondamentales"
      :opened="opened"
      :has-next-button="!stepLastCheck('fondamentales')"
      :complete="true"
      @toggle="toggle"
      @next="next"
    >
      <EtapeEditFondamentales v-model:etape="etape" :domaine-id="domaineId" />
    </EtapeEditAccordion>

    <EtapeEditAccordion
      v-if="stepVisible('points')"
      step-id="points"
      title="Périmètre"
      :opened="opened"
      :has-next-button="!stepLastCheck('points')"
      :complete="true"
      @toggle="toggle"
      @next="next"
    >
      <EtapeEditPoints v-model:etape="etape" v-model:events="events" />
    </EtapeEditAccordion>

    <EtapeEditAccordion
      v-if="stepVisible('sections')"
      step-id="sections"
      title="Section spécifiques"
      :opened="opened"
      :has-next-button="!stepLastCheck('sections')"
      :complete="stepSectionsComplete"
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
      v-if="stepVisible('documents')"
      step-id="documents"
      title="Documents"
      :opened="opened"
      :has-next-button="!stepLastCheck('documents')"
      :complete="stepDocumentsComplete"
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
        type: true
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

    stepIndex() {
      const stepIndex = {
        count: 1,
        ids: ['type']
      }

      if (this.heritageLoaded && this.etapeType?.fondamentale) {
        stepIndex.count++
        stepIndex.ids.push('fondamentales')
        stepIndex.count++
        stepIndex.ids.push('points')
      }

      if (this.heritageLoaded && this.etape.sections?.length) {
        stepIndex.count++
        stepIndex.ids.push('sections')
      }

      if (this.heritageLoaded && this.etapeType?.documentsTypes?.length) {
        stepIndex.count++
        stepIndex.ids.push('documents')
      }

      return stepIndex
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
      const index = this.stepIndex.ids.indexOf(stepId)

      this.toggle(this.stepIndex.ids[index + 1])
    },

    scrollToStep(stepId) {
      setTimeout(() => {
        document
          .getElementById('step' + stepId)
          .scrollIntoView({ behavior: 'smooth' })
      }, 500)
    },

    stepVisible(id) {
      return this.stepIndex.ids.includes(id)
    },

    stepLastCheck(id) {
      return this.stepIndex.ids.indexOf(id) + 1 === this.stepIndex.ids.length
    }
  }
}
</script>
