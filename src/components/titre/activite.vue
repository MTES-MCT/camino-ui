<template>
  <div>
    <Accordion
      class="mb"
      sub="true"
    >
      <template slot="titleSection">
        {{ activite.type.nom }}
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
          v-if="editable"
          :activite="activite"
          class="btn-alt py-s px-m flex-align-self-flex-start"
        />
      </template>
      <template
        slot="sub"
      >
        <div class="tablet-blobs">
          <div class="tablet-blob-1-4">
            <h6>Date d'ouverture</h6>
            <p>{{ activite.date | dateFormat }}</p>
          </div>
          <div class="tablet-blob-1-4">
            <div v-if="activite.dateSaisie">
              <h6>Date de {{ activite.statut.id === 'dep' ? 'dépôt' : 'modification' }}</h6>
              <p>{{ activite.dateSaisie | dateFormat }}</p>
            </div>
          </div>
          <div class="tablet-blob-1-2" />
        </div>
      </template>

      <div>
        <div
          v-for="s in activite.sections"
          :key="s.id"
          class="border-b-s px-m pt-m"
        >
          <h4 v-if="s.nom">
            {{ s.nom }}
          </h4>
          <div class="tablet-blobs">
            <div
              v-for="e in s.elements.filter(e => !e.archiveDate || e.archiveDate > dateFormat(activite.date))"
              :key="e.id"
              class="tablet-blob-1-4"
            >
              <h6>
                {{ e.nom }}
              </h6>
              <p class="cap-first">
                {{ activite.contenu && activite.contenu[s.id] && (activite.contenu[s.id][e.id] || activite.contenu[s.id][e.id] === 0) ? e.type === 'checkbox' ? activite.contenu[s.id][e.id].split(',').map(c => e.valeurs[c]).join(', ') : activite.contenu[s.id][e.id] : '–' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  </div>
</template>

<script>
import Dot from '../ui/dot.vue'
import ActiviteButton from './activite-button.vue'
import Accordion from '../ui/accordion.vue'

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
  },

  computed: {
    editable() {
      return this.activite.statut.id !== 'dep'
    }
  }
}
</script>

