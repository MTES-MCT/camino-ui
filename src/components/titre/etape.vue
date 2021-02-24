<template>
  <Accordion :opened="opened" class="mb-s" @close="close" @toggle="toggle">
    <template #title>
      <h6 class="mt-xs">
        {{ etape.date | dateFormat }}
        <Tag
          v-if="etape.incertitudes && etape.incertitudes.date"
          :mini="true"
          color="bg-info"
          class="ml-xs"
        >
          ?
        </Tag>
      </h6>
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

    <div v-if="hasSections || hasProps || hasDocuments">
      <EtapeProps v-if="hasProps" :etape="etape" />

      <div v-if="hasSections" class="border-b-s">
        <Section
          v-for="s in etape.type.sections"
          :key="s.id"
          class="border-b-s px-m pt-m"
          :section="s"
          :contenu="etape.contenu ? etape.contenu[s.id] : {}"
          :date="etape.date"
        />
      </div>

      <div v-if="etape.documents.length" class="border-b-s">
        <h4 class="px-m pt mb-s">Documents</h4>
        <Documents
          :bouton-suppression="etape.modification"
          :bouton-modification="etape.modification"
          :context="documentContext"
          :documents="etape.documents"
          :etiquette="etape.modification"
          :parent-id="etape.id"
          :parent-type-id="etape.type.id"
          :repertoire="documentRepertoire"
          :title="documentPopupTitle"
          class="px-m"
          @titre-event-track="eventTrack"
        />
      </div>

      <div v-if="etape.justificatifs.length">
        <h4 class="px-m pt mb-s">Justificatifs</h4>
        <Documents
          :bouton-dissociation="etape.modification"
          :bouton-modification="false"
          :bouton-suppression="false"
          :context="documentContext"
          :documents="etape.justificatifs"
          :etiquette="etape.modification"
          :parent-id="etape.id"
          :parent-type-id="etape.type.id"
          :repertoire="documentRepertoire"
          :title="documentPopupTitle"
          class="px-m"
          @titre-event-track="eventTrack"
        />
      </div>
    </div>
  </Accordion>
</template>

<script>
import Accordion from '../_ui/accordion.vue'
import Tag from '../_ui/tag.vue'
import Section from '../_common/section.vue'
import Statut from '../_common/statut.vue'
import EditPopup from './etape/edit.vue'
import RemovePopup from './etape/remove.vue'
import DocumentButtonAdd from '../document/button-add.vue'
import JustificatifsButtonAdd from '../justificatifs/button-add.vue'
import EtapeProps from './etape/props.vue'
import Documents from '../documents/list.vue'

const cap = string => string[0].toUpperCase() + string.slice(1)

export default {
  name: 'CaminoTitreEtape',

  components: {
    Accordion,
    Tag,
    Documents,
    DocumentButtonAdd,
    JustificatifsButtonAdd,
    EtapeProps,
    Section,
    Statut
  },

  props: {
    etape: { type: Object, required: true },
    demarcheType: { type: Object, required: true },
    demarcheId: { type: String, default: '' }
  },

  data() {
    return {
      documentRepertoire: 'demarches'
    }
  },

  computed: {
    titre() {
      return this.$store.state.titre.current
    },

    etapeType() {
      return (
        this.demarcheType.etapesTypes.find(et => et.id === this.etape.typeId) ||
        {}
      )
    },

    hasProps() {
      return (
        !!this.etape.duree ||
        !!this.etape.dateDebut ||
        !!this.etape.dateFin ||
        !!(this.etape.points && this.etape.points.length) ||
        !!(this.etape.substances && this.etape.substances.length) ||
        !!(this.etape.titulaires && this.etape.titulaires.length) ||
        !!(this.etape.amodiataires && this.etape.amodiataires.length)
      )
    },

    hasSections() {
      return !!this.etape.type.sections.length
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
          domaineId: this.$store.state.titre.current.domaine.id,
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
          titreType: this.$store.state.titre.current.type.nom
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
    }
  }
}
</script>
