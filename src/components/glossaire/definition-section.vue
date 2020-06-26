<template>
  <div>
    <div>
      <h3>
        <Pill
          v-if="id === 'dom'"
          :color="`bg-titre-domaine-${definition.id}`"
          class="mr-xs mono mt--s"
        >
          {{ definition.id }}
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
            :class="`svg-fill-pattern-${definition.id}`"
          />
        </svg>
        <Statut
          v-if="id === 'tst' || id === 'dst' || id === 'est'"
          :color="definition.couleur"
          :nom="definition.nom"
          class="inline-block"
        />
        <span
          v-else
          class="cap-first"
        >{{ definition.nom }}</span>
      </h3>
    </div>
    <div class="mb-l">
      {{ descriptionHTML }}
    </div>
    <hr>
  </div>
</template>

<script>
import Pill from '../_ui/pill.vue'
import Statut from '../_common/statut.vue'
import format from './index'

export default {
  name: 'DefinitionElement',

  components: { Pill, Statut },

  props: {
    definition: { type: Object, default: () => ({}) },
    id: { type: String, default: () => '' }
  },

  computed: {
    elements() {
      return this.definition.elements
    },

    descriptionHTML() {
      return format(this.definition.description)
    }
  }
}
</script>
