<template>
  <Accordion
    :opened="opened"
    sub="true"
    :slot-default="true"
    :slot-buttons="true"
    @close="close"
    @toggle="toggle"
  >
    <template #title>
      <h5>
        {{ dateFormat(activite.date) }} |
        <span class="cap-first"
          ><span v-if="activite.periode && activite.periode.nom"
            >{{ activite.periode.nom }}
          </span>
          {{ activite.annee }}</span
        >
      </h5>
      <div class="flex">
        <h3 class="mb-s">
          <span class="cap-first">{{ activite.type.nom }}</span>
        </h3>
        <HelpTooltip v-if="shouldDisplayHelp" class="ml-m">
          Si votre déclaration est complète, cliquez sur déposer. Cliquez sur le
          crayon pour modifier.
        </HelpTooltip>
      </div>
      <Statut :color="activite.statut.couleur" :nom="statutNom" class="mb-xs" />
    </template>
    <template #buttons>
      <button
        v-if="activite.suppression"
        class="cmn-activite-btn-supprimer btn small py-s px-m flex mr-px"
        title="supprimer l'activité'"
        @click="activiteRemovePopupOpen"
      >
        <i class="icon-24 icon-trash" />
      </button>
      <ActiviteButton
        v-if="activite.modification"
        :activite="activite"
        :route="route"
      />
    </template>

    <div>
      <!-- eslint-disable vue/no-v-html -->
      <div v-if="activite.type.description" class="border-b-s px-m pt-m">
        <div class="h6" v-html="activite.type.description" />
      </div>
      <div v-if="activite.dateSaisie" class="border-b-s px-m pt-m">
        <h5>
          Date de {{ activite.statut.id === 'dep' ? 'dépôt' : 'modification' }}
        </h5>
        <p>{{ dateFormat(activite.dateSaisie) }}</p>
      </div>

      <Section
        v-for="s in activite.sections"
        :key="s.id"
        class="border-b-s px-m pt-m"
        :section="s"
        :contenu="activite.contenu ? activite.contenu[s.id] : {}"
        :date="activite.date"
      />

      <Documents
        v-if="activite.documents && activite.documents.length"
        :bouton-suppression="activite.modification"
        :bouton-modification="activite.modification"
        :route="route"
        :documents="activite.documents"
        :etiquette="activite.modification"
        :parent-id="activite.id"
        :parent-type-id="activite.type.id"
        :title="documentPopupTitle"
        repertoire="activites"
        class="px-m"
      />
    </div>
  </Accordion>
</template>

<script>
import ActiviteButton from './button.vue'
import Accordion from '../_ui/accordion.vue'
import HelpTooltip from '../_ui/help-tooltip.vue'
import Section from '../_common/section.vue'
import Statut from '../_common/statut.vue'

import Documents from '../documents/list.vue'
import { dateFormat } from '@/utils'

export default {
  components: {
    ActiviteButton,
    Accordion,
    Section,
    Statut,
    Documents,
    HelpTooltip
  },

  props: {
    activite: { type: Object, required: true },
    route: { type: Object, required: true },
    initialOpened: { type: Boolean, default: false }
  },

  emits: ['popup'],

  data: () => ({
    opened: false
  }),

  computed: {
    documentNew() {
      return {
        titreActiviteId: this.activite.id,
        entreprisesLecture: false,
        publicLecture: false,
        fichier: null,
        fichierNouveau: null,
        fichierTypeId: null,
        typeId: ''
      }
    },

    documentPopupTitle() {
      return `${this.activite.type.nom} | ${this.activite.periode.nom} ${this.activite.annee}`
    },

    statutNom() {
      return this.isEnConstruction && !this.isActiviteDeposable
        ? `${this.activite.statut.nom} (incomplet)`
        : this.activite.statut.nom
    },

    isEnConstruction() {
      return this.activite.statut.id === 'enc'
    },

    isActiviteDeposable() {
      return this.activite.deposable === true
    },

    shouldDisplayHelp() {
      return (
        this.isEnConstruction &&
        this.isActiviteDeposable &&
        ['grp', 'gra'].includes(this.activite.type.id)
      )
    }
  },

  created() {
    this.opened = this.initialOpened
  },

  methods: {
    close() {
      this.opened = false
    },

    toggle() {
      this.opened = !this.opened
    },

    activiteRemovePopupOpen() {
      this.$emit('popup')
    },

    dateFormat(date) {
      return dateFormat(date)
    }
  }
}
</script>
