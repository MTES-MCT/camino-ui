<template>
  <Accordion
    :opened="opened"
    sub="true"
    @close="close"
    @toggle="toggle"
  >
    <template slot="title">
      <h6>
        {{ activite.date | dateFormat }} | <span class="cap-first">{{ activite.type.nom }}</span>
      </h6>
      <h3 class="mb-s">
        <span class="cap-first"><span v-if="activite.periode && activite.periode.nom">{{ activite.periode.nom }} </span> {{ activite.annee }}</span>
      </h3>
      <Statut
        :color="activite.statut.couleur"
        :nom="activite.statut.nom"
        class="mb-xs"
      />
    </template>
    <template
      slot="buttons"
    >
      <DocumentAddButton
        v-if="activite.documentsCreation && activite.modification"
        :context="context"
        :document="documentNew"
        :parent-id="activite.id"
        :parent-type-id="activite.type.id"
        :title="`${activite.type.nom} | ${activite.periode.nom} ${activite.annee}`"
        repertoire="activites"
        class="btn py-s px-m mr-line"
      />
      <ActiviteButton
        v-if="activite.modification"
        :activite="activite"
        :context="context"
      />
    </template>

    <div>
      <div
        v-if="activite.dateSaisie"
        class="border-b-s px-m pt-m"
      >
        <h6>Date de {{ activite.statut.id === 'dep' ? 'dépôt' : 'modification' }}</h6>
        <p>{{ activite.dateSaisie | dateFormat }}</p>
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
        :context="context"
        :documents="activite.documents"
        :etiquette="activite.modification"
        :parent-id="activite.id"
        :parent-type-id="activite.type.id"
        repertoire="activites"
        class="px-m"
      />
    </div>
  </Accordion>
</template>

<script>
import ActiviteButton from './button.vue'
import Accordion from '../_ui/accordion.vue'
import Section from '../_common/section.vue'
import Statut from '../_common/statut.vue'
import DocumentAddButton from '../document/button-add.vue'

import Documents from '../documents/list.vue'

export default {
  components: {
    ActiviteButton,
    Accordion,
    Section,
    Statut,
    DocumentAddButton,
    Documents
  },

  props: {
    activite: { type: Object, required: true },
    context: { type: Object, required: true }
  },

  data() {
    return {
      opened: false
    }
  },

  computed: {
    documentNew() {
      return {
        entreprisesLecture: false,
        fichier: null,
        fichierNouveau: null,
        fichierTypeId: null,
        publicLecture: false,
        titreActiviteId: this.activite.id,
        typeId: ''
      }
    }
  },

  methods: {
    close() {
      this.opened = false
    },

    toggle() {
      this.opened = !this.opened
    }
  }
}
</script>
