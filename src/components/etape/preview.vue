<template>
  <Accordion
    :id="etape.id"
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
        <Statut :color="etape.statut.couleur" :nom="statutNom" />
      </div>
    </template>

    <template v-if="etape.modification || etape.suppression" #buttons>
      <button
        v-if="etapeIsDemandeEnConstruction"
        class="btn py-s px-m flex mr-px small"
        :disabled="!etape.deposable"
        :class="{ disabled: !etape.deposable }"
        @click="etapeDepot"
      >
        <span class="mt-xxs mb-xxs">Déposer…</span>
      </button>

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

    <div class="px pt-m">
      <div v-if="hasFondamentales">
        <Fondamentales :etape="etape" />

        <Perimetre
          v-if="etape.points && etape.points.length"
          :points="etape.points"
          :domaine-id="domaineId"
          :titre-type-id="titreTypeType.id"
          :geojson-multi-polygon="etape.geojsonMultiPolygon"
          :incertitude="!!etape.incertitudes?.points"
        />
        <hr class="mx--" />
      </div>

      <div v-if="etape.type.sections?.length">
        <Section
          v-for="s in etape.type.sections"
          :key="s.id"
          :section="s"
          :contenu="etape.contenu ? etape.contenu[s.id] : {}"
          :date="etape.date"
        />

        <hr class="mx--" />
      </div>

      <div v-if="etape.documents?.length">
        <h4>Documents</h4>
        <Documents
          :bouton-suppression="false"
          :bouton-modification="false"
          :documents="etape.documents"
          :etiquette="etape.modification"
          :parent-id="etape.id"
          :parent-type-id="etape.type.id"
          repertoire="demarches"
          :title="documentPopupTitle"
        />

        <hr class="mx--" />
      </div>

      <div v-if="etape.justificatifs?.length">
        <h4>Justificatifs</h4>
        <Documents
          :bouton-dissociation="false"
          :bouton-modification="false"
          :bouton-suppression="false"
          :documents="etape.justificatifs"
          :etiquette="etape.modification"
          :parent-id="etape.id"
          :parent-type-id="etape.type.id"
          repertoire="'entreprises'"
          :title="documentPopupTitle"
        />

        <hr class="mx--" />
      </div>
    </div>
  </Accordion>
</template>

<script>
import { dateFormat, cap } from '@/utils'
import Perimetre from './perimetre.vue'
import Fondamentales from './fondamentales.vue'
import Section from '../_common/section.vue'
import Documents from '../documents/list.vue'

import Accordion from '../_ui/accordion.vue'
import Tag from '../_ui/tag.vue'
import Statut from '../_common/statut.vue'
import RemovePopup from './remove.vue'
import DeposePopup from './depose-popup.vue'

export default {
  components: {
    Accordion,
    Tag,
    Statut,
    Perimetre,
    Fondamentales,
    Section,
    Documents
  },

  props: {
    etape: { type: Object, required: true },
    demarcheType: { type: Object, required: true },
    titreTypeType: { type: Object, required: true },
    domaineId: { type: String, required: true },
    titreNom: { type: String, required: true },
    titreId: { type: String, required: true },
    opened: { type: Boolean, default: false }
  },

  emits: ['close', 'toggle'],

  computed: {
    etapeType() {
      return (
        this.demarcheType.etapesTypes.find(et => et.id === this.etape.typeId) ||
        {}
      )
    },

    route() {
      return {
        name: 'titre',
        section: 'etapes',
        id: this.titreId
      }
    },

    documentPopupTitle() {
      return `${cap(this.titreNom)} | ${cap(this.demarcheType.nom)} | ${cap(
        this.etape.type.nom
      )}`
    },

    etapeIsDemandeEnConstruction() {
      return this.etape.type.id === 'mfr' && this.etape.statut.id === 'aco'
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

    statutNom() {
      return this.etapeIsDemandeEnConstruction && !this.etape.deposable
        ? `${this.etape.statut.nom} (incomplet)`
        : this.etape.statut.nom
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

    etapeEdit() {
      this.$router.push({
        name: 'etape-edition',
        params: { id: this.etape.slug }
      })

      this.eventTrack({
        categorie: 'titre-etape',
        action: 'titre-etape_editer',
        nom: this.$route.params.id
      })
    },

    etapeDepot() {
      this.$store.commit('popupOpen', {
        component: DeposePopup,
        props: {
          etape: this.etape
        }
      })

      this.eventTrack({
        categorie: 'titre-etape',
        action: 'titre-etape_depot',
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
          titreNom: this.titreNom,
          titreTypeNom: this.titreTypeType.nom
        }
      })

      this.eventTrack({
        categorie: 'titre-etape',
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
