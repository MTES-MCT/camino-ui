<template>
  <Accordion
    :opened="opened"
    class="mb-s"
    :slot-default="hasSections || hasFondamentales || hasDocuments"
    :slot-buttons="true"
    @close="close"
    @toggle="toggle"
  >
    <template #title>
      <h5>
        {{ dateFormat(etape.date) }}
        <Tag
          v-if="etape.incertitudes && etape.incertitudes.date"
          :mini="true"
          color="bg-info"
          class="ml-xs"
        >
          Incertain
        </Tag>
      </h5>

      <h3 class="cap-first mb-s">{{ etape.type.nom }}</h3>

      <div class="mb-xs">
        <Statut :color="etape.statut.couleur" :nom="etape.statut.nom" />
      </div>
    </template>

    <template v-if="etape.modification || etape.suppression" #buttons>
      <JustificatifsButtonAdd
        v-if="etape.justificatifsAssociation"
        :id="etape.id"
        :context="documentContext"
        :title="documentPopupTitle"
        :documents="{ ids: etape.justificatifs.map(j => j.id) }"
        class="btn py-s px-m mr-px"
        @titre-event-track="eventTrack"
      />

      <DocumentButtonAdd
        v-if="etape.documentsCreation"
        :document="documentNew"
        :title="documentPopupTitle"
        :context="documentContext"
        :repertoire="documentRepertoire"
        :parent-id="etape.id"
        :parent-type-id="etape.type.id"
        class="btn py-s px-m mr-px"
        @titre-event-track="eventTrack"
      />

      <button
        v-if="etape.modification"
        class="btn py-s px-m mr-px"
        @click="editPopupOpen"
      >
        <i class="icon-24 icon-pencil" />
      </button>

      <button
        v-if="etape.suppression"
        class="btn py-s px-m mr-px"
        @click="removePopupOpen"
      >
        <i class="icon-24 icon-trash" />
      </button>
    </template>

    <Detail
      v-if="hasSections || hasFondamentales || hasDocuments"
      class="px-m pt-m"
      :etape="etape"
      :has-fondamentales="hasFondamentales"
      :has-sections="hasSections"
      :has-documents="hasDocuments"
      :document-context="documentContext"
      :document-popup-title="documentPopupTitle"
      :document-repertoire="documentRepertoire"
      :framed="true"
      @file-download="fileDownload"
      @titre-event-track="eventTrack"
    />
  </Accordion>
</template>

<script>
import { dateFormat, cap } from '@/utils'
import Accordion from '../_ui/accordion.vue'
import Tag from '../_ui/tag.vue'
import Statut from '../_common/statut.vue'
import EditPopup from '../etape/popup.vue'
import RemovePopup from '../etape/remove.vue'
import Detail from '../etape/detail.vue'
import DocumentButtonAdd from '../document/button-add.vue'
import JustificatifsButtonAdd from '../justificatifs/button-add.vue'

export default {
  name: 'CaminoTitreEtape',

  components: {
    Accordion,
    Tag,
    DocumentButtonAdd,
    JustificatifsButtonAdd,
    Statut,
    Detail
  },

  props: {
    etape: { type: Object, required: true },
    demarcheType: { type: Object, required: true },
    demarcheId: { type: String, default: '' }
  },

  emits: ['titre-event-track'],

  data() {
    return {
      documentRepertoire: 'demarches'
    }
  },

  computed: {
    titre() {
      return this.$store.state.titre.element
    },

    etapeType() {
      return (
        this.demarcheType.etapesTypes.find(et => et.id === this.etape.typeId) ||
        {}
      )
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
      return !!this.etape.type.sections?.length
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
        this.etape.type.nom
      )}`
    },

    documentNew() {
      return {
        titreEtapeId: this.etape.id,
        entreprisesLecture: false,
        publicLecture: false,
        typeId: '',
        fichier: null,
        fichierNouveau: null,
        fichierTypeId: null,
        date: this.etape.date
      }
    },

    opened() {
      return this.$store.state.titre.opened.etapes[this.etape.id]
    }
  },

  methods: {
    close() {
      this.$store.commit('titre/close', {
        section: 'etapes',
        id: this.etape.id
      })
    },

    toggle() {
      this.$store.commit('titre/toggle', {
        section: 'etapes',
        id: this.etape.id
      })
    },

    editPopupOpen() {
      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          etapeId: this.etape.id,
          demarcheId: this.demarcheId,
          domaineId: this.$store.state.titre.element.domaine.id,
          demarcheType: this.demarcheType,
          titreNom: this.titre.nom
        }
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-etape_editer',
        nom: this.$route.params.id
      })
    },

    removePopupOpen() {
      this.$store.commit('popupOpen', {
        component: RemovePopup,
        props: {
          etapeTypeNom: this.etape.type.nom,
          etapeId: this.etape.id,
          demarcheTypeNom: this.demarcheType.nom,
          titreNom: this.titre.nom,
          titreTypeNom: this.$store.state.titre.element.type.type.nom
        }
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'supprimer une étape',
        nom: this.$route.params.id
      })
    },

    eventTrack(event) {
      this.$emit('titre-event-track', event)
    },

    dateFormat(date) {
      return dateFormat(date)
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
