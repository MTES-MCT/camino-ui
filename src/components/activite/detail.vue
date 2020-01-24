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
        class="btn-alt py-s px-m"
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
      <div
        v-for="s in activite.sections"
        :key="s.id"
        class="border-b-s px-m pt-m"
      >
        <h4 v-if="s.nom">
          {{ s.nom }}
        </h4>

        <div
          v-for="e in s.elements.filter(e => (!e.dateFin || e.dateFin >= activite.date) && (!e.dateDebut || e.dateDebut < activite.date))"
          :key="e.id"
          class="tablet-blobs"
        >
          <div
            v-if="e.nom"
            class="tablet-blob-1-3"
          >
            <h6>
              {{ e.nom }}
            </h6>
          </div>

          <div :class="{'tablet-blob-2-3': e.nom, 'tablet-blob-1': !e.nom}">
            <p class="cap-first">
              {{ activite.contenu && activite.contenu[s.id] && (activite.contenu[s.id][e.id] || activite.contenu[s.id][e.id] === 0) ? e.type === 'checkboxes' ? activite.contenu[s.id][e.id].map(c => e.valeurs[c]).join(', ') : activite.contenu[s.id][e.id] : '–' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Accordion>
</template>

<script>
import Dot from '../_ui/dot.vue'
import ActiviteButton from './button.vue'
import Accordion from '../_ui/accordion.vue'

export default {
  components: {
    Dot,
    ActiviteButton,
    Accordion
  },

  props: {
    activite: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
