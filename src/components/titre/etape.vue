<template>
  <Accordion
    :opened="opened"
    class="mb-s"
    :slot-default="hasSections || hasFondamentales || hasDocuments"
    :slot-buttons="etape.modification || etape.suppression"
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
      <button
        v-if="etape.modification"
        class="btn py-s px-m mr-px"
        @click="etapeEdit"
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

    <Preview
      v-if="hasSections || hasFondamentales || hasDocuments"
      class="px-m pt-m"
      :etape="etape"
      :has-fondamentales="hasFondamentales"
      :has-sections="hasSections"
      :has-documents="hasDocuments"
      :route="route"
      :document-popup-title="documentPopupTitle"
      :domaine-id="domaineId"
      :titre-type-id="titreTypeId"
      @titre-event-track="eventTrack"
    />
  </Accordion>
</template>

<script>
import { dateFormat, cap } from '@/utils'
import Accordion from '../_ui/accordion.vue'
import Tag from '../_ui/tag.vue'
import Statut from '../_common/statut.vue'
import RemovePopup from '../etape/remove.vue'
import Preview from '../etape/preview.vue'

export default {
  name: 'CaminoTitreEtape',

  components: {
    Accordion,
    Tag,
    Statut,
    Preview
  },

  props: {
    etape: { type: Object, required: true },
    demarcheType: { type: Object, required: true },
    domaineId: { type: String, required: true },
    titreTypeId: { type: String, required: true }
  },

  emits: ['titre-event-track'],

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

    route() {
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

    etapeEdit() {
      this.$router.push({
        name: 'etape-edition',
        params: { id: this.etape.id }
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
    }
  }
}
</script>
