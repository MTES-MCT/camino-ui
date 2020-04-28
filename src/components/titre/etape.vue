<template>
  <Accordion
    ref="accordion"
    class="mb-s"
  >
    <template slot="title">
      <h3 class="cap-first mb mt-xs">
        {{ etape.type.nom }}
      </h3>
      <div class="mb-xs">
        <Statut
          :color="etape.statut.couleur"
          :nom="`${etape.statut.nom} : ${dateFormat(etape.date)}`"
          :mini="true"
        />
        <span
          v-if="etape.incertitudes && etape.incertitudes.date"
          class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
        >?</span>
      </div>
    </template>

    <template
      v-if="etape.modification || etape.suppression"
      slot="buttons"
    >
      <DocumentButtonAdd
        :etape-id="etape.id"
        :demarche-type-nom="demarcheType.nom"
        :etape-type-nom="etape.type.nom"
        :titre-nom="titreNom"
        class="btn py-s px-m mr-line"
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
        class="btn py-s px-m"
        @click="removePopupOpen"
      >
        <i class="icon-24 icon-trash" />
      </button>
    </template>

    <div v-if="hasSections || hasProps || etape.documents.length">
      <EtapeProps
        v-if="hasProps"
        :etape="etape"
      />

      <div
        v-if="hasSections"
        class="border-b-s"
      >
        <Section
          v-for="s in etape.type.sections"
          :key="s.id"
          class="border-b-s px-m pt-m"
          :section="s"
          :contenu="etape.contenu ? etape.contenu[s.id] : {}"
          :date="etape.date"
        />
      </div>

      <Documents
        v-if="etape.documents.length"
        :etape-id="etape.id"
        :documents="etape.documents"
        :demarche-type-nom="demarcheType.nom"
        :etape-type-nom="etape.type.nom"
        :titre-nom="titreNom"
        class="px-m"
      />
    </div>
  </Accordion>
</template>

<script>
import Accordion from '../_ui/accordion.vue'
import Documents from './documents.vue'
import EditPopup from './etape/edit.vue'
import RemovePopup from './etape/remove.vue'
import DocumentButtonAdd from './document/button-add.vue'
import EtapeProps from './etape/props.vue'
import Section from '../_common/section.vue'
import Statut from '../_common/statut.vue'

import { etapeEditFormat } from './etape'

export default {
  name: 'CaminoTitreEtape',

  components: {
    Accordion,
    Documents,
    DocumentButtonAdd,
    EtapeProps,
    Section,
    Statut
  },

  props: {
    etape: { type: Object, default: () => {} },
    demarcheType: { type: Object, default: () => {} },
    demarcheId: { type: String, default: '' }
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
        !!this.etape.points.length ||
        !!this.etape.substances.length ||
        !!this.etape.titulaires.length ||
        !!this.etape.amodiataires.length
      )
    },

    hasSections() {
      return this.etape.type.sections
    },

    titreNom() {
      return this.$store.state.titre.current.nom
    }
  },

  watch: {
    'etape.documents.length': function(lengthNew) {
      if (length > 0) {
        this.$refs.accordion.opened = true
      }
    }
  },

  methods: {
    editPopupOpen() {
      const etape = etapeEditFormat(this.etape, this.demarcheId)

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          etape,
          domaineId: this.$store.state.titre.current.domaine.id,
          demarcheType: this.demarcheType,
          titreNom: this.titreNom
        }
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
          titreType: this.$store.state.titre.current.type.nom
        }
      })
    }
  }
}
</script>
