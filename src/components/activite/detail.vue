<template>
  <Accordion
    class="mb"
    sub="true"
  >
    <template slot="section">
      {{ activite.date | dateFormat }} | <span class="cap-first">{{ activite.type.nom }}</span>
    </template>
    <template slot="title">
      <Dot :color="`bg-${activite.statut.couleur}`" /><span
        class="cap-first"
      ><span v-if="activite.periode">{{ activite.periode.nom }}</span> {{ activite.annee }}
      </span>
    </template>
    <template
      slot="buttons"
    >
      <ActiviteButton
        v-if="activite.editable"
        :activite="activite"
        context="titre"
        class="btn-alt py-s px-m"
      />
    </template>

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
  </Accordion>
</template>

<script>
import Dot from '../_ui/dot.vue'
import ActiviteButton from './button.vue'
import Accordion from '../_ui/accordion.vue'
import Section from '../_common/section.vue'

export default {
  components: {
    Dot,
    ActiviteButton,
    Accordion,
    Section
  },

  props: {
    activite: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
