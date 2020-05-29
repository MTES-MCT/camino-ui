his.c<template>
  <Accordion
    :opened="opened"
    class="mb-s"
    @close="close"
    @toggle="toggle"
  >
    <template slot="title">
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
      <h3 class="cap-first mb-s">
        {{ etape.type.nom }}
      </h3>
      <div class="mb-xs">
        <Statut
          :color="etape.statut.couleur"
          :nom="etape.statut.nom"
        />
      </div>
    </template>

    <template
      v-if="etape.modification || etape.suppression"
      slot="buttons"
    >
      <DocumentButtonAdd
        :etape-id="etape.id"
        :context="documentContext"
        class="btn py-s px-m mr-line"
        @titre:eventTrack="eventTrack"
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
        :context="documentContext"
        class="px-m"
        @titre:eventTrack="eventTrack"
      />

      <Documents
        v-if="etape.justificatifs.length"
        :etape-id="etape.id"
        :documents="etape.justificatifs"
        :context="documentContext"
        nom="Justificatif"
        class="px-m"
        @titre:eventTrack="eventTrack"
      />
    </div>
  </Accordion>
</template>

<script>
import Accordion from '../_ui/accordion.vue'
import Tag from '../_ui/tag.vue'
import Documents from './documents.vue'
import EditPopup from './etape/edit.vue'
import RemovePopup from './etape/remove.vue'
import DocumentButtonAdd from './document/button-add.vue'
import EtapeProps from './etape/props.vue'
import Section from '../_common/section.vue'
import Statut from '../_common/statut.vue'

import { etapeEditFormat } from './etape'

const cap = string => string[0].toUpperCase() + string.slice(1)

export default {
  name: 'CaminoTitreEtape',

  components: {
    Accordion,
    Tag,
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

  data() {
    return {
      opened: false
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
        !!this.etape.points.length ||
        !!this.etape.substances.length ||
        !!this.etape.titulaires.length ||
        !!this.etape.amodiataires.length
      )
    },

    hasSections() {
      return this.etape.type.sections
    },

    documentContext() {
      const title = `${cap(this.titre.nom)} | ${cap(
        this.demarcheType.nom
      )} | ${cap(this.etape.type.nom)}`

      return {
        title,
        name: 'titre',
        id: this.titre.id
      }
    }
  },

  methods: {
    close() {
      this.opened = false
    },

    toggle() {
      this.opened = !this.opened
    },

    editPopupOpen() {
      const etape = etapeEditFormat(this.etape, this.demarcheId)

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          etape,
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
      this.$emit('titre:eventTrack', event)
    }
  }
}
</script>
