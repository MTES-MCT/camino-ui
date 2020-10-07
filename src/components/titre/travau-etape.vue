<template>
  <Accordion :opened="opened" class="mb-s" @close="close" @toggle="toggle">
    <template slot="title">
      <h6 class="mt-xs">
        {{ etape.date | dateFormat }}
      </h6>
      <h3 class="cap-first mb-s">
        {{ etape.type.nom }}
      </h3>
      <div class="mb-xs">
        <Statut :color="etape.statut.couleur" :nom="etape.statut.nom" />
      </div>
    </template>

    <template v-if="etape.modification || etape.suppression" slot="buttons">
      <DocumentButtonAdd
        :document="documentNew"
        :title="documentPopupTitle"
        :context="documentContext"
        :repertoire="documentRepertoire"
        :parent-id="etape.id"
        :parent-type-id="etape.type.id"
        class="btn py-s px-m mr-line"
        @titre-event-track="eventTrack"
      />
      <button
        v-if="etape.modification"
        class="btn py-s px-m mr-line"
        @click="editPopupOpen"
      >
        <i class="icon-24 icon-pencil" />
      </button>
      <button
        v-if="etape.suppression"
        class="btn py-s px-m mr-line"
        @click="removePopupOpen"
      >
        <i class="icon-24 icon-trash" />
      </button>
    </template>

    <div
      v-if="
        hasSections || hasProps || (etape.documents && etape.documents.length)
      "
    >
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
    </div>
  </Accordion>
</template>

<script>
import Accordion from '../_ui/accordion.vue'
import Statut from '../_common/statut.vue'
import Section from '../_common/section.vue'
import EditPopup from './travau-etape/edit.vue'
import RemovePopup from './travau-etape/remove.vue'
import DocumentButtonAdd from '../document/button-add.vue'
import Documents from '../documents/list.vue'
import EtapeProps from './etape/props.vue'

import { etapeEditFormat } from './travau-etape'

const cap = string => string[0].toUpperCase() + string.slice(1)

export default {
  name: 'CaminoTitreTravauEtape',

  components: {
    Accordion,
    Documents,
    DocumentButtonAdd,
    Statut,
    Section,
    EtapeProps
  },

  props: {
    etape: { type: Object, default: () => {} },
    travauxType: { type: Object, default: () => {} },
    travauxId: { type: String, default: '' }
  },

  data() {
    return {
      documentRepertoire: 'travaux'
    }
  },

  computed: {
    titre() {
      return this.$store.state.titre.current
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

    hasProps() {
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
      const etape = etapeEditFormat(this.etape, this.travauxId)

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          etape,
          domaineId: this.$store.state.titre.current.domaine.id,
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
          titreType: this.$store.state.titre.current.type.nom
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
    }
  }
}
</script>
