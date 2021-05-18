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

    <EtapeEditType
      v-model:etape="etape"
      :etape-types="etapeTypes"
      :etape-type="etapeType"
      @type-update="typeUpdate"
    />

    <EtapeEditFondamentales
      v-if="heritageLoaded && etapeType && etapeType.fondamentale"
      v-model:etape="etape"
      :domaine-id="domaineId"
    />

    <EtapeEditPoints
      v-if="etapeType && etapeType.fondamentale"
      v-model:etape="etape"
      v-model:events="events"
    />

    <EditSections
      v-if="heritageLoaded && etape.sections"
      v-model:etape="etape"
      :sections="etape.sections"
      @complete-update="sectionsCompleteUpdate"
    />

    <DocumentsEdit
      v-if="
        heritageLoaded &&
        etapeType.documentsTypes &&
        etapeType.documentsTypes.length
      "
      v-model:documents="etape.documents"
      :parent-id="etape.id"
      :parent-type-id="etapeType.id"
      :documents-types="etapeType.documentsTypes"
      repertoire="demarches"
      @complete-update="documentsCompleteUpdate"
    />

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
    DocumentsEdit
  },

  emits: ['type-update'],

  data() {
    return {
      events: { saveKeyUp: true },
      heritageLoaded: true,
      documentsComplete: false,
      sectionsComplete: false
    }
  },

  computed: {
    etape() {
      return this.$store.state.titreEtape.element
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
      this.$emit('type-update', typeId)
    }
  }
}
</script>
