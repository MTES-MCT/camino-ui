<template>
  <div>
    <div>
      <h3>
        <Pill
          v-if="id === 'dom'"
          :color="`bg-titre-domaine-${entree.id}`"
          class="mr-xs mono mt--s"
        >
          {{ entree.id }}
        </Pill>
        <svg
          v-if="id === 'tty'"
          width="24"
          height="24"
          class="mr-s mb--xs"
        >
          <rect
            width="24"
            height="24"
            :class="`svg-fill-pattern-${entree.id}`"
          />
        </svg>
        <Statut
          v-if="id === 'tst' || id === 'dst' || id === 'est'"
          :color="entree.couleur"
          :nom="entree.nom"
          class="inline-block"
        />
        <span
          v-else
          class="cap-first"
        >{{ entree.nom }}</span>
      </h3>
    </div>
    <div
      v-if="entree.description"
      class="mb-l"
      v-html="descriptionHtml"
    >
      <hr>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import Pill from '../_ui/pill.vue'
import Statut from '../_common/statut.vue'

export default {
  name: 'DefinitionEntree',

  components: { Pill, Statut },

  props: {
    entree: { type: Object, default: () => ({}) },
    id: { type: String, default: () => '' }
  },

  computed: {
    elements() {
      return this.entree.elements
    },

    descriptionHtml() {
      return marked(this.entree.description)
    }
  }
}
</script>
