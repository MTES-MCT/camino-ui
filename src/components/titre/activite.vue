<template>
  <div>
    <div class="card-border" />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-2">
        <h6 class="cap-first">
          {{ activite.type.nom }}
        </h6>
        <h3><span v-if="activite.periode">{{ activite.periode.nom }}</span> {{ activite.annee }}</h3>
      </div>
      <div class="tablet-blob-1-2">
        <h6>Statut</h6>
        <h4>
          <Dot :color="`bg-${activite.statut.couleur}`" /><span
            class="cap-first"
          >
            {{ activite.statut.nom }}
          </span>
        </h4>
      </div>
    </div>
    <div class="border rnd-xs flex flex-direction-column mb">
      <div class="border-b-s px-m pt-m">
        <div class="tablet-blobs">
          <div class="tablet-blob-1-4">
            <h6>Date de création</h6>
            <p>{{ activite.date | dateFormat }}</p>
          </div>
          <div class="tablet-blob-1-4">
            <div v-if="activite.dateSaisie">
              <h6>Date de modification</h6>
              <p>{{ activite.dateSaisie | dateFormat }}</p>
            </div>
          </div>
          <div class="tablet-blob-1-2">
            <ActiviteButton
              v-if="editable"
              :activite="activite"
              class="full-x"
            />
          </div>
        </div>
      </div>
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
            v-for="e in s.elements"
            :key="e.id"
            class="tablet-blob-1-4"
          >
            <h6>
              {{ e.nom }}
            </h6>
            <p class="cap-first">
              {{ activite.contenu && activite.contenu[s.id] && (activite.contenu[s.id][e.id] || activite.contenu[s.id][e.id] === 0) ? e.type === 'checkbox' ? e.valeurs[activite.contenu[s.id][e.id]] : activite.contenu[s.id][e.id] : '–' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dot from '../ui/dot.vue'
import ActiviteButton from './activite-button.vue'

export default {
  components: {
    Dot,
    ActiviteButton
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

