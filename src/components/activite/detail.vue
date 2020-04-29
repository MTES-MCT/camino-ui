<template>
  <Accordion
    class="mb"
    sub="true"
  >
    <template slot="title">
      <h6>
        {{ activite.date | dateFormat }} | <span class="cap-first">{{ activite.type.nom }}</span>
      </h6>
      <h3>
        <span class="cap-first"><span v-if="activite.periode && activite.periode.nom">{{ activite.periode.nom }} </span> {{ activite.annee }}</span>
      </h3>
      <div class="mb-xs">
        <Statut
          :color="activite.statut.couleur"
          :nom="activite.statut.nom"
          :mini="true"
        />
      </div>
    </template>
    <template
      slot="buttons"
    >
      <ActiviteButton
        v-if="activite.modification"
        :activite="activite"
        context="titre"
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
    </div>
  </Accordion>
</template>

<script>
import ActiviteButton from './button.vue'
import Accordion from '../_ui/accordion.vue'
import Section from '../_common/section.vue'
import Statut from '../_common/statut.vue'

export default {
  components: {
    ActiviteButton,
    Accordion,
    Section,
    Statut
  },

  props: {
    activite: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
