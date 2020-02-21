<template>
  <Accordion
    ref="accordion"
    class="mb"
  >
    <template slot="section">
      {{ etape.date | dateFormat }}
      <span
        v-if="etape.incertitudes && etape.incertitudes.date"
        class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
      >?</span>
    </template>

    <template slot="title">
      <Dot :color="`bg-${etape.statut.couleur}`" />
      <span class="cap-first">
        {{ etape.type.nom }}
      </span>
    </template>

    <template
      v-if="etape.editable || etape.supprimable"
      slot="buttons"
    >
      <button
        v-if="etape.supprimable"
        class="btn-alt py-s px-m"
        @click="removePopupOpen"
      >
        <i class="icon-24 icon-trash" />
      </button>

      <button
        v-if="etape.editable"
        class="btn-alt py-s px-m"
        @click="editPopupOpen"
      >
        <i class="icon-24 icon-pencil" />
      </button>
    </template>

    <template
      v-if="etape.editable"
      slot="sub"
    >
      <div class="px-m pt-m">
        <DocumentButtonAdd
          :etape-id="etape.id"
          :demarche-type-nom="demarcheType.nom"
          :etape-type-nom="etape.type.nom"
          :titre-nom="titreNom"
        />
      </div>
    </template>

    <div v-if="hasContenu || hasProps || etape.documents.length">
      <EtapeProps
        v-if="hasProps"
        :etape="etape"
      />

      <div v-if="hasContenu">
        <Section
          v-for="s in etape.type.sections"
          :key="s.id"
          :section="s"
          :contenu="etape.contenu[s.id]"
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
import Dot from '../_ui/dot.vue'
import Accordion from '../_ui/accordion.vue'
import Documents from './documents.vue'
import EditPopup from './etape/edit.vue'
import RemovePopup from './etape/remove.vue'
import DocumentButtonAdd from './document/button-add.vue'
import EtapeProps from './etape/props.vue'
import Section from '../_common/section.vue'

import { etapeEditFormat } from './etape'

export default {
  name: 'CaminoTitreEtape',

  components: {
    Dot,
    Accordion,
    Documents,
    DocumentButtonAdd,
    EtapeProps,
    Section
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

    hasContenu() {
      return (
        this.etape.type.sections &&
        this.etape.contenu &&
        this.etape.type.sections.reduce(
          (acc, s) =>
            s.elements.reduce(
              (acc, e) =>
                this.etape.contenu &&
                this.etape.contenu[s.id] &&
                (this.etape.contenu[s.id][e.id] ||
                  this.etape.contenu[s.id][e.id] === 0),
              acc
            ),
          false
        )
      )
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
