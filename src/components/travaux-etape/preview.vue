<template>
  <Accordion
    :id="travauxEtape.id"
    :opened="opened"
    class="mb-s"
    :slot-default="hasSections || hasFondamentales || hasDocuments"
    :slot-buttons="travauxEtape.modification || travauxEtape.suppression"
    @close="close"
    @toggle="toggle"
  >
    <template #title>
      <h5>
        {{ dateFormat(travauxEtape.date) }}
      </h5>

      <h3 class="cap-first mb-s">{{ travauxEtape.type.nom }}</h3>

      <div class="mb-xs">
        <Statut
          :color="travauxEtape.statut.couleur"
          :nom="travauxEtape.statut.nom"
        />
      </div>
    </template>

    <template
      v-if="travauxEtape.modification || travauxEtape.suppression"
      #buttons
    >
      <button
        v-if="travauxEtape.modification"
        class="btn py-s px-m mr-px"
        @click="travauxEtapeEdit"
      >
        <i class="icon-24 icon-pencil" />
      </button>

      <button
        v-if="travauxEtape.suppression"
        class="btn py-s px-m mr-px"
        @click="removePopupOpen"
      >
        <i class="icon-24 icon-trash" />
      </button>
    </template>

    <div class="px pt-m">
      <div v-if="hasFondamentales">
        <Fondamentales :etape="travauxEtape" class="px-m pt-m border-b-s" />
        <hr class="mx--" />
      </div>

      <div v-if="travauxEtape.type.sections?.length">
        <Section
          v-for="s in travauxEtape.type.sections"
          :key="s.id"
          :section="s"
          :contenu="travauxEtape.contenu ? travauxEtape.contenu[s.id] : {}"
          :date="travauxEtape.date"
        />

        <hr class="mx--" />
      </div>

      <div v-if="travauxEtape.documents?.length">
        <h4>Documents</h4>
        <Documents
          :bouton-suppression="false"
          :bouton-modification="false"
          :documents="travauxEtape.documents"
          :etiquette="travauxEtape.modification"
          :parent-id="travauxEtape.id"
          :parent-type-id="travauxEtape.type.id"
          repertoire="demarches"
        />

        <hr class="mx--" />
      </div>
    </div>
  </Accordion>
</template>

<script>
import { dateFormat } from '@/utils'
import Fondamentales from './../etape/fondamentales.vue'
import Section from '../_common/section.vue'
import Documents from '../documents/list.vue'

import Accordion from '../_ui/accordion.vue'
import Statut from '../_common/statut.vue'
import RemovePopup from './remove.vue'

export default {
  components: {
    Accordion,
    Statut,
    Fondamentales,
    Section,
    Documents
  },

  props: {
    travauxEtape: { type: Object, required: true },
    travauxType: { type: Object, required: true },
    titreTypeType: { type: Object, required: true },
    titreNom: { type: String, required: true },
    titreId: { type: String, required: true },
    opened: { type: Boolean, default: false }
  },

  emits: ['close', 'toggle'],

  computed: {
    travauxEtapeType() {
      return (
        this.travauxType.etapesTypes.find(
          et => et.id === this.travauxEtape.typeId
        ) || {}
      )
    },

    route() {
      return {
        name: 'titre',
        section: 'travauxEtapes',
        id: this.titreId
      }
    },

    hasFondamentales() {
      return !!this.travauxEtape.duree
    },

    hasSections() {
      return !!this.travauxEtape.type.sections?.length
    },

    hasDocuments() {
      return this.travauxEtape.documents && !!this.travauxEtape.documents.length
    }
  },

  methods: {
    dateFormat(date) {
      return dateFormat(date)
    },

    close() {
      this.$emit('close')
    },

    toggle() {
      this.$emit('toggle')
    },

    travauxEtapeEdit() {
      this.$router.push({
        name: 'travaux-etape-edition',
        params: { id: this.travauxEtape.slug }
      })

      this.eventTrack({
        categorie: 'titre-travaux-etape',
        action: 'titre-travaux-etape_editer',
        nom: this.$route.params.id
      })
    },

    removePopupOpen() {
      this.$store.commit('popupOpen', {
        component: RemovePopup,
        props: {
          travauxEtapeTypeNom: this.travauxEtape.type.nom,
          travauxEtapeId: this.travauxEtape.id,
          travauxTypeNom: this.travauxType.nom,
          titreNom: this.titreNom,
          titreTypeNom: this.titreTypeType.nom
        }
      })

      this.eventTrack({
        categorie: 'titre-travaux-etape',
        action: 'supprimer une étape',
        nom: this.$route.params.id
      })
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    }
  }
}
</script>
