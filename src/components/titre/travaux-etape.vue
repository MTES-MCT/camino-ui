<template>
  <Accordion
    :opened="opened"
    class="mb-s"
    :slot-default="true"
    :slot-buttons="true"
    @close="close"
    @toggle="toggle"
  >
    <template #title>
      <h5>
        {{ dateFormat(etape.date) }}
      </h5>

      <h3 class="cap-first mb-s">
        {{ etape.type.nom }}
      </h3>
      <div class="mb-xs">
        <Statut :color="etape.statut.couleur" :nom="etape.statut.nom" />
      </div>
    </template>

    <template v-if="etape.modification || etape.suppression" #buttons>
      <DocumentButtonAdd
        v-if="etape.documentsCreation"
        :document="documentNew"
        :title="documentPopupTitle"
        :context="documentContext"
        repertoire="travaux"
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

    <div
      v-if="
        hasSections ||
        hasFondamentales ||
        (etape.documents && etape.documents.length)
      "
    >
      <EtapeFondamentales
        v-if="hasFondamentales"
        :etape="etape"
        class="px-m pt-m border-b-s"
      />

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
          repertoire="travaux"
          :title="documentPopupTitle"
          class="px-m"
        />
      </div>
    </div>
  </Accordion>
</template>

<script>
import Accordion from '../_ui/accordion.vue'
import Statut from '../_common/statut.vue'
import Section from '../_common/section.vue'
import EditPopup from '../travaux-etape/edit.vue'
import RemovePopup from '../travaux-etape/remove.vue'
import DocumentButtonAdd from '../document/button-add.vue'
import Documents from '../documents/list.vue'
import EtapeFondamentales from '../etape/fondamentales.vue'

import { etapeEditFormat } from './travaux-etape.js'
import { dateFormat } from '@/utils'

const cap = string => string[0].toUpperCase() + string.slice(1)

export default {
  name: 'CaminoTitreTravauEtape',

  components: {
    Accordion,
    Documents,
    DocumentButtonAdd,
    Statut,
    Section,
    EtapeFondamentales
  },

  props: {
    etape: { type: Object, default: () => {} },
    travauxType: { type: Object, default: () => {} },
    travauxId: { type: String, default: '' }
  },

  emits: ['titre-event-track'],

  computed: {
    titre() {
      return this.$store.state.titre.element
    },

    opened() {
      return this.$store.state.titre.opened.travaux[this.etape.id]
    },

    etapeType() {
      return (
        this.travauxType.etapesTypes.find(et => et.id === this.etape.typeId) ||
        {}
      )
    },

    hasFondamentales() {
      return !!this.etape.duree
    },

    hasSections() {
      return this.etape.type.sections
    },

    documentContext() {
      return {
        name: 'titre',
        section: 'travaux',
        id: this.titre.id
      }
    },

    documentPopupTitle() {
      return `${cap(this.titre.nom)} | ${cap(this.travauxType.nom)} | ${cap(
        this.etape.type.nom
      )}`
    },

    documentNew() {
      return {
        titreTravauxEtapeId: this.etape.id,
        entreprisesLecture: false,
        publicLecture: false,
        typeId: '',
        fichier: null,
        fichierNouveau: null,
        fichierTypeId: null,
        date: this.etape.date
      }
    }
  },

  methods: {
    close() {
      this.$store.commit('titre/close', {
        section: 'travaux',
        id: this.etape.id
      })
    },

    toggle() {
      this.$store.commit('titre/toggle', {
        section: 'travaux',
        id: this.etape.id
      })
    },

    editPopupOpen() {
      const etape = etapeEditFormat(this.etape)
      etape.titreTravauxId = this.travauxId

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          etape,
          domaineId: this.$store.state.titre.element.domaine.id,
          travauxType: this.travauxType,
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
          travauxTypeNom: this.travauxType.nom,
          titreNom: this.titre.nom,
          titreType: this.$store.state.titre.element.type.nom
        }
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'supprimer une étape de travaux',
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
